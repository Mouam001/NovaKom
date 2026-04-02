import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  Calendar, 
  Clock, 
  Trash2, 
  Plus, 
  Users, 
  MessageSquare,
  CheckCircle,
  XCircle,
  Mail,
  Phone
} from 'lucide-react';
import { apiRequest } from '../lib/supabase';

export function AdminPage() {
  const navigate = useNavigate();
  const { user, isAdmin, loading: authLoading } = useAuth();
  const [activeTab, setActiveTab] = useState<'slots' | 'appointments' | 'reviews'>('slots');
  
  // États pour les créneaux
  const [slots, setSlots] = useState<any[]>([]);
  const [newSlotDate, setNewSlotDate] = useState('');
  const [newSlotTime, setNewSlotTime] = useState('');
  const [loadingSlots, setLoadingSlots] = useState(false);
  
  // États pour les rendez-vous
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loadingAppointments, setLoadingAppointments] = useState(false);
  
  // États pour les avis
  const [reviews, setReviews] = useState<any[]>([]);
  const [loadingReviews, setLoadingReviews] = useState(false);

  useEffect(() => {
    if (!authLoading && !isAdmin) {
      navigate('/login');
    }
  }, [authLoading, isAdmin, navigate]);

  useEffect(() => {
    if (isAdmin) {
      loadSlots();
      loadAppointments();
      loadReviews();
    }
  }, [isAdmin]);

  const loadSlots = async () => {
    setLoadingSlots(true);
    try {
      const response = await apiRequest('/slots/all');
      const data = await response.json();
      setSlots(data.slots || []);
    } catch (err) {
      console.error('Error loading slots:', err);
    } finally {
      setLoadingSlots(false);
    }
  };

  const loadAppointments = async () => {
    setLoadingAppointments(true);
    try {
      const response = await apiRequest('/appointments/all');
      const data = await response.json();
      setAppointments(data.appointments || []);
    } catch (err) {
      console.error('Error loading appointments:', err);
    } finally {
      setLoadingAppointments(false);
    }
  };

  const loadReviews = async () => {
    setLoadingReviews(true);
    try {
      const response = await apiRequest('/reviews/all');
      const data = await response.json();
      setReviews(data.reviews || []);
    } catch (err) {
      console.error('Error loading reviews:', err);
    } finally {
      setLoadingReviews(false);
    }
  };

  const addSlot = async () => {
    if (!newSlotDate || !newSlotTime) {
      alert('Date et heure requises');
      return;
    }

    try {
      const response = await apiRequest('/slots/create', {
        method: 'POST',
        body: JSON.stringify({
          slots: [{ date: newSlotDate, time: newSlotTime }]
        }),
      });

      if (response.ok) {
        setNewSlotDate('');
        setNewSlotTime('');
        loadSlots();
      }
    } catch (err) {
      console.error('Error adding slot:', err);
    }
  };

  const deleteSlot = async (date: string, time: string) => {
    if (!confirm('Supprimer ce créneau ?')) return;

    try {
      const response = await apiRequest(`/slots/${date}/${time}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        loadSlots();
      }
    } catch (err) {
      console.error('Error deleting slot:', err);
    }
  };

  const approveReview = async (reviewId: string) => {
    try {
      const response = await apiRequest(`/reviews/${reviewId}/approve`, {
        method: 'PATCH',
      });

      if (response.ok) {
        loadReviews();
      }
    } catch (err) {
      console.error('Error approving review:', err);
    }
  };

  const deleteReview = async (reviewId: string) => {
    if (!confirm('Supprimer cet avis ?')) return;

    try {
      const response = await apiRequest(`/reviews/${reviewId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        loadReviews();
      }
    } catch (err) {
      console.error('Error deleting review:', err);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#1a202c] via-[#2d3748] to-[#1a202c] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#ff6b35]/30 border-t-[#ff6b35] rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a202c] via-[#2d3748] to-[#1a202c] py-8 md:py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Tableau de bord Admin
          </h1>
          <p className="text-gray-300">
            Bienvenue, {user?.user_metadata?.name || user?.email}
          </p>
          <button
            onClick={() => navigate('/')}
            className="mt-4 text-sm text-gray-300 hover:text-[#ff6b35] transition-colors"
          >
            ← Retour à l'accueil
          </button>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 bg-white/5 rounded-lg p-2">
          <button
            onClick={() => setActiveTab('slots')}
            className={`flex-1 min-w-[140px] py-3 px-4 rounded-md font-medium transition-all text-sm md:text-base ${
              activeTab === 'slots'
                ? 'bg-[#ff6b35] text-white shadow-lg'
                : 'text-gray-300 hover:text-white'
            }`}
          >
            <Calendar className="w-4 h-4 inline mr-2" />
            Créneaux
          </button>
          <button
            onClick={() => setActiveTab('appointments')}
            className={`flex-1 min-w-[140px] py-3 px-4 rounded-md font-medium transition-all text-sm md:text-base ${
              activeTab === 'appointments'
                ? 'bg-[#ff6b35] text-white shadow-lg'
                : 'text-gray-300 hover:text-white'
            }`}
          >
            <Users className="w-4 h-4 inline mr-2" />
            RDV ({appointments.length})
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`flex-1 min-w-[140px] py-3 px-4 rounded-md font-medium transition-all text-sm md:text-base ${
              activeTab === 'reviews'
                ? 'bg-[#ff6b35] text-white shadow-lg'
                : 'text-gray-300 hover:text-white'
            }`}
          >
            <MessageSquare className="w-4 h-4 inline mr-2" />
            Avis ({reviews.filter(r => !r.approved).length} en attente)
          </button>
        </div>

        {/* Content */}
        {activeTab === 'slots' && (
          <div className="space-y-6">
            {/* Ajouter un créneau */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-2xl border border-white/20">
              <h2 className="text-xl md:text-2xl font-bold text-white mb-4">
                Ajouter des créneaux
              </h2>
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="date"
                  value={newSlotDate}
                  onChange={(e) => setNewSlotDate(e.target.value)}
                  className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#ff6b35] focus:border-transparent"
                  min={new Date().toISOString().split('T')[0]}
                />
                <input
                  type="time"
                  value={newSlotTime}
                  onChange={(e) => setNewSlotTime(e.target.value)}
                  className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#ff6b35] focus:border-transparent"
                />
                <button
                  onClick={addSlot}
                  className="px-6 py-3 bg-gradient-to-r from-[#ff6b35] to-[#f9a826] text-white font-semibold rounded-lg hover:shadow-lg hover:scale-105 transition-all whitespace-nowrap"
                >
                  <Plus className="w-5 h-5 inline mr-2" />
                  Ajouter
                </button>
              </div>
            </div>

            {/* Liste des créneaux */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-2xl border border-white/20">
              <h2 className="text-xl md:text-2xl font-bold text-white mb-4">
                Tous les créneaux ({slots.length})
              </h2>
              {loadingSlots ? (
                <div className="text-center py-12">
                  <div className="w-12 h-12 border-4 border-[#ff6b35]/30 border-t-[#ff6b35] rounded-full animate-spin mx-auto" />
                </div>
              ) : slots.length === 0 ? (
                <p className="text-gray-300 text-center py-12">Aucun créneau créé</p>
              ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[500px] overflow-y-auto pr-2">
                  {slots.map((slot, idx) => (
                    <div
                      key={idx}
                      className={`p-4 rounded-lg border-2 ${
                        slot.available
                          ? 'border-green-500/30 bg-green-500/10'
                          : 'border-red-500/30 bg-red-500/10'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <p className="text-white font-semibold">
                            {new Date(slot.date).toLocaleDateString('fr-FR')}
                          </p>
                          <p className="text-gray-300 text-sm flex items-center gap-1 mt-1">
                            <Clock className="w-4 h-4" />
                            {slot.time}
                          </p>
                        </div>
                        <button
                          onClick={() => deleteSlot(slot.date, slot.time)}
                          className="p-2 hover:bg-red-500/20 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4 text-red-400" />
                        </button>
                      </div>
                      <div className="mt-2 text-xs">
                        {slot.available ? (
                          <span className="text-green-400 flex items-center gap-1">
                            <CheckCircle className="w-3 h-3" />
                            Disponible
                          </span>
                        ) : (
                          <span className="text-red-400 flex items-center gap-1">
                            <XCircle className="w-3 h-3" />
                            Réservé
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'appointments' && (
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-2xl border border-white/20">
            <h2 className="text-xl md:text-2xl font-bold text-white mb-4">
              Rendez-vous ({appointments.length})
            </h2>
            {loadingAppointments ? (
              <div className="text-center py-12">
                <div className="w-12 h-12 border-4 border-[#ff6b35]/30 border-t-[#ff6b35] rounded-full animate-spin mx-auto" />
              </div>
            ) : appointments.length === 0 ? (
              <p className="text-gray-300 text-center py-12">Aucun rendez-vous</p>
            ) : (
              <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                {appointments.map((apt) => (
                  <div
                    key={apt.id}
                    className="p-4 md:p-6 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors"
                  >
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-3 mb-3">
                          <span className="text-lg font-bold text-white">{apt.name}</span>
                          <span className="px-3 py-1 bg-[#ff6b35]/20 text-[#ff6b35] rounded-full text-xs font-medium">
                            {new Date(apt.date).toLocaleDateString('fr-FR')} à {apt.time}
                          </span>
                        </div>
                        <div className="space-y-2 text-sm">
                          <p className="text-gray-300 flex items-center gap-2">
                            <Mail className="w-4 h-4" />
                            {apt.email}
                          </p>
                          <p className="text-gray-300 flex items-center gap-2">
                            <Phone className="w-4 h-4" />
                            {apt.phone}
                          </p>
                          {apt.message && (
                            <p className="text-gray-400 mt-3 italic">
                              "{apt.message}"
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="text-xs text-gray-400">
                        Créé le {new Date(apt.createdAt).toLocaleDateString('fr-FR')}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-2xl border border-white/20">
            <h2 className="text-xl md:text-2xl font-bold text-white mb-4">
              Avis clients ({reviews.length})
            </h2>
            {loadingReviews ? (
              <div className="text-center py-12">
                <div className="w-12 h-12 border-4 border-[#ff6b35]/30 border-t-[#ff6b35] rounded-full animate-spin mx-auto" />
              </div>
            ) : reviews.length === 0 ? (
              <p className="text-gray-300 text-center py-12">Aucun avis</p>
            ) : (
              <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                {reviews.map((review) => (
                  <div
                    key={review.id}
                    className={`p-4 md:p-6 rounded-lg border-2 ${
                      review.approved
                        ? 'bg-green-500/10 border-green-500/30'
                        : 'bg-yellow-500/10 border-yellow-500/30'
                    }`}
                  >
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-lg font-bold text-white">{review.userName}</span>
                          {review.company && (
                            <span className="text-sm text-gray-400">• {review.company}</span>
                          )}
                        </div>
                        <div className="flex items-center gap-1 mb-3">
                          {[...Array(5)].map((_, i) => (
                            <span
                              key={i}
                              className={i < review.rating ? 'text-yellow-400' : 'text-gray-600'}
                            >
                              ★
                            </span>
                          ))}
                        </div>
                        <p className="text-gray-300">{review.message}</p>
                        <p className="text-xs text-gray-400 mt-2">
                          {new Date(review.createdAt).toLocaleDateString('fr-FR')}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        {!review.approved && (
                          <button
                            onClick={() => approveReview(review.id)}
                            className="px-4 py-2 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 transition-colors text-sm whitespace-nowrap"
                          >
                            <CheckCircle className="w-4 h-4 inline mr-1" />
                            Approuver
                          </button>
                        )}
                        <button
                          onClick={() => deleteReview(review.id)}
                          className="px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors text-sm"
                        >
                          <Trash2 className="w-4 h-4 inline mr-1" />
                          Supprimer
                        </button>
                      </div>
                    </div>
                    {review.approved && (
                      <div className="mt-2">
                        <span className="text-xs text-green-400 flex items-center gap-1">
                          <CheckCircle className="w-3 h-3" />
                          Approuvé et visible publiquement
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
