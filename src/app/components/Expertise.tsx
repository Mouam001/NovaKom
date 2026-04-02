import { Award, Target, Globe, Cpu } from "lucide-react";

const cyberImage =
  "https://images.unsplash.com/photo-1768839721176-2fa91fdce725?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjeWJlcnNlY3VyaXR5JTIwbmV0d29yayUyMHByb3RlY3Rpb24lMjB0ZWNobm9sb2d5fGVufDF8fHx8MTc3MjQ5NjUxMnww&ixlib=rb-4.1.0&q=80&w=1080";

const points = [
  {
    icon: <Award className="w-5 h-5" />,
    title: "Certifications internationales",
    desc: "CCNA, CompTIA Security+, et d'autres certifications reconnues mondialement.",
  },
  {
    icon: <Target className="w-5 h-5" />,
    title: "Approche structurée",
    desc: "Méthodologie rigoureuse basée sur les frameworks NIST, ISO 27001 et ITIL.",
  },
  {
    icon: <Globe className="w-5 h-5" />,
    title: "Vision long terme",
    desc: "Nous construisons des infrastructures pensées pour grandir avec votre organisation.",
  },
  {
    icon: <Cpu className="w-5 h-5" />,
    title: "Adaptation au marché local",
    desc: "Standards internationaux adaptés aux réalités spécifiques du contexte comorien.",
  },
];

export function Expertise() {
  return (
    <section
      id="expertise"
      className="py-24"
      style={{ backgroundColor: "#0A1F44" }}
    >
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        {/* Image */}
        <div className="relative hidden lg:block">
          <div
            className="rounded-2xl overflow-hidden"
            style={{ border: "1px solid rgba(0,168,107,0.2)" }}
          >
            <img
              src={cyberImage}
              alt="Expertise NovaKom"
              className="w-full h-[460px] object-cover"
            />
            <div
              className="absolute inset-0 rounded-2xl"
              style={{
                background: "linear-gradient(135deg, #0A1F44cc 0%, transparent 60%)",
              }}
            />
          </div>

          {/* Overlapping quote */}
          <div
            className="absolute bottom-6 left-6 right-6 p-6 rounded-xl"
            style={{
              backgroundColor: "#0d2254ee",
              border: "1px solid rgba(0,168,107,0.3)",
              backdropFilter: "blur(8px)",
            }}
          >
            <p
              className="text-white italic"
              style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, fontSize: "0.95rem", lineHeight: 1.6 }}
            >
              "Nous ne réparons pas. Nous structurons. Nous sécurisons. Nous anticipons."
            </p>
            <p
              className="mt-2"
              style={{ color: "#00A86B", fontFamily: "Inter, sans-serif", fontSize: "0.78rem" }}
            >
              — L'équipe NovaKom
            </p>
          </div>
        </div>

        {/* Text */}
        <div>
          <p
            className="text-xs tracking-widest uppercase mb-3"
            style={{ color: "#00A86B", fontFamily: "Inter, sans-serif" }}
          >
            Notre positionnement
          </p>
          <h2
            className="text-white mb-4"
            style={{
              fontFamily: "Poppins, sans-serif",
              fontWeight: 700,
              fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
              lineHeight: 1.25,
            }}
          >
            Un partenaire stratégique,{" "}
            <span style={{ color: "#00A86B" }}>pas un réparateur</span>
          </h2>
          <p
            className="text-white/50 mb-10"
            style={{ fontFamily: "Inter, sans-serif", fontSize: "0.95rem", lineHeight: 1.8 }}
          >
            NovaKom n'est pas un simple prestataire IT. Nous sommes un partenaire
            stratégique qui accompagne les organisations dans leur transformation
            numérique avec expertise, rigueur et engagement sur le long terme.
          </p>

          <div className="grid sm:grid-cols-2 gap-6">
            {points.map((p, i) => (
              <div
                key={i}
                className="p-5 rounded-xl"
                style={{
                  backgroundColor: "#0d2254",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center mb-3"
                  style={{ backgroundColor: "#00A86B22", color: "#00A86B" }}
                >
                  {p.icon}
                </div>
                <h4
                  className="text-white mb-1.5"
                  style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, fontSize: "0.9rem" }}
                >
                  {p.title}
                </h4>
                <p
                  className="text-white/50 text-xs"
                  style={{ fontFamily: "Inter, sans-serif", lineHeight: 1.7 }}
                >
                  {p.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Mobile quote */}
          <div
            className="lg:hidden mt-8 p-5 rounded-xl border"
            style={{
              borderColor: "rgba(0,168,107,0.3)",
              backgroundColor: "#0d2254",
            }}
          >
            <p
              className="text-white italic"
              style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, fontSize: "0.9rem", lineHeight: 1.6 }}
            >
              "Nous ne réparons pas. Nous structurons. Nous sécurisons. Nous anticipons."
            </p>
            <p className="mt-2 text-xs" style={{ color: "#00A86B", fontFamily: "Inter, sans-serif" }}>
              — L'équipe NovaKom
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
