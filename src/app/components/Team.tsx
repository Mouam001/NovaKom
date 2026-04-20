import ImgMou from "@/assets/images/nicolas.jpg";
import Houlam from "@/assets/images/Houlam.jpeg"
import Abdel from "@/assets/images/Abdel.png"
import Djae from "@/assets/images/djae.jpeg"
import Isak from "@/assets/images/isak.jpeg"
import { Linkedin, Globe } from "lucide-react";


const team = [
  {
    name: "Mouammar Soulé",
    role: "Ingénieur Logiciel",
    desc: "Spécialiste développement et architecture applicative. Expert en systèmes distribués et solutions cloud-native.",
    img:  ImgMou,
    objectPosition: "center 8%",
    badge: "Dev & Architecture",
    color: "#3b82f6",
    linkedin: "https://www.linkedin.com/in/soule-mouammar-134b5423a/",
    portfolio: "https://www.mouammarsoule.fr/",
  },
  {
    name: "DJOUNEID MOHAMED",
    role: "Security Engineer | Pentester | AI-Driven Cybersecurity",
    desc: "Spécialiste en tests d'intrusion et en audit de sécurité (applicatif et réseau), " +
        "je me concentre sur l'automatisation de la détection de vulnérabilités. " +
        "Grâce à l'analyse de données et à l'intelligence artificielle, " +
        "j'identifie proactivement les failles pour renforcer durablement la résilience des systèmes d'information.",
    img: Houlam,
    objectPosition: "center 6%",
    badge: "Cybersécurité",
    color: "#00A86B",
    linkedin: "https://www.linkedin.com/in/djouneid-mohamed-b95a98285/",
    portfolio: "https://houlam-portfolio.vercel.app/",
  },
  {
    name: "Abdourahamane AbdelWahab Ben Said",
    role: "Security Engineer | Network & Infrastructure Security | DevSecOps",
    desc: "Spécialiste dans la sécurisation et l'automatisation des environnements IT, " +
        "je mets en place des pipelines DevSecOps performants. Mon objectif : " +
        "réduire drastiquement les risques de sécurité tout en accélérant la vélocité des déploiements.",
    img: Abdel,
    objectPosition: "center 7%",
    badge: "DevSecOps",
    color: "#a855f7",
    linkedin: "https://www.linkedin.com/in/abdelwahab28/",
    portfolio: "#",
  },

  {
    name: "Ishack Ibrahim",
    role: "Électricien spécialisé BTP & Industrie",
    desc: "Professionnel polyvalent justifiant d’une solide expertise en maintenance industrielle et en installations électriques du bâtiment. " +
        "Maîtrisant l’intégration des automatismes, de la mécanique, de l’électronique et de la pneumatique. " +
        "Spécialisé en gestion de l’énergie électrique et en développement durable, " +
        "je conçois et optimise des solutions visant à réduire l’empreinte carbone, " +
        "améliorer l’efficacité énergétique et garantir la fiabilité des équipements de production.",
    img: Isak,
    objectPosition: "center 5%",
    badge: "Électro-Énergie",
    color: "#2563eb",
    linkedin: "https://www.linkedin.com/in/ishack-i-81b4713b3/",
  },

  {
    name: "Djae Insa",
    role: "Data Analyst | Banque & Finance",
    desc: "Spécialisé en analyse de données dans le secteur bancaire et financier, " +
        "j’exploite les données pour produire des insights stratégiques, optimiser les performances " +
        "et soutenir la prise de décision. Mon objectif : transformer les données en valeur concrète pour l’entreprise.",
    img: Djae,
    objectPosition: "center 7%",
    badge: "Data & Finance",
    color: "#0ea5e9",
    linkedin: "#",
    portfolio: "#",
  },
    
];

export function Team() {
  return (
    <section
      id="equipe"
      className="py-24"
      style={{ backgroundColor: "#081733" }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p
            className="text-xs tracking-widest uppercase mb-3"
            style={{ color: "#00A86B", fontFamily: "Inter, sans-serif" }}
          >
            Les experts derrière NovaKom
          </p>
          <h2
            className="text-white mb-5"
            style={{
              fontFamily: "Poppins, sans-serif",
              fontWeight: 700,
              fontSize: "clamp(1.6rem, 3vw, 2.5rem)",
            }}
          >
            Une équipe d'élite dédiée à votre sécurité
          </h2>
          <p
            className="text-white/50 max-w-xl mx-auto"
            style={{ fontFamily: "Inter, sans-serif", fontSize: "0.95rem", lineHeight: 1.75 }}
          >
            5 professionnels passionnés, certifiés et engagés à bâtir la
            prochaine génération d'infrastructures numériques comoriennes.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {team.map((member) => (
            <div
              key={member.name}
              className="rounded-2xl overflow-hidden group hover:-translate-y-2 transition-transform duration-300"
              style={{
                backgroundColor: "#0d2254",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              {/* Photo */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  style={{ objectPosition: member.objectPosition || "center 8%" }}
                />
                {/* Badge */}
                <div
                  className="absolute top-4 left-4 px-2.5 py-1 rounded-full text-xs"
                  style={{
                    backgroundColor: member.color + "22",
                    color: member.color,
                    border: `1px solid ${member.color}44`,
                    fontFamily: "Inter, sans-serif",
                  }}
                >
                  {member.badge}
                </div>
              </div>

              {/* Info */}
              <div className="p-6">
                <h3
                  className="text-white mb-0.5"
                  style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: "1rem" }}
                >
                  {member.name}
                </h3>
                <p
                  className="mb-3 text-sm"
                  style={{ color: member.color, fontFamily: "Inter, sans-serif", fontWeight: 500 }}
                >
                  {member.role}
                </p>
                <p
                  className="text-white/50 text-sm mb-5"
                  style={{ fontFamily: "Inter, sans-serif", lineHeight: 1.7 }}
                >
                  {member.desc}
                </p>
                <div className="flex gap-4">
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm transition-colors hover:opacity-80"
                    style={{ color: "#0077B5", fontFamily: "Inter, sans-serif" }}
                  >
                    <Linkedin className="w-4 h-4" /> LinkedIn
                  </a>
                  <a
                    href={member.portfolio}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm transition-colors hover:opacity-80"
                    style={{ color: "#FFD700", fontFamily: "Inter, sans-serif" }}
                  >
                    <Globe className="w-4 h-4" /> Portfolio
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
