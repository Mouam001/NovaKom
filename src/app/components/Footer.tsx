import { Facebook, Linkedin } from "lucide-react";
import { NovaKomLogo } from "./NovaKomLogo";

export function Footer() {
  return (
    <footer style={{ backgroundColor: "#060f22", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="mb-5">
              <NovaKomLogo size={44} showText={true} variant="dark" />
            </div>
            <p
              className="text-white/40 text-sm max-w-sm mb-6"
              style={{ fontFamily: "Inter, sans-serif", lineHeight: 1.8 }}
            >
              NovaKom – La nouvelle ère numérique comorienne. Votre partenaire
              stratégique en infrastructure IT et cybersécurité, basé à Moroni.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-9 h-9 rounded-lg flex items-center justify-center transition-all hover:scale-110"
                style={{ backgroundColor: "#1877F222", border: "1px solid #1877F244" }}
              >
                <Facebook className="w-4 h-4 text-[#1877F2]" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-lg flex items-center justify-center transition-all hover:scale-110"
                style={{ backgroundColor: "#0077B522", border: "1px solid #0077B544" }}
              >
                <Linkedin className="w-4 h-4 text-[#0077B5]" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <p
              className="text-white text-sm mb-5"
              style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}
            >
              Services
            </p>
            <ul className="flex flex-col gap-3">
              {[
                "Audit de sécurité",
                "Pentest",
                "Administration réseau",
                "Support IT",
                "Virtualisation",
                "Infogérance",
              ].map((s) => (
                <li key={s}>
                  <a
                    href="#services"
                    className="text-white/40 hover:text-white/80 text-sm transition-colors"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <p
              className="text-white text-sm mb-5"
              style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}
            >
              Entreprise
            </p>
            <ul className="flex flex-col gap-3">
              {[
                { label: "À propos", href: "#expertise" },
                { label: "Notre équipe", href: "#equipe" },
                { label: "Nos offres", href: "#offres" },
                { label: "Formations", href: "#formations" },
                { label: "Réalisations", href: "#interventions" },
                { label: "Contact", href: "#contact" },
                { label: "Mentions légales", href: "#" },
                { label: "Politique de confidentialité", href: "#" },
              ].map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="text-white/40 hover:text-white/80 text-sm transition-colors"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          className="mt-14 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
        >
          <p
            className="text-white/30 text-xs"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            © {new Date().getFullYear()} NovaKom – Tous droits réservés. Moroni, Union des Comores.
          </p>
          <p
            className="text-white/20 text-xs"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            IT Infrastructure & Cyber Defense
          </p>
        </div>
      </div>
    </footer>
  );
}