import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { Star, MessageSquare, Building2, CheckCircle } from 'lucide-react';
import { apiRequest } from '../lib/supabase';

export function ReviewPage() {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const { language } = useLanguage();
  const isFr = language === 'fr';
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState('');
  const [company, setCompany] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login', { state: { from: '/review' } });
    }
  }, [authLoading, user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const response = await apiRequest('/reviews/create', {
        method: 'POST',
        body: JSON.stringify({
          rating,
          message,
          company: company || user?.user_metadata?.company || '',
          userId: user?.id,
          userName: user?.user_metadata?.name || user?.email,
          userEmail: user?.email,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || (isFr ? 'Erreur lors de la soumission de l\'avis' : 'Error submitting review'));
        return;
      }

      setSuccess(true);
    } catch (err) {
      console.error('Error submitting review:', err);
      setError(isFr ? 'Erreur lors de la soumission de l\'avis' : 'Error submitting review');
    } finally {
      setSubmitting(false);
    }
  };

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
            {isFr ? 'Merci pour votre avis !' : 'Thanks for your review!'}
          </h2>
          <p className="text-gray-300 mb-6">
            {isFr
              ? "Votre avis a été soumis avec succès et sera visible après validation par notre équipe."
              : "Your review has been submitted and will be visible after validation by our team."}
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => navigate('/')}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-[#ff6b35] to-[#f9a826] text-white font-semibold rounded-lg hover:shadow-lg hover:scale-105 transition-all"
            >
              {isFr ? "Retour à l'accueil" : 'Back to home'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a202c] via-[#2d3748] to-[#1a202c] py-12 md:py-20 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
            {isFr ? 'Partagez votre expérience' : 'Share your experience'}
          </h1>
          <p className="text-lg md:text-xl text-gray-300">
            {isFr ? 'Votre avis nous aide à améliorer nos services' : 'Your feedback helps us improve our services'}
          </p>
        </div>

        {/* Formulaire */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 md:p-8 shadow-2xl border border-white/20">
          <div className="mb-6">
            <p className="text-gray-300">
              {isFr ? 'Connecté en tant que :' : 'Signed in as:'}{' '}
              <span className="text-white font-semibold">
                {user.user_metadata?.name || user.email}
              </span>
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Note */}
            <div>
              <label className="block text-lg font-semibold text-white mb-4">
                {isFr ? 'Votre note *' : 'Your rating *'}
              </label>
              <div className="flex gap-2 justify-center md:justify-start">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="transition-transform hover:scale-110"
                  >
                    <Star
                      className={`w-10 h-10 md:w-12 md:h-12 ${
                        star <= rating
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-600'
                      }`}
                    />
                  </button>
                ))}
              </div>
              <p className="text-sm text-gray-400 mt-2 text-center md:text-left">
                {rating === 0
                  ? (isFr ? 'Aucune note sélectionnée' : 'No rating selected')
                  : rating === 5
                  ? (isFr ? 'Excellent !' : 'Excellent!')
                  : rating === 4
                  ? (isFr ? 'Très bien' : 'Very good')
                  : rating === 3
                  ? (isFr ? 'Bien' : 'Good')
                  : rating === 2
                  ? (isFr ? 'Moyen' : 'Average')
                  : (isFr ? 'À améliorer' : 'Needs improvement')}
              </p>
            </div>

            {/* Entreprise */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                {isFr ? 'Entreprise (optionnel)' : 'Company (optional)'}
              </label>
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ff6b35] focus:border-transparent text-sm md:text-base"
                  placeholder={user.user_metadata?.company || (isFr ? 'Nom de votre entreprise' : 'Your company name')}
                />
              </div>
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                {isFr ? 'Votre avis * ' : 'Your review * '}<span className="text-xs text-gray-400">{isFr ? '(minimum 20 caractères)' : '(minimum 20 characters)'}</span>
              </label>
              <div className="relative">
                <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ff6b35] focus:border-transparent resize-none text-sm md:text-base"
                  placeholder={isFr ? 'Partagez votre expérience avec NovaKom...' : 'Share your experience with NovaKom...'}
                  rows={6}
                  required
                  minLength={20}
                />
              </div>
              <p className="text-xs text-gray-400 mt-1">
                {message.length} / 20 {isFr ? 'caractères minimum' : 'minimum characters'}
              </p>
            </div>

            {/* Info */}
            <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
              <p className="text-sm text-blue-200">
                {isFr ? "ℹ️ Votre avis sera vérifié par notre équipe avant d'être publié sur le site." : "ℹ️ Your review will be verified by our team before being published on the site."}
              </p>
            </div>

            {/* Boutons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={() => navigate('/')}
                className="flex-1 px-6 py-3 bg-white/5 border border-white/10 text-white font-semibold rounded-lg hover:bg-white/10 transition-all"
              >
                {isFr ? 'Annuler' : 'Cancel'}
              </button>
              <button
                type="submit"
                disabled={submitting || message.length < 20}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-[#ff6b35] to-[#f9a826] text-white font-semibold rounded-lg hover:shadow-lg hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    {isFr ? 'Envoi en cours...' : 'Submitting...'}
                  </span>
                ) : (
                  isFr ? 'Publier mon avis' : 'Publish my review'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
