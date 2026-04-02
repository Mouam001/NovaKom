import { Check, Star } from "lucide-react";

const packs = [
  {
    name: "Pack Basic",
    tag: "Essentiel",
    price: "Sur devis",
    highlight: false,
    color: "#3b82f6",
    desc: "Idéal pour les petites structures souhaitant sécuriser leurs bases.",
    features: [
      "Maintenance préventive mensuelle",
      "Sauvegarde sécurisée des données",
      "Support utilisateur (horaires ouvrés)",
      "Rapport mensuel",
      "Antivirus & patch management",
    ],
  },
  {
    name: "Pack Standard",
    tag: "Recommandé",
    price: "Sur devis",
    highlight: true,
    color: "#00A86B",
    desc: "Pour les PME en croissance voulant une protection réseau proactive.",
    features: [
      "Tout le Pack Basic",
      "Sécurité réseau & firewall",
      "VPN entreprise configuré",
      "Monitoring réseau 5j/7",
      "Audit sécurité semestriel",
      "Support prioritaire",
    ],
  },
  {
    name: "Pack Premium",
    tag: "Complet",
    price: "Sur devis",
    highlight: false,
    color: "#a855f7",
    desc: "Infogérance complète avec cybersécurité avancée pour les structures exigeantes.",
    features: [
      "Tout le Pack Standard",
      "Infogérance IT complète",
      "Cybersécurité avancée (pentest inclus)",
      "Monitoring 24/7",
      "Administration serveurs & AD",
      "Sensibilisation & formation équipes",
      "RSSI externalisé",
    ],
  },
];

export function Packages() {
  return (
    <section
      id="offres"
      className="py-24"
      style={{ backgroundColor: "#081733" }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p
            className="text-xs tracking-widest uppercase mb-3"
            style={{ color: "#00A86B", fontFamily: "Inter, sans-serif" }}
          >
            Nos offres
          </p>
          <h2
            className="text-white mb-5"
            style={{
              fontFamily: "Poppins, sans-serif",
              fontWeight: 700,
              fontSize: "clamp(1.6rem, 3vw, 2.5rem)",
            }}
          >
            Des packs adaptés à chaque besoin
          </h2>
          <p
            className="text-white/50 max-w-xl mx-auto"
            style={{ fontFamily: "Inter, sans-serif", fontSize: "0.95rem", lineHeight: 1.75 }}
          >
            Des offres claires et transparentes, conçues pour s'adapter à la
            taille et aux ambitions de votre organisation.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 items-stretch">
          {packs.map((pack) => (
            <div
              key={pack.name}
              className="rounded-2xl p-8 flex flex-col relative overflow-hidden transition-transform hover:-translate-y-1 duration-300"
              style={{
                backgroundColor: pack.highlight ? pack.color + "18" : "#0d2254",
                border: `1.5px solid ${pack.highlight ? pack.color : pack.color + "33"}`,
                boxShadow: pack.highlight ? `0 0 40px ${pack.color}22` : "none",
              }}
            >
              {pack.highlight && (
                <div
                  className="absolute top-4 right-4 flex items-center gap-1 px-2.5 py-1 rounded-full text-xs"
                  style={{
                    backgroundColor: pack.color + "22",
                    color: pack.color,
                    fontFamily: "Inter, sans-serif",
                  }}
                >
                  <Star className="w-3 h-3" /> {pack.tag}
                </div>
              )}
              {!pack.highlight && (
                <div
                  className="inline-block px-2.5 py-1 rounded-full text-xs mb-4 w-fit"
                  style={{
                    backgroundColor: pack.color + "18",
                    color: pack.color,
                    fontFamily: "Inter, sans-serif",
                  }}
                >
                  {pack.tag}
                </div>
              )}
              {pack.highlight && <div className="mb-4" />}

              <h3
                className="text-white mb-2"
                style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: "1.3rem" }}
              >
                {pack.name}
              </h3>

              <p
                className="text-white/50 text-sm mb-6"
                style={{ fontFamily: "Inter, sans-serif", lineHeight: 1.7 }}
              >
                {pack.desc}
              </p>

              <ul className="flex flex-col gap-3 mb-8">
                {pack.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <div
                      className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ backgroundColor: pack.color + "33" }}
                    >
                      <Check className="w-2.5 h-2.5" style={{ color: pack.color }} />
                    </div>
                    <span
                      className="text-white/70 text-sm"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      {f}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto">
                <p
                  className="text-white/40 text-xs mb-3"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  Tarification personnalisée
                </p>
                <a
                  href="#contact"
                  className="block text-center px-5 py-3 rounded-xl text-sm text-white transition-all hover:opacity-90"
                  style={{
                    background: pack.highlight
                      ? `linear-gradient(135deg, ${pack.color}, #007a4e)`
                      : `linear-gradient(135deg, ${pack.color}33, ${pack.color}22)`,
                    border: `1px solid ${pack.color}55`,
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 600,
                    color: pack.highlight ? "#fff" : pack.color,
                  }}
                >
                  Obtenir un devis
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
