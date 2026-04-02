import { Shield, Monitor, Network } from "lucide-react";

const poles = [
  {
    icon: <Shield className="w-7 h-7" />,
    pole: "Pôle Cybersécurité",
    color: "#00A86B",
    items: [
      "Audit sécurité",
      "Pentest (tests d'intrusion)",
      "Firewall & UTM",
      "VPN sécurisé",
      "Sauvegarde sécurisée",
      "Sensibilisation employés",
    ],
    desc: "Nous protégeons vos systèmes contre toutes formes d'intrusion et de compromission, de l'audit à la mise en conformité.",
  },
  {
    icon: <Monitor className="w-7 h-7" />,
    pole: "Support & Assistance IT",
    color: "#3b82f6",
    items: [
      "Maintenance préventive & corrective",
      "Support utilisateurs",
      "Installation système",
      "Migration de données",
      "Récupération de données",
      "Helpdesk dédié",
    ],
    desc: "Votre équipe IT externalisée, disponible pour résoudre chaque problème technique rapidement et efficacement.",
  },
  {
    icon: <Network className="w-7 h-7" />,
    pole: "Administration Réseau & Système",
    color: "#a855f7",
    items: [
      "Installation de serveurs",
      "Active Directory",
      "Virtualisation (VMware/Hyper-V)",
      "WiFi sécurisé",
      "Monitoring réseau 24/7",
      "Infrastructure cloud",
    ],
    desc: "Conception et administration d'infrastructures réseau robustes, évolutives et sécurisées pour votre organisation.",
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
            Ce que nous faisons
          </p>
          <h2
            className="text-white mb-5"
            style={{
              fontFamily: "Poppins, sans-serif",
              fontWeight: 700,
              fontSize: "clamp(1.6rem, 3vw, 2.5rem)",
            }}
          >
            Nos 3 pôles d'expertise
          </h2>
          <p
            className="text-white/50 max-w-xl mx-auto"
            style={{ fontFamily: "Inter, sans-serif", fontSize: "0.95rem", lineHeight: 1.75 }}
          >
            Des services complets, structurés et adaptés aux besoins des PME,
            institutions et entreprises aux Comores et à l'international.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
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
