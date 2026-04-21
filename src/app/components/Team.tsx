import ImgMou from "@/assets/images/nicolas.jpg";
import Houlam from "@/assets/images/Houlam.jpeg"
import Abdel from "@/assets/images/Abdel.png"
import Djae from "@/assets/images/djae.jpeg"
import Isak from "@/assets/images/isak.jpeg"
import { Linkedin, Globe } from "lucide-react";


const team = [
  {
    name: "Mouammar Soulé",
    role: "Ingénieur Logiciel | Architecture Applicative | Cloud-Native",
    desc: "Spécialiste du développement et de l’architecture logicielle, je conçois des applications performantes, évolutives et adaptées aux besoins métiers. " +
        "Chez NovaKom, je développe des solutions robustes et modernes, capables de soutenir la transformation digitale de nos clients.",
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
    desc: "Spécialisé en tests d’intrusion et en audit de sécurité (applicatif et réseau), j’identifie les vulnérabilités et les failles critiques des systèmes d’information. " +
        "Chez NovaKom, j’utilise l’automatisation et l’intelligence artificielle pour détecter proactivement les menaces et renforcer durablement la sécurité de nos clients.",
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
    desc: "Spécialisé dans la sécurisation des infrastructures IT et des environnements réseau, je conçois des systèmes fiables, résilients et adaptés aux exigences professionnelles. " +
        "Chez NovaKom, je veille à protéger les systèmes de nos clients, sécuriser leurs données et intégrer la sécurité dès la conception de leurs solutions digitales.",
    img: Abdel,
    objectPosition: "center 7%",
    badge: "DevSecOps",
    color: "#a855f7",
    linkedin: "https://www.linkedin.com/in/abdelwahab28/",
    portfolio: "#",
  },

  {
    name: "Ishack Ibrahim",
    role: "Électricien Industriel | Énergie & Systèmes Techniques",
    desc: "Spécialisé en installations électriques et en maintenance industrielle, j’interviens sur des environnements techniques complexes afin de garantir la fiabilité et la performance des équipements. " +
        "Chez NovaKom, je contribue à l’optimisation énergétique et à l’intégration de solutions techniques durables, en lien avec les infrastructures numériques de nos clients.",
    img: Isak,
    objectPosition: "center 5%",
    badge: "Électro-Énergie",
    color: "#2563eb",
    linkedin: "https://www.linkedin.com/in/ishack-i-81b4713b3/",
  },

  {
    name: "Djae Insa",
    role: "Data Analyst | Banque & Finance",
    desc: "Spécialisé en analyse de données dans les environnements bancaires et financiers, j’exploite les données pour produire des insights fiables et orienter la prise de décision. " +
        "Chez NovaKom, je transforme les données en leviers de performance afin d’optimiser les opérations et accompagner la transformation digitale de nos clients.",
    img: Djae,
    objectPosition: "center 7%",
    badge: "Data & Finance",
    color: "#0ea5e9",
    linkedin: "#",
    portfolio: "#",
  },
    
];

function splitNovaKomDesc(desc: string) {
  const marker = "Chez NovaKom";
  const markerIndex = desc.indexOf(marker);
  if (markerIndex === -1) {
    return { before: desc, chez: "" };
  }

  return {
    before: desc.slice(0, markerIndex).trimEnd(),
    chez: desc.slice(markerIndex),
  };
}

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
          {team.map((member) => {
            const descParts = splitNovaKomDesc(member.desc);

            return (
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
                  {descParts.before}
                  {descParts.chez && (
                    <span
                      className="block mt-2 text-white/90 italic"
                      style={{ fontWeight: 600 }}
                    >
                      {descParts.chez}
                    </span>
                  )}
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
            );
          })}
        </div>
      </div>
    </section>
  );
}
