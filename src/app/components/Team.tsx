import ImgMou from "@/assets/images/mouammar.jpeg";
import Houlam from "@/assets/images/Houlam.jpeg"
import { Linkedin } from "lucide-react";


const team = [
  {
    name: "Mouammar Soulé",
    role: "Ingénieur Logiciel",
    desc: "Spécialiste développement et architecture applicative. Expert en systèmes distribués et solutions cloud-native.",
    img:  ImgMou,
    badge: "Dev & Architecture",
    color: "#3b82f6",
  },
  {
    name: "Houlam",
    role: "Ingénieur Cybersécurité",
    desc: "Expert en protection réseau et audit sécurité. Certifié Security+ avec une expertise en tests d'intrusion.",
    img: Houlam,
    badge: "Cybersécurité",
    color: "#00A86B",
  },
  {
    name: "Abdel",
    role: "DevSecOps",
    desc: "Spécialiste déploiement sécurisé et automatisation CI/CD. Expert en intégration de la sécurité dans les pipelines DevOps.",
    img: "https://images.unsplash.com/photo-1758876021212-a87517fc8954?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYWxlJTIwZGV2ZWxvcGVyJTIwRGV2T3BzJTIwcG9ydHJhaXQlMjBjb3Jwb3JhdGV8ZW58MXx8fHwxNzcyNDk2NTE1fDA&ixlib=rb-4.1.0&q=80&w=400",
    badge: "DevSecOps",
    color: "#a855f7",
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
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(to top, #0d2254 0%, transparent 50%)`,
                  }}
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
                <a
                  href="#"
                  className="inline-flex items-center gap-2 text-sm transition-colors hover:opacity-80"
                  style={{ color: "#0077B5", fontFamily: "Inter, sans-serif" }}
                >
                  <Linkedin className="w-4 h-4" /> LinkedIn
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
