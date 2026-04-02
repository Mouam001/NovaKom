import { AlertTriangle, TrendingDown, Database, WifiOff, AlertCircle } from "lucide-react";

const problems = [
  {
    icon: <AlertTriangle className="w-6 h-6" />,
    title: "Risques de cyberattaques",
    desc: "Les PME et institutions sont des cibles privilégiées. Ransomware, phishing, intrusions… les menaces numériques évoluent chaque jour.",
    color: "#e74c3c",
  },
  {
    icon: <TrendingDown className="w-6 h-6" />,
    title: "Pertes financières",
    desc: "Une attaque ou une panne non maîtrisée peut coûter des millions de francs en récupération, amendes et perte de clientèle.",
    color: "#f39c12",
  },
  {
    icon: <Database className="w-6 h-6" />,
    title: "Perte de données critiques",
    desc: "Sans sauvegarde et protection adéquates, vos données — clients, contrats, finances — peuvent disparaître en quelques secondes.",
    color: "#9b59b6",
  },
  {
    icon: <WifiOff className="w-6 h-6" />,
    title: "Interruption d'activité",
    desc: "Un réseau non supervisé peut tomber à tout moment. Chaque heure d'arrêt représente un coût direct pour votre entreprise.",
    color: "#e67e22",
  },
  {
    icon: <AlertCircle className="w-6 h-6" />,
    title: "Manque de structuration IT locale",
    desc: "Le marché comorien manque encore de prestataires IT structurés. NovaKom comble ce fossé avec une expertise de niveau international.",
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
            Les risques auxquels votre entreprise est exposée
          </h2>
          <p
            className="text-white/50 max-w-xl mx-auto"
            style={{ fontFamily: "Inter, sans-serif", fontSize: "0.95rem", lineHeight: 1.75 }}
          >
            Ne pas agir aujourd'hui, c'est laisser la porte ouverte aux menaces
            de demain. Voici les réalités du terrain que nous combattons chaque jour.
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
                Protégez-vous dès aujourd'hui
              </p>
              <p
                className="text-white/60 text-sm mb-6"
                style={{ fontFamily: "Inter, sans-serif", lineHeight: 1.7 }}
              >
                NovaKom évalue votre situation actuelle et met en place une
                stratégie adaptée à votre contexte.
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
