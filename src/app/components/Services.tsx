import { Shield, Monitor, Network, Code } from "lucide-react";

const poles = [
  {
    icon: <Shield className="w-7 h-7" />,
    pole: "Sécurité & protection des systèmes",
    color: "#00A86B",
    items: [
      "Audit de sécurité",
      "Tests d'intrusion (Pentest)",
      "Firewall, VPN et protection des accès",
      "Sauvegarde et sécurisation des données",
      "Sensibilisation des employés",
    ],
    desc: "Nous protégeons les entreprises contre les cybermenaces et assurons la sécurité de leurs données et infrastructures.",
    objective: "Réduire les risques et sécuriser les actifs numériques.",
  },
  {
    icon: <Monitor className="w-7 h-7" />,
    pole: "Infrastructure IT",
    color: "#3b82f6",
    items: [
      "Installation et gestion de serveurs",
      "Administration réseau et systèmes",
      "Supervision et monitoring",
      "Maintenance préventive et corrective",
      "Optimisation des performances",
    ],
    desc: "Nous structurons et administrons votre infrastructure pour garantir un environnement fiable, stable et sécurisé.",
    objective: "Assurer la continuité et la stabilité de votre système d'information.",
  },
  {
    icon: <Network className="w-7 h-7" />,
    pole: "Support & assistance IT",
    color: "#a855f7",
    items: [
      "Support utilisateurs (helpdesk)",
      "Assistance opérationnelle quotidienne",
      "Gestion des incidents et demandes",
      "Formation des utilisateurs",
      "Accompagnement des équipes métiers",
    ],
    desc: "Nous assurons la gestion quotidienne de votre environnement IT avec une assistance réactive pour vos équipes.",
    objective: "Garantir une assistance continue et améliorer la productivité des équipes.",
  },
  {
    icon: <Code className="w-7 h-7" />,
    pole: "Développement digital",
    color: "#f59e0b",
    items: [
      "Applications web",
      "Applications mobiles",
      "Logiciels métiers",
      "API et intégrations",
      "Modernisation d'outils existants",
    ],
    desc: "Nous développons des applications sécurisées dès leur conception grâce à une approche DevSecOps alliant sécurité et performance.",
    objective: "Livrer des solutions digitales sécurisées, évolutives et adaptées à vos besoins.",
  },
];

export function Services() {
  return (
    <section
      id="services"
      className="py-24"
      style={{ backgroundColor: "#0A1F44" }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p
            className="text-xs tracking-widest uppercase mb-3"
            style={{ color: "#00A86B", fontFamily: "Inter, sans-serif" }}
          >
            Nos services
          </p>
          <h2
            className="text-white mb-5"
            style={{
              fontFamily: "Poppins, sans-serif",
              fontWeight: 700,
              fontSize: "clamp(1.6rem, 3vw, 2.5rem)",
            }}
          >
            Nos 4 pôles d'expertise
          </h2>
          <p
            className="text-white/50 max-w-xl mx-auto"
            style={{ fontFamily: "Inter, sans-serif", fontSize: "0.95rem", lineHeight: 1.75 }}
          >
            Des solutions IT complètes pour accompagner la transformation digitale, sécuriser et optimiser les systèmes des entreprises aux Comores et à l’international.
          </p>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8">
          {poles.map((p, i) => (
            <div
              key={i}
              className="rounded-2xl p-8 flex flex-col group hover:-translate-y-2 transition-transform duration-300"
              style={{
                backgroundColor: "#0d2254",
                border: `1px solid ${p.color}33`,
              }}
            >
              {/* Icon */}
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center mb-5"
                style={{ backgroundColor: p.color + "22", color: p.color }}
              >
                {p.icon}
              </div>

              <h3
                className="text-white mb-3"
                style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: "1.1rem" }}
              >
                {p.pole}
              </h3>

              <p
                className="text-white/50 text-sm mb-6"
                style={{ fontFamily: "Inter, sans-serif", lineHeight: 1.7 }}
              >
                {p.desc}
              </p>

              {/* List */}
              <ul className="flex flex-col gap-2.5 mt-auto">
                {p.items.map((item) => (
                  <li key={item} className="flex items-center gap-2.5">
                    <span
                      className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ backgroundColor: p.color }}
                    />
                    <span
                      className="text-white/70 text-sm"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      {item}
                    </span>
                  </li>
                ))}
              </ul>

              <div
                className="mt-6 rounded-lg px-3 py-2"
                style={{
                  backgroundColor: p.color + "1A",
                  border: `1px solid ${p.color}44`,
                }}
              >
                <p
                  className="text-sm"
                  style={{ fontFamily: "Inter, sans-serif", lineHeight: 1.6 }}
                >
                  <span style={{ color: p.color, fontWeight: 700 }}>Objectif :</span>{" "}
                  <span className="text-white/90" style={{ fontWeight: 500 }}>
                    {p.objective}
                  </span>
                </p>
              </div>

              {/* Bottom line */}
              <div
                className="mt-7 h-0.5 rounded-full"
                style={{ background: `linear-gradient(90deg, ${p.color}, transparent)` }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
