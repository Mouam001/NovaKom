import { AlertTriangle, TrendingDown, Database, WifiOff, AlertCircle } from "lucide-react";

const problems = [
  {
    icon: <AlertTriangle className="w-6 h-6" />,
    title: "Cybermenaces en constante évolution",
    desc: "Les attaques (phishing, ransomware, intrusions) ciblent de plus en plus les entreprises, en particulier les PME et institutions.",
    color: "#e74c3c",
  },
  {
    icon: <TrendingDown className="w-6 h-6" />,
    title: "Impacts financiers importants",
    desc: "Une faille ou une panne peut entraîner des coûts élevés : récupération de données, interruption d’activité, perte de clients.",
    color: "#f39c12",
  },
  {
    icon: <Database className="w-6 h-6" />,
    title: "Risque de perte de données",
    desc: "Sans sauvegarde et protection adaptées, vos données critiques peuvent être irrémédiablement perdues.",
    color: "#9b59b6",
  },
  {
    icon: <WifiOff className="w-6 h-6" />,
    title: "Interruption d'activité",
    desc: "Une infrastructure non supervisée peut provoquer des arrêts de service coûteux pour votre organisation.",
    color: "#e67e22",
  },
  {
    icon: <AlertCircle className="w-6 h-6" />,
    title: "Manque de structuration IT locale",
    desc: "Le marché manque encore de solutions IT complètes et structurées. NovaKom répond à ce besoin avec une approche professionnelle et intégrée.",
    color: "#00A86B",
  },
];

export function Problems() {
  return (
    <section
      id="problematique"
      className="py-24"
      style={{ backgroundColor: "#081733" }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p
            className="text-xs tracking-widest uppercase mb-3"
            style={{ color: "#00A86B", fontFamily: "Inter, sans-serif" }}
          >
            Pourquoi agir maintenant ?
          </p>
          <h2
            className="text-white mb-5"
            style={{
              fontFamily: "Poppins, sans-serif",
              fontWeight: 700,
              fontSize: "clamp(1.6rem, 3vw, 2.5rem)",
            }}
          >
            Protégez votre entreprise face aux risques numériques actuels
          </h2>
          <p
            className="text-white/50 max-w-xl mx-auto"
            style={{ fontFamily: "Inter, sans-serif", fontSize: "0.95rem", lineHeight: 1.75 }}
          >
            Les entreprises sont aujourd’hui confrontées à des menaces IT de plus en plus fréquentes et complexes. Sans une infrastructure sécurisée et bien structurée, votre activité peut être exposée à des interruptions, des pertes de données et des failles de sécurité.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {problems.map((p, i) => (
            <div
              key={i}
              className="p-6 rounded-xl group hover:-translate-y-1 transition-transform duration-300"
              style={{
                backgroundColor: "#0d2254",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                style={{ backgroundColor: p.color + "22", color: p.color }}
              >
                {p.icon}
              </div>
              <h3
                className="text-white mb-2"
                style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, fontSize: "1rem" }}
              >
                {p.title}
              </h3>
              <p
                className="text-white/50 text-sm"
                style={{ fontFamily: "Inter, sans-serif", lineHeight: 1.7 }}
              >
                {p.desc}
              </p>
            </div>
          ))}

          {/* CTA card */}
          <div
            className="p-6 rounded-xl flex flex-col justify-between"
            style={{
              background: "linear-gradient(135deg, #00A86B22, #00A86B08)",
              border: "1px solid #00A86B44",
            }}
          >
            <div>
              <p
                className="text-white mb-2"
                style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: "1.1rem" }}
              >
                Protégez votre entreprise dès aujourd’hui
              </p>
              <p
                className="text-white/60 text-sm mb-6"
                style={{ fontFamily: "Inter, sans-serif", lineHeight: 1.7 }}
              >
                NovaKom analyse votre infrastructure actuelle et vous propose une stratégie adaptée pour sécuriser et optimiser vos systèmes.
              </p>
            </div>
            <a
              href="#contact"
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg text-white text-sm"
              style={{
                background: "linear-gradient(135deg, #00A86B, #007a4e)",
                fontFamily: "Inter, sans-serif",
                fontWeight: 600,
              }}
            >
              Demander un audit gratuit
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
