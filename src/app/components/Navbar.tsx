import { useState, useEffect, useRef, type RefObject } from "react";
import { Menu, X, Calendar, LogIn, LogOut, User, Shield, ChevronDown, Check } from "lucide-react";
import { NovaKomLogo } from "./NovaKomLogo";
import { useAuth } from "../contexts/AuthContext";
import { useLanguage } from "../contexts/LanguageContext";
import { Link, useLocation, useNavigate } from "react-router-dom";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, signOut, isAdmin } = useAuth();
  const { language, setLanguage } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const desktopUserMenuRef = useRef<HTMLDivElement>(null);
  const mobileUserMenuRef = useRef<HTMLDivElement>(null);
  const isHomePage = location.pathname === '/';
  const isFr = language === "fr";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node;
      const insideDesktop = !!desktopUserMenuRef.current?.contains(target);
      const insideMobile = !!mobileUserMenuRef.current?.contains(target);

      if (!insideDesktop && !insideMobile) {
        setUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
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
    setUserMenuOpen(false);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
    setOpen(false);
    setUserMenuOpen(false);
  };

  const links = [
    { label: isFr ? "Services" : "Services", href: "#services" },
    { label: isFr ? "Offres" : "Packages", href: "#offres" },
    { label: isFr ? "Formations" : "Training", href: "#formations" },
    { label: isFr ? "Réalisations" : "Work", href: "#interventions" },
    { label: isFr ? "Équipe" : "Team", href: "#equipe" },
    { label: isFr ? "Contact" : "Contact", href: "#contact" },
  ];

  const ProfileMenu = ({ menuRef }: { menuRef: RefObject<HTMLDivElement | null> }) => (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setUserMenuOpen((prev) => !prev)}
        aria-haspopup="menu"
        aria-expanded={userMenuOpen}
        className="flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-2 text-white transition-all hover:bg-white/20"
      >
        <User className="h-4 w-4" />
        <ChevronDown className={`h-3.5 w-3.5 transition-transform ${userMenuOpen ? "rotate-180" : ""}`} />
      </button>

      {userMenuOpen && (
        <div
          className="absolute right-0 top-full z-[60] mt-2 w-56 rounded-xl border border-blue-200/20 bg-[#0c2854]/95 p-2 shadow-2xl backdrop-blur-xl"
          role="menu"
        >
          <p className="px-3 pb-1 pt-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-white/55">
            {isFr ? "Compte" : "Account"}
          </p>
          {user ? (
            <button
              onClick={handleSignOut}
              className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-white/90 transition-colors hover:bg-white/10 hover:text-white"
              role="menuitem"
            >
              <LogOut className="h-4 w-4" />
              {isFr ? "Déconnexion" : "Logout"}
            </button>
          ) : (
            <button
              onClick={() => handleNavClick("/login")}
              className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-white/90 transition-colors hover:bg-white/10 hover:text-white"
              role="menuitem"
            >
              <LogIn className="h-4 w-4" />
              {isFr ? "Connexion" : "Login"}
            </button>
          )}

          <div className="my-2 h-px bg-white/10" />

          <p className="px-3 pb-1 pt-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-white/55">
            {isFr ? "Langue" : "Language"}
          </p>
          <button
            onClick={() => {
              setLanguage("fr");
              setUserMenuOpen(false);
            }}
            className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors ${
              language === "fr"
                ? "bg-white/15 text-white"
                : "text-white/80 hover:bg-white/10 hover:text-white"
            }`}
            role="menuitemradio"
            aria-checked={language === "fr"}
          >
            <span>Français</span>
            {language === "fr" && <Check className="h-4 w-4 text-[#ffb27a]" />}
          </button>
          <button
            onClick={() => {
              setLanguage("en");
              setUserMenuOpen(false);
            }}
            className={`mt-1 flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors ${
              language === "en"
                ? "bg-white/15 text-white"
                : "text-white/80 hover:bg-white/10 hover:text-white"
            }`}
            role="menuitemradio"
            aria-checked={language === "en"}
          >
            <span>English</span>
            {language === "en" && <Check className="h-4 w-4 text-[#ffb27a]" />}
          </button>
        </div>
      )}
    </div>
  );

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
            {isFr ? "Rendez-vous" : "Book a call"}
          </button>
          {isAdmin && (
            <button
              onClick={() => handleNavClick('/admin')}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm text-white transition-all flex items-center gap-2"
            >
              <Shield className="w-4 h-4" />
              {isFr ? "Admin" : "Admin"}
            </button>
          )}
          <ProfileMenu menuRef={desktopUserMenuRef} />
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <ProfileMenu menuRef={mobileUserMenuRef} />
          <button
            className="text-white"
            onClick={() => setOpen(!open)}
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

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
            {isFr ? "Prendre rendez-vous" : "Book a call"}
          </button>
          {user ? (
            <>
              {isAdmin && (
                <button
                  onClick={() => handleNavClick('/admin')}
                  className="px-5 py-2 bg-white/10 rounded-lg text-sm text-white text-center flex items-center justify-center gap-2"
                >
                  <Shield className="w-4 h-4" />
                  {isFr ? "Administration" : "Administration"}
                </button>
              )}
            </>
          ) : null}
        </div>
      )}
    </nav>
  );
}
