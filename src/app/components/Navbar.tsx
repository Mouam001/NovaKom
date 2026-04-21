import { useState, useEffect } from "react";
import { Menu, X, Calendar, LogIn, LogOut, User, Shield } from "lucide-react";
import { NovaKomLogo } from "./NovaKomLogo";
import { useAuth } from "../contexts/AuthContext";
import { Link, useLocation, useNavigate } from "react-router-dom";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, signOut, isAdmin } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    if (href.startsWith('#')) {
      if (!isHomePage) {
        navigate('/');
        setTimeout(() => {
          const element = document.querySelector(href);
          element?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        const element = document.querySelector(href);
        element?.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(href);
    }
    setOpen(false);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
    setOpen(false);
  };

  const links = [
    { label: "Services", href: "#services" },
    { label: "Offres", href: "#offres" },
    { label: "Formations", href: "#formations" },
    { label: "Réalisations", href: "#interventions" },
    { label: "Équipe", href: "#equipe" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <nav
      style={{
        backgroundColor: scrolled ? "#0A1F44f5" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        transition: "background-color 0.3s ease",
      }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center"
          onClick={() => {
            setOpen(false);
            if (isHomePage) {
              const element = document.querySelector('#hero');
              element?.scrollIntoView({ behavior: 'smooth' });
            }
          }}
        >
          <NovaKomLogo size={42} showText={true} variant="dark" />
        </Link>

        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-6 xl:gap-8">
          {links.map((l) => (
            <button
              key={l.href}
              onClick={() => handleNavClick(l.href)}
              className="relative cursor-pointer text-white/70 text-sm transition-all duration-300 ease-in-out hover:text-[#ff6b35] hover:scale-105 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-[#ff6b35] after:transition-all after:duration-300 after:ease-in-out hover:after:w-full"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              {l.label}
            </button>
          ))}
          <button
            onClick={() => handleNavClick('/appointment')}
            className="px-4 py-2 rounded-lg text-sm text-white transition-all hover:scale-105 flex items-center gap-2"
            style={{
              background: "linear-gradient(135deg, #ff6b35, #f9a826)",
              fontFamily: "Inter, sans-serif",
            }}
          >
            <Calendar className="w-4 h-4" />
            Rendez-vous
          </button>
          {user ? (
            <div className="flex items-center gap-3">
              {isAdmin && (
                <button
                  onClick={() => handleNavClick('/admin')}
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm text-white transition-all flex items-center gap-2"
                >
                  <Shield className="w-4 h-4" />
                  Admin
                </button>
              )}
              <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-lg">
                <User className="w-4 h-4 text-white/70" />
                <span className="text-white/90 text-sm">{user.user_metadata?.name || 'Utilisateur'}</span>
              </div>
              <button
                onClick={handleSignOut}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm text-white transition-all flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Déconnexion
              </button>
            </div>
          ) : (
            <button
              onClick={() => handleNavClick('/login')}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm text-white transition-all flex items-center gap-2"
            >
              <LogIn className="w-4 h-4" />
              Connexion
            </button>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          className="lg:hidden text-white"
          onClick={() => setOpen(!open)}
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          className="lg:hidden px-4 md:px-6 pb-6 flex flex-col gap-4"
          style={{ backgroundColor: "#0A1F44f9" }}
        >
          {links.map((l) => (
            <button
              key={l.href}
              onClick={() => handleNavClick(l.href)}
              className="relative cursor-pointer text-white/80 text-sm border-b border-white/10 pb-3 text-left transition-all duration-300 ease-in-out hover:text-[#ff6b35] hover:scale-105 after:content-[''] after:absolute after:left-0 after:bottom-2 after:h-0.5 after:w-0 after:bg-[#ff6b35] after:transition-all after:duration-300 after:ease-in-out hover:after:w-full"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              {l.label}
            </button>
          ))}
          <button
            onClick={() => handleNavClick('/appointment')}
            className="px-5 py-2 rounded-lg text-sm text-white text-center flex items-center justify-center gap-2"
            style={{ background: "linear-gradient(135deg, #ff6b35, #f9a826)", fontFamily: "Inter, sans-serif" }}
          >
            <Calendar className="w-4 h-4" />
            Prendre rendez-vous
          </button>
          {user ? (
            <>
              {isAdmin && (
                <button
                  onClick={() => handleNavClick('/admin')}
                  className="px-5 py-2 bg-white/10 rounded-lg text-sm text-white text-center flex items-center justify-center gap-2"
                >
                  <Shield className="w-4 h-4" />
                  Administration
                </button>
              )}
              <div className="px-3 py-2 bg-white/5 rounded-lg text-sm text-white flex items-center gap-2">
                <User className="w-4 h-4" />
                {user.user_metadata?.name || user.email}
              </div>
              <button
                onClick={handleSignOut}
                className="px-5 py-2 bg-white/10 rounded-lg text-sm text-white text-center flex items-center justify-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Déconnexion
              </button>
            </>
          ) : (
            <button
              onClick={() => handleNavClick('/login')}
              className="px-5 py-2 bg-white/10 rounded-lg text-sm text-white text-center flex items-center justify-center gap-2"
            >
              <LogIn className="w-4 h-4" />
              Connexion
            </button>
          )}
        </div>
      )}
    </nav>
  );
}
