import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, User, Mail, Phone, MessageSquare, CheckCircle } from 'lucide-react';
import { apiRequest } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';

interface TimeSlot {
  date: string;
  time: string;
  available: boolean;
}

interface Appointment {
  id: string;
  date: string;
  time: string;
  name: string;
  email: string;
  phone: string;
  message?: string;
  createdAt: string;
}

export function AppointmentPage() {
  const navigate = useNavigate();
  const { session, loading: authLoading } = useAuth();
  const { language } = useLanguage();
  const isFr = language === 'fr';
  const user = session?.user;
  const [slots, setSlots] = useState<TimeSlot[]>([]);
  const [myAppointments, setMyAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMyAppointments, setLoadingMyAppointments] = useState(true);
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!authLoading && !session) {
      navigate('/login', { replace: true, state: { from: '/appointment' } });
    }
  }, [authLoading, session]);

  useEffect(() => {
    if (authLoading || !session?.access_token) return;
    const token = session.access_token;
    loadAvailableSlots(token);
    loadMyAppointments(token);
  }, [session?.access_token]);

  useEffect(() => {
    if (!user?.id) return;
    setFormData((prev) => ({
      ...prev,
      name: user.user_metadata?.name || prev.name,
      email: user.email || prev.email,
    }));
  }, [user?.id]);

  const loadAvailableSlots = async (token: string) => {
    try {
      const response = await apiRequest('/slots/available', {}, token);

      if (response.status === 401) {
        setError(isFr ? "Votre session a expiré. Veuillez vous reconnecter." : "Your session has expired. Please sign in again.");
        return;
      }

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || (isFr ? 'Erreur lors du chargement des créneaux' : 'Error loading available slots'));
        return;
      }

      setSlots(data.slots || []);
    } catch (err) {
      console.error('Error loading slots:', err);
      setError(isFr ? 'Erreur réseau lors du chargement des créneaux' : 'Network error while loading slots');
    } finally {
      setLoading(false);
    }
  };

  const loadMyAppointments = async (token: string) => {
    setLoadingMyAppointments(true);

    try {
      const response = await apiRequest('/appointments/my', {}, token);

      if (response.status === 401) {
        setError(isFr ? "Votre session a expiré. Veuillez vous reconnecter." : "Your session has expired. Please sign in again.");
        return;
      }

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || (isFr ? 'Erreur lors du chargement des rendez-vous' : 'Error loading appointments'));
        return;
      }

      setMyAppointments(data.appointments || []);
    } catch (err) {
      console.error('Error loading my appointments:', err);
      setError(isFr ? 'Erreur réseau lors du chargement des rendez-vous' : 'Network error while loading appointments');
    } finally {
      setLoadingMyAppointments(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedSlot) {
      setError(isFr ? 'Veuillez sélectionner un créneau' : 'Please select a slot');
      return;
    }

    const token = session?.access_token;
    if (!token) {
      setError(isFr ? 'Session invalide. Veuillez vous reconnecter.' : 'Invalid session. Please sign in again.');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      const response = await apiRequest(
          '/appointments/create',
          {
            method: 'POST',
            body: JSON.stringify({
              ...formData,
              date: selectedSlot.date,
              time: selectedSlot.time,
            }),
          },
          token
      );

      const data = await response.json();

      if (response.status === 401) {
        setError(isFr ? "Votre session a expiré. Veuillez vous reconnecter." : "Your session has expired. Please sign in again.");
        return;
      }

      if (!response.ok) {
        setError(data.error || (isFr ? 'Erreur lors de la création du rendez-vous' : 'Error creating appointment'));
        return;
      }

      setSuccess(true);
      await loadAvailableSlots(token);
      await loadMyAppointments(token);
    } catch (err) {
      console.error('Error creating appointment:', err);
      setError(isFr ? 'Erreur lors de la création du rendez-vous' : 'Error creating appointment');
    } finally {
      setSubmitting(false);
    }
  };

  // Grouper les créneaux par date
  const slotsByDate = slots.reduce((acc, slot) => {
    if (!acc[slot.date]) {
      acc[slot.date] = [];
    }
    acc[slot.date].push(slot);
    return acc;
  }, {} as Record<string, TimeSlot[]>);

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#1a202c] via-[#2d3748] to-[#1a202c] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#ff6b35]/30 border-t-[#ff6b35] rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#1a202c] via-[#2d3748] to-[#1a202c] flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/20 text-center">
          <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-10 h-10 text-green-400" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            {isFr ? 'Rendez-vous confirmé !' : 'Appointment confirmed!'}
          </h2>
          <p className="text-gray-300 mb-2">
            {isFr ? 'Votre rendez-vous a été pris avec succès pour le :' : 'Your appointment has been successfully booked for:'}
          </p>
          <p className="text-xl font-semibold text-[#ff6b35] mb-6">
            {new Date(selectedSlot!.date).toLocaleDateString(isFr ? 'fr-FR' : 'en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}{' '}
            {isFr ? 'à' : 'at'} {selectedSlot!.time}
          </p>
          <p className="text-gray-400 text-sm mb-8">
            {isFr ? "Vous recevrez une confirmation par email à l'adresse :" : 'You will receive a confirmation email at:'} <br />
            <span className="text-white font-medium">{formData.email}</span>
          </p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-gradient-to-r from-[#ff6b35] to-[#f9a826] text-white font-semibold rounded-lg hover:shadow-lg hover:scale-105 transition-all"
          >
            {isFr ? "Retour à l'accueil" : 'Back to home'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a202c] via-[#2d3748] to-[#1a202c] py-12 md:py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
            {isFr ? 'Prenez rendez-vous avec nous' : 'Book an appointment with us'}
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            {isFr ? 'Sélectionnez un créneau disponible et remplissez vos informations pour échanger avec notre équipe' : 'Select an available slot and fill in your details to speak with our team'}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Sélection du créneau */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 md:p-8 shadow-2xl border border-white/20">
            <h2 className="text-xl md:text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <Calendar className="w-6 h-6 text-[#ff6b35]" />
              {isFr ? 'Créneaux disponibles' : 'Available slots'}
            </h2>

            {loading ? (
              <div className="text-center py-12">
                <div className="w-12 h-12 border-4 border-[#ff6b35]/30 border-t-[#ff6b35] rounded-full animate-spin mx-auto" />
                <p className="text-gray-300 mt-4">{isFr ? 'Chargement...' : 'Loading...'}</p>
              </div>
            ) : slots.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-300">{isFr ? 'Aucun créneau disponible pour le moment.' : 'No slots available at the moment.'}</p>
                <p className="text-sm text-gray-400 mt-2">{isFr ? 'Revenez plus tard ou contactez-nous directement.' : 'Please come back later or contact us directly.'}</p>
              </div>
            ) : (
              <div className="space-y-6 max-h-[500px] overflow-y-auto pr-2">
                {Object.entries(slotsByDate).map(([date, dateSlots]) => (
                  <div key={date}>
                    <h3 className="text-lg font-semibold text-[#ff6b35] mb-3">
                      {new Date(date).toLocaleDateString(isFr ? 'fr-FR' : 'en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {dateSlots.map((slot) => (
                        <button
                          key={`${slot.date}_${slot.time}`}
                          onClick={() => setSelectedSlot(slot)}
                          className={`p-3 rounded-lg border-2 transition-all text-sm md:text-base ${
                            selectedSlot?.date === slot.date && selectedSlot?.time === slot.time
                              ? 'border-[#ff6b35] bg-[#ff6b35]/20 text-white'
                              : 'border-white/10 bg-white/5 text-gray-300 hover:border-[#ff6b35]/50 hover:bg-white/10'
                          }`}
                        >
                          <Clock className="w-4 h-4 mx-auto mb-1" />
                          {slot.time}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Formulaire */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 md:p-8 shadow-2xl border border-white/20">
            <h2 className="text-xl md:text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <User className="w-6 h-6 text-[#ff6b35]" />
              {isFr ? 'Vos informations' : 'Your information'}
            </h2>

            <div className="mb-4 p-3 bg-white/5 border border-white/10 rounded-lg text-sm text-gray-300">
              {isFr ? 'Connecté en tant que ' : 'Signed in as '}<span className="text-white font-semibold">{user.user_metadata?.name || user.email}</span>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  {isFr ? 'Nom complet *' : 'Full name *'}
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ff6b35] focus:border-transparent text-sm md:text-base"
                    placeholder={isFr ? 'Jean Dupont' : 'John Doe'}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ff6b35] focus:border-transparent text-sm md:text-base"
                  placeholder="exemple@email.com"
                  required
                  readOnly
                />
              </div>
            </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  {isFr ? 'Téléphone *' : 'Phone *'}
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ff6b35] focus:border-transparent text-sm md:text-base"
                    placeholder="06 12 34 56 78"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  {isFr ? 'Message (optionnel)' : 'Message (optional)'}
                </label>
                <div className="relative">
                  <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ff6b35] focus:border-transparent resize-none text-sm md:text-base"
                    placeholder={isFr ? 'Dites-nous en plus sur votre besoin...' : 'Tell us more about your needs...'}
                    rows={4}
                  />
                </div>
              </div>

              {selectedSlot && (
                <div className="p-4 bg-[#ff6b35]/10 border border-[#ff6b35]/30 rounded-lg">
                  <p className="text-sm text-gray-300 mb-1">{isFr ? 'Créneau sélectionné :' : 'Selected slot:'}</p>
                  <p className="text-white font-semibold">
                    {new Date(selectedSlot.date).toLocaleDateString(isFr ? 'fr-FR' : 'en-US', {
                      weekday: 'long',
                      day: 'numeric',
                      month: 'long',
                    })}{' '}
                    {isFr ? 'à' : 'at'} {selectedSlot.time}
                  </p>
                </div>
              )}

              <button
                type="submit"
                disabled={submitting || !selectedSlot}
                className="w-full py-3 bg-gradient-to-r from-[#ff6b35] to-[#f9a826] text-white font-semibold rounded-lg hover:shadow-lg hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm md:text-base"
              >
                {submitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    {isFr ? 'Réservation...' : 'Booking...'}
                  </span>
                ) : (
                  isFr ? 'Confirmer le rendez-vous' : 'Confirm appointment'
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <button
                onClick={() => navigate('/')}
                className="text-sm text-gray-300 hover:text-[#ff6b35] transition-colors"
              >
                {isFr ? "← Retour à l'accueil" : '← Back to home'}
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-white/10 backdrop-blur-lg rounded-2xl p-6 md:p-8 shadow-2xl border border-white/20">
          <h2 className="text-xl md:text-2xl font-bold text-white mb-4">
            {isFr ? 'Mon espace - Mes rendez-vous' : 'My space - My appointments'}
          </h2>
          {loadingMyAppointments ? (
            <div className="text-center py-8">
              <div className="w-10 h-10 border-4 border-[#ff6b35]/30 border-t-[#ff6b35] rounded-full animate-spin mx-auto" />
            </div>
          ) : myAppointments.length === 0 ? (
            <p className="text-gray-300">{isFr ? "Vous n'avez encore aucun rendez-vous." : "You don't have any appointments yet."}</p>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {myAppointments.map((apt) => (
                <div key={apt.id} className="p-4 bg-white/5 border border-white/10 rounded-lg">
                  <p className="text-white font-semibold">
                    {new Date(apt.date).toLocaleDateString(isFr ? 'fr-FR' : 'en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}{' '}
                    {isFr ? 'à' : 'at'} {apt.time}
                  </p>
                  <p className="text-sm text-gray-300 mt-2">Email: {apt.email}</p>
                  <p className="text-sm text-gray-300">{isFr ? 'Téléphone' : 'Phone'}: {apt.phone}</p>
                  {apt.message && (
                    <p className="text-sm text-gray-400 mt-2">{isFr ? 'Message' : 'Message'}: {apt.message}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
