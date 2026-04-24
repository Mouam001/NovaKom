import { ArrowRight, MessageCircle } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

const heroImage =
  "https://images.unsplash.com/photo-1744868562210-fffb7fa882d9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZXJ2ZXIlMjByb29tJTIwZGF0YSUyMGNlbnRlciUyMG1vZGVybiUyMElUJTIwaW5mcmFzdHJ1Y3R1cmV8ZW58MXx8fHwxNzcyNDk2NTExfDA&ixlib=rb-4.1.0&q=80&w=1080";

export function Hero() {
  const { language } = useLanguage();
  const isFr = language === "fr";

  const stats = isFr
    ? [
        { val: "5+", label: "Experts certifiés" },
        { val: "100%", label: "Approche sécurisée" },
        { val: "24/7", label: "Support & monitoring" },
      ]
    : [
        { val: "5+", label: "Certified experts" },
        { val: "100%", label: "Security-first approach" },
        { val: "24/7", label: "Support & monitoring" },
      ];

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ backgroundColor: "#0A1F44" }}
    >
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="net" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="1.5" fill="#00A86B" />
              <line x1="1" y1="1" x2="61" y2="1" stroke="#00A86B" strokeWidth="0.4" />
              <line x1="1" y1="1" x2="1" y2="61" stroke="#00A86B" strokeWidth="0.4" />
              <line x1="1" y1="1" x2="31" y2="31" stroke="#00A86B" strokeWidth="0.3" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#net)" />
        </svg>
      </div>

      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 70% 50%, rgba(0,168,107,0.12) 0%, transparent 60%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-16 grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs mb-6 border"
            style={{
              borderColor: "#00A86B44",
              backgroundColor: "#00A86B18",
              color: "#00A86B",
              fontFamily: "Inter, sans-serif",
            }}
          >
            <span className="w-2 h-2 rounded-full bg-[#00A86B] animate-pulse" />
            {isFr ? "Basé à Moroni – Union des Comores" : "Based in Moroni – Comoros"}
          </div>

          <h1
            className="text-white mb-6"
            style={{
              fontFamily: "Poppins, sans-serif",
              fontWeight: 800,
              fontSize: "clamp(2rem, 4.5vw, 3.4rem)",
              lineHeight: 1.15,
            }}
          >
            {isFr ? "Sécurisez et structurez " : "Secure and structure "}
            <span style={{ color: "#00A86B" }}>
              {isFr ? "votre infrastructure IT." : "your IT infrastructure."}
            </span>
          </h1>

          <p
            className="text-white/60 mb-10 max-w-lg"
            style={{ fontFamily: "Inter, sans-serif", fontSize: "1.05rem", lineHeight: 1.75 }}
          >
            {isFr
              ? "NovaKom accompagne les entreprises comoriennes dans la gestion et la protection complète de leur environnement numérique. Un partenaire stratégique IT & Sécurité de niveau international."
              : "NovaKom helps companies manage and fully protect their digital environment. An international-level IT & Security strategic partner."}
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg text-white text-sm transition-all hover:scale-105 hover:shadow-lg"
              style={{
                background: "linear-gradient(135deg, #00A86B, #007a4e)",
                fontFamily: "Inter, sans-serif",
                fontWeight: 600,
              }}
            >
              {isFr ? "Demander un audit" : "Request an audit"} <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg text-white text-sm border transition-all hover:bg-white/10"
              style={{
                borderColor: "rgba(255,255,255,0.25)",
                fontFamily: "Inter, sans-serif",
                fontWeight: 500,
              }}
            >
              <MessageCircle className="w-4 h-4" /> {isFr ? "Parler à un expert" : "Talk to an expert"}
            </a>
          </div>

          <div className="mt-14 flex flex-wrap gap-10">
            {stats.map((s) => (
              <div key={s.label}>
                <p
                  className="text-white"
                  style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: "1.6rem" }}
                >
                  {s.val}
                </p>
                <p className="text-white/50 text-xs" style={{ fontFamily: "Inter, sans-serif" }}>
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative hidden lg:block">
          <div
            className="rounded-2xl overflow-hidden shadow-2xl"
            style={{ border: "1px solid rgba(0,168,107,0.25)" }}
          >
            <img
              src={heroImage}
              alt={isFr ? "Infrastructure IT sécurisée" : "Secure IT infrastructure"}
              className="w-full h-[480px] object-cover"
            />
            <div
              className="absolute inset-0 rounded-2xl"
              style={{
                background:
                  "linear-gradient(to top, #0A1F44cc 0%, transparent 50%)",
              }}
            />
          </div>
          <div
            className="absolute -bottom-5 -left-6 flex items-center gap-3 px-5 py-3 rounded-xl shadow-xl"
            style={{ backgroundColor: "#0d2850", border: "1px solid rgba(0,168,107,0.3)" }}
          >
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: "#00A86B22" }}
            >
              <span style={{ color: "#00A86B", fontSize: "1.2rem" }}>🛡</span>
            </div>
            <div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
