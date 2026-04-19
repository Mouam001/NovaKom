import { useState,  useEffect} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { LogIn, UserPlus, Mail, Lock, User, Building2, Eye, EyeOff } from 'lucide-react';

const STRONG_PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/;

export function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn, signUp, user } = useAuth();
  
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Rediriger si déjà connecté
  useEffect(() => {
    if (user) {
      const from = (location.state as any)?.from || '/';
      navigate(from, { replace: true });
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await signIn(email, password);
        if (error) {
          setError(error.message || 'Erreur de connexion');
        } else {
          const from = (location.state as any)?.from || '/';
          navigate(from, { replace: true });
        }
      } else {
        if (!name) {
          setError('Le nom est requis');
          setLoading(false);
          return;
        }
        if (!STRONG_PASSWORD_REGEX.test(password)) {
          setError('Le mot de passe doit contenir au moins 8 caractères, avec majuscule, minuscule, chiffre et caractère spécial.');
          setLoading(false);
          return;
        }
        if (password !== confirmPassword) {
          setError('Les mots de passe ne correspondent pas.');
          setLoading(false);
          return;
        }
        const { error } = await signUp(email, password, name, company);
        if (error) {
          setError(error.message || 'Erreur lors de l\'inscription');
        } else {
          const from = (location.state as any)?.from || '/';
          navigate(from, { replace: true });
        }
      }
    } catch (err) {
      setError('Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a202c] via-[#2d3748] to-[#1a202c] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-[#ff6b35] to-[#f9a826] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-2xl">N</span>
            </div>
            <span className="text-3xl md:text-4xl font-bold text-white">NovaKom</span>
          </div>
          <p className="text-gray-300 text-sm md:text-base">
            {isLogin ? 'Connectez-vous à votre compte' : 'Créez votre compte client'}
          </p>
        </div>

        {/* Formulaire */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 md:p-8 shadow-2xl border border-white/20">
          {/* Tabs */}
          <div className="flex gap-2 mb-6 bg-white/5 rounded-lg p-1">
            <button
              onClick={() => {
                setIsLogin(true);
                setError('');
                setConfirmPassword('');
              }}
              className={`flex-1 py-2.5 rounded-md font-medium transition-all text-sm md:text-base ${
                isLogin
                  ? 'bg-[#ff6b35] text-white shadow-lg'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              <LogIn className="w-4 h-4 inline mr-2" />
              Connexion
            </button>
            <button
              onClick={() => {
                setIsLogin(false);
                setError('');
                setConfirmPassword('');
              }}
              className={`flex-1 py-2.5 rounded-md font-medium transition-all text-sm md:text-base ${
                !isLogin
                  ? 'bg-[#ff6b35] text-white shadow-lg'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              <UserPlus className="w-4 h-4 inline mr-2" />
              Inscription
            </button>
          </div>

          {/* Message d'erreur */}
          {error && (
            <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Nom (inscription uniquement) */}
            {!isLogin && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Nom complet *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ff6b35] focus:border-transparent text-sm md:text-base"
                      placeholder="Jean Dupont"
                      required={!isLogin}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Entreprise (optionnel)
                  </label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ff6b35] focus:border-transparent text-sm md:text-base"
                      placeholder="Mon Entreprise"
                    />
                  </div>
                </div>
              </>
            )}

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email *
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ff6b35] focus:border-transparent text-sm md:text-base"
                  placeholder="exemple@email.com"
                  required
                />
              </div>
            </div>

            {/* Mot de passe */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Mot de passe *
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ff6b35] focus:border-transparent text-sm md:text-base"
                  placeholder="••••••••"
                  required
                  minLength={8}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {!isLogin && (
                <p className="mt-1 text-xs text-gray-400">
                  Minimum 8 caractères avec majuscule, minuscule, chiffre et caractère spécial
                </p>
              )}
              {isLogin && (
                <div className="mt-2 text-right">
                  <button
                    type="button"
                    onClick={() => navigate('/forgot-password')}
                    className="text-sm text-gray-400 hover:text-[#ff6b35] transition-colors"
                  >
                    Mot de passe oublié ?
                  </button>
                </div>
              )}
            </div>

            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Confirmer le mot de passe *
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    onCopy={(e) => e.preventDefault()}
                    onCut={(e) => e.preventDefault()}
                    onPaste={(e) => e.preventDefault()}
                    className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ff6b35] focus:border-transparent text-sm md:text-base"
                    placeholder="Retapez votre mot de passe"
                    required
                    minLength={8}
                  />
                </div>
                <p className="mt-1 text-xs text-gray-400">
                  Copier/coller désactivé pour confirmer le mot de passe
                </p>
              </div>
            )}

            {/* Bouton submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-[#ff6b35] to-[#f9a826] text-white font-semibold rounded-lg hover:shadow-lg hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm md:text-base"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Chargement...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  {isLogin ? (
                    <>
                      <LogIn className="w-5 h-5" />
                      Se connecter
                    </>
                  ) : (
                    <>
                      <UserPlus className="w-5 h-5" />
                      S'inscrire
                    </>
                  )}
                </span>
              )}
            </button>
          </form>

          {/* Lien retour */}
          <div className="mt-6 text-center">
            <button
              onClick={() => navigate('/')}
              className="text-sm text-gray-300 hover:text-[#ff6b35] transition-colors"
            >
              ← Retour à l'accueil
            </button>
          </div>
        </div>

        {/* Info admin */}
        <div className="mt-6 text-center text-xs text-gray-400 bg-white/5 rounded-lg p-3">
          💡 <strong>Compte admin :</strong> contactus@novakom.tech
        </div>
      </div>
    </div>
  );
}
