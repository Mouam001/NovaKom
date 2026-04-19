import {
  Award,
  BookOpen,
  Clock,
  Shield,
  Code2,
  Smartphone,
  Wifi,
  BarChart3,
  GraduationCap,
  Star,
  ArrowRight,
} from "lucide-react";


type Formation = {
  id: string;
  icon: React.ReactNode;
  category: string;
  title: string;
  color: string;
  level: string;
  price: string;
  description: string;
  benefits: string[];
};

const formations: Formation[] = [
  {
    id: "cybersec",
    icon: <Shield className="w-6 h-6" />,
    category: "Cybersécurité",
    title: "Sécurité Informatique & Cyber Défense",
    color: "#00A86B",
    level: "Débutant → Avancé",
    price: "Sur devis",
    description:
      "Protégez vos données et systèmes contre les cybermenaces croissantes. Nos experts vous enseignent les meilleures pratiques de sécurité, du renforcement des défenses à la gestion des incidents critiques.",
    benefits: [
      "Réduire les risques de cyberattaques",
      "Protéger votre réputation et vos données",
      "Mettre en conformité avec les normes internationales",
      "Améliorer la résilience de votre infrastructure",
    ],
  },
  {
    id: "dev",
    icon: <Code2 className="w-6 h-6" />,
    category: "Développement",
    title: "Développement Web & Applications",
    color: "#3b82f6",
    level: "Débutant → Intermédiaire",
    price: "Sur devis",
    description:
      "Transformez vos idées en applications web modernes et performantes. Apprenez les technologies actuelles pour créer des solutions numériques adaptées aux besoins du marché comorien.",
    benefits: [
      "Créer des applications web performantes",
      "Maîtriser les frameworks modernes",
      "Déployer et maintenir vos solutions",
      "Accélérer votre transformation numérique",
    ],
  },
  {
    id: "digital",
    icon: <Smartphone className="w-6 h-6" />,
    category: "Usage du numérique",
    title: "Compétences Numériques Essentielles",
    color: "#a855f7",
    level: "Grand débutant",
    price: "Sur devis",
    description:
      "Maîtrisez les outils numériques indispensables au travail moderne et sécurisez vos usages. Une formation accessible pour tous, du bureautique à la collaboration en ligne.",
    benefits: [
      "Utiliser les outils collaboratifs efficacement",
      "Sécuriser vos données personnelles et professionnelles",
      "Adopter les bonnes pratiques numériques",
      "Augmenter votre productivité",
    ],
  },
  {
    id: "reseau",
    icon: <Wifi className="w-6 h-6" />,
    category: "Réseaux & Systèmes",
    title: "Administration Réseaux & Systèmes",
    color: "#f59e0b",
    level: "Intermédiaire → Avancé",
    price: "Sur devis",
    description:
      "Concevez et administrez des infrastructures IT robustes et sécurisées. Maîtrisez les technologies essentielles pour supporter la croissance de votre organisation.",
    benefits: [
      "Construire une infrastructure IT fiable",
      "Assurer la continuité de service 24/7",
      "Optimiser les performances réseau",
      "Sécuriser votre environnement IT",
    ],
  },
  {
    id: "data",
    icon: <BarChart3 className="w-6 h-6" />,
    category: "Data & IA",
    title: "Introduction à la Data & l'Intelligence Artificielle",
    color: "#ef4444",
    level: "Débutant → Intermédiaire",
    price: "Sur devis",
    description:
      "Exploitez vos données pour prendre de meilleures décisions. Découvrez comment l'IA et la data science peuvent transformer votre organisation et créer de la valeur.",
    benefits: [
      "Transformer vos données en insights actionnables",
      "Automatiser vos processus avec l'IA",
      "Prendre des décisions basées sur les données",
      "Augmenter votre compétitivité",
    ],
  },
];

function FormationCard({ f }: { f: Formation }) {
  return (
    <div
      className="rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2"
      style={{
        backgroundColor: "#0d2254",
        border: `1px solid ${f.color}33`,
      }}
    >
      {/* Card content */}
      <div className="p-8">
        <div className="flex items-start gap-4 mb-6">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: f.color + "22", color: f.color }}
          >
            {f.icon}
          </div>
          <div className="flex-1">
            <span
              className="inline-block text-xs px-2 py-0.5 rounded-full mb-2"
              style={{
                backgroundColor: f.color + "18",
                color: f.color,
                fontFamily: "Inter, sans-serif",
              }}
            >
              {f.category}
            </span>
            <h3
              className="text-white mb-3"
              style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: "1.1rem" }}
            >
              {f.title}
            </h3>
            <div className="flex flex-wrap gap-4">
              {[
                { icon: <Clock className="w-3 h-3" />},
                { icon: <BookOpen className="w-3 h-3" />, label: f.level },
              ].map((meta) => (
                <div
                  key={meta.label}
                  className="flex items-center gap-1.5 text-xs"
                  style={{ color: "rgba(255,255,255,0.5)", fontFamily: "Inter, sans-serif" }}
                >
                  {meta.icon} {meta.label}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Description */}
        <p
          className="text-white/60 mb-6 text-sm"
          style={{ fontFamily: "Inter, sans-serif", lineHeight: 1.75 }}
        >
          {f.description}
        </p>

        {/* Benefits */}
        <ul className="space-y-2.5 mb-7">
          {f.benefits.map((benefit, i) => (
            <li key={`benefit-${i}`} className="flex items-start gap-2.5">
              <span
                className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5"
                style={{ backgroundColor: f.color }}
              />
              <span
                className="text-white/70 text-sm"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                {benefit}
              </span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href="#contact"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm text-white transition-all hover:scale-105"
          style={{
            background: `linear-gradient(135deg, ${f.color}, ${f.color}cc)`,
            fontFamily: "Inter, sans-serif",
            fontWeight: 600,
          }}
        >
          En savoir plus <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
}

export function Formations() {
  return (
    <section
      id="formations"
      className="py-24"
      style={{ backgroundColor: "#081733" }}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <p
            className="text-xs tracking-widest uppercase mb-3"
            style={{ color: "#00A86B", fontFamily: "Inter, sans-serif" }}
          >
            Centre de formation NovaKom
          </p>
          <h2
            className="text-white mb-5"
            style={{
              fontFamily: "Poppins, sans-serif",
              fontWeight: 700,
              fontSize: "clamp(1.6rem, 3vw, 2.5rem)",
            }}
          >
            Formations certifiantes en digital & cybersécurité
          </h2>
          <p
            className="text-white/50 max-w-2xl mx-auto"
            style={{ fontFamily: "Inter, sans-serif", fontSize: "0.95rem", lineHeight: 1.8 }}
          >
            NovaKom propose des accompagnements professionnels intensifs et pratiques pour 
            acquérir des compétences recherchées sur le marché. Formations personnalisées 
            adaptées à votre contexte et vos besoins réels.
          </p>
        </div>

        {/* Trust badges */}
        <div className="flex flex-wrap justify-center gap-4 mb-14">
          {[
            { icon: <Award className="w-4 h-4" />, label: "Formateurs experts en terrain" },
            { icon: <Star className="w-4 h-4" />, label: "Cas concrets comoriens" },
            { icon: <GraduationCap className="w-4 h-4" />, label: "Sessions groupes & entreprises" },
            { icon: <BookOpen className="w-4 h-4" />, label: "Accompagnement personnalisé" },
          ].map((b, index) => (
            <div
              key={`badge-${index}`}
              className="flex items-center gap-2 px-4 py-2 rounded-full"
              style={{
                backgroundColor: "#00A86B18",
                border: "1px solid #00A86B33",
                color: "#00A86B",
                fontFamily: "Inter, sans-serif",
                fontSize: "0.8rem",
              }}
            >
              {b.icon}
              <span>{b.label}</span>
            </div>
          ))}
        </div>

        {/* Formations grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-14">
          {formations.map((f) => (
            <FormationCard key={f.id} f={f} />
          ))}
        </div>

        {/* CTA Section */}
        <div
          className="rounded-2xl p-8 md:p-10 text-center"
          style={{
            background: "linear-gradient(135deg, #00A86B18, #0A1F4488)",
            border: "1px solid rgba(0,168,107,0.25)",
          }}
        >
          <h3
            className="text-white mb-3"
            style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: "1.3rem" }}
          >
            Vous avez un besoin spécifique ?
          </h3>
          <p
            className="text-white/50 max-w-xl mx-auto mb-7 text-sm"
            style={{ fontFamily: "Inter, sans-serif", lineHeight: 1.8 }}
          >
            NovaKom conçoit des accompagnements professionnels entièrement personnalisés 
            pour les entreprises, institutions et équipes. Parlons de vos besoins en sécurité, 
            développement ou transformation numérique.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-xl text-white text-sm transition-all hover:scale-105"
              style={{
                background: "linear-gradient(135deg, #00A86B, #007a4e)",
                fontFamily: "Inter, sans-serif",
                fontWeight: 600,
              }}
            >
              <BookOpen className="w-4 h-4" />
              Discuter de votre projet
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-xl text-sm border transition-all hover:bg-white/5"
              style={{
                borderColor: "rgba(255,255,255,0.15)",
                color: "rgba(255,255,255,0.6)",
                fontFamily: "Inter, sans-serif",
              }}
            >
              Nous contacter
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
