import { useState,  useEffect} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { LogIn, UserPlus, Mail, Lock, User, Building2, Eye, EyeOff } from 'lucide-react';

const STRONG_PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/;

export function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn, signUp, user } = useAuth();
  const { language } = useLanguage();
  const isFr = language === 'fr';
  
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
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
    setSuccessMessage('');
    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await signIn(email, password);
        if (error) {
          setError(error.message || (isFr ? 'Erreur de connexion' : 'Login error'));
        } else {
          const from = (location.state as any)?.from || '/';
          navigate(from, { replace: true });
        }
      } else {
        if (!name) {
          setError(isFr ? 'Le nom est requis' : 'Name is required');
          setLoading(false);
          return;
        }
        if (!STRONG_PASSWORD_REGEX.test(password)) {
          setError(isFr ? 'Le mot de passe doit contenir au moins 8 caractères, avec majuscule, minuscule, chiffre et caractère spécial.' : 'Password must be at least 8 characters with uppercase, lowercase, number and special character.');
          setLoading(false);
          return;
        }
        if (password !== confirmPassword) {
          setError(isFr ? 'Les mots de passe ne correspondent pas.' : 'Passwords do not match.');
          setLoading(false);
          return;
        }
        const { error } = await signUp(email, password, name, company);
        if (error) {
          setError(error.message || (isFr ? 'Erreur lors de l\'inscription' : 'Sign up error'));
        } else {
          setSuccessMessage(isFr ? "Inscription réussie ! Vérifiez votre boîte mail pour confirmer votre compte." : "Sign-up successful! Check your inbox to confirm your account.");
          setIsLogin(true);
          setPassword('');
          setConfirmPassword('');
        }
      }
    } catch (err) {
      setError(isFr ? 'Une erreur est survenue' : 'An error occurred');
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
            {isLogin ? (isFr ? 'Connectez-vous à votre compte' : 'Log in to your account') : (isFr ? 'Créez votre compte client' : 'Create your customer account')}
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
                setSuccessMessage('');
                setConfirmPassword('');
              }}
              className={`flex-1 py-2.5 rounded-md font-medium transition-all text-sm md:text-base ${
                isLogin
                  ? 'bg-[#ff6b35] text-white shadow-lg'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              <LogIn className="w-4 h-4 inline mr-2" />
              {isFr ? 'Connexion' : 'Login'}
            </button>
            <button
              onClick={() => {
                setIsLogin(false);
                setError('');
                setSuccessMessage('');
                setConfirmPassword('');
              }}
              className={`flex-1 py-2.5 rounded-md font-medium transition-all text-sm md:text-base ${
                !isLogin
                  ? 'bg-[#ff6b35] text-white shadow-lg'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              <UserPlus className="w-4 h-4 inline mr-2" />
              {isFr ? 'Inscription' : 'Sign up'}
            </button>
          </div>

          {/* Message d'erreur */}
          {error && (
            <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200 text-sm">
              {error}
            </div>
          )}
          {successMessage && (
            <div className="mb-4 p-3 bg-green-500/20 border border-green-500/50 rounded-lg text-green-200 text-sm">
              {successMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Nom (inscription uniquement) */}
            {!isLogin && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    {isFr ? 'Nom complet *' : 'Full name *'}
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ff6b35] focus:border-transparent text-sm md:text-base"
                      placeholder={isFr ? 'Jean Dupont' : 'John Doe'}
                      required={!isLogin}
                    />
                  </div>
                </div>

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
                      placeholder={isFr ? 'Mon Entreprise' : 'My Company'}
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
                {isFr ? 'Mot de passe *' : 'Password *'}
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
                  aria-label={showPassword ? (isFr ? 'Masquer le mot de passe' : 'Hide password') : (isFr ? 'Afficher le mot de passe' : 'Show password')}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {!isLogin && (
                <p className="mt-1 text-xs text-gray-400">
                  {isFr ? 'Minimum 8 caractères avec majuscule, minuscule, chiffre et caractère spécial' : 'Minimum 8 characters with uppercase, lowercase, number and special character'}
                </p>
              )}
              {isLogin && (
                <div className="mt-2 text-right">
                  <button
                    type="button"
                    onClick={() => navigate('/forgot-password')}
                    className="text-sm text-gray-400 hover:text-[#ff6b35] transition-colors"
                  >
                    {isFr ? 'Mot de passe oublié ?' : 'Forgot password?'}
                  </button>
                </div>
              )}
            </div>

            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  {isFr ? 'Confirmer le mot de passe *' : 'Confirm password *'}
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
                    placeholder={isFr ? 'Retapez votre mot de passe' : 'Type your password again'}
                    required
                    minLength={8}
                  />
                </div>
                <p className="mt-1 text-xs text-gray-400">
                  {isFr ? 'Copier/coller désactivé pour confirmer le mot de passe' : 'Copy/paste disabled to confirm password'}
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
                  {isFr ? 'Chargement...' : 'Loading...'}
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  {isLogin ? (
                    <>
                      <LogIn className="w-5 h-5" />
                      {isFr ? 'Se connecter' : 'Log in'}
                    </>
                  ) : (
                    <>
                      <UserPlus className="w-5 h-5" />
                      {isFr ? "S'inscrire" : 'Sign up'}
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
              {isFr ? "← Retour à l'accueil" : "← Back to home"}
            </button>
          </div>
        </div>

        {/* Info admin */}
        <div className="mt-6 text-center text-xs text-gray-400 bg-white/5 rounded-lg p-3">
          💡 <strong>{isFr ? 'Compte admin :' : 'Admin account:'}</strong> contactus@novakom.tech
        </div>
      </div>
    </div>
  );
}
