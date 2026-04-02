import { useState } from "react";
import {
  Award,
  BookOpen,
  Clock,
  Users,
  Shield,
  Code2,
  Smartphone,
  Wifi,
  BarChart3,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  GraduationCap,
  Star,
} from "lucide-react";

const trainingImage = "https://images.unsplash.com/photo-1768796370577-c6e8b708b980?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwc2tpbGxzJTIwdHJhaW5pbmclMjB3b3Jrc2hvcCUyMHBlb3BsZSUyMGxlYXJuaW5nfGVufDF8fHx8MTc3MjQ5NzA2OHww&ixlib=rb-4.1.0&q=80&w=1080";
const certImage = "https://images.unsplash.com/photo-1762329352849-f4d0c9e7696a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjeWJlcnNlY3VyaXR5JTIwdHJhaW5pbmclMjBjb3Vyc2UlMjBjZXJ0aWZpY2F0ZSUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NzI0OTcwNjZ8MA&ixlib=rb-4.1.0&q=80&w=1080";

type Formation = {
  id: string;
  icon: React.ReactNode;
  category: string;
  title: string;
  color: string;
  level: string;
  duration: string;
  participants: string;
  price: string;
  description: string;
  modules: string[];
  outcomes: string[];
  certification: string;
};

const formations: Formation[] = [
  {
    id: "cybersec",
    icon: <Shield className="w-6 h-6" />,
    category: "Cybersécurité",
    title: "Sécurité Informatique & Cyber Défense",
    color: "#00A86B",
    level: "Débutant → Avancé",
    duration: "40h (5 jours)",
    participants: "5 – 15 personnes",
    price: "Sur devis",
    description:
      "Formation complète sur les fondamentaux et pratiques avancées de la cybersécurité. De la sensibilisation des employés aux techniques de pentest, cette formation couvre tout le spectre de la sécurité numérique.",
    modules: [
      "Introduction aux cybermenaces et enjeux actuels",
      "Sécurisation des réseaux et systèmes",
      "Tests d'intrusion (ethical hacking)",
      "Gestion des incidents de sécurité",
      "Sensibilisation au phishing et ingénierie sociale",
      "RGPD et conformité légale",
    ],
    outcomes: [
      "Identifier et prévenir les cyberattaques courantes",
      "Mettre en place une politique de sécurité",
      "Maîtriser les outils de défense",
      "Réaliser un audit basique de sécurité",
    ],
    certification: "Attestation NovaKom + préparation CompTIA Security+",
  },
  {
    id: "dev",
    icon: <Code2 className="w-6 h-6" />,
    category: "Développement",
    title: "Développement Web & Applications",
    color: "#3b82f6",
    level: "Débutant → Intermédiaire",
    duration: "60h (2 semaines)",
    participants: "5 – 12 personnes",
    price: "Sur devis",
    description:
      "Apprenez à créer des sites web et applications modernes. De HTML/CSS à React et Node.js, cette formation pratique vous donne les compétences pour entrer dans le monde du développement.",
    modules: [
      "HTML5 / CSS3 / JavaScript fondamentaux",
      "Responsive design et UX/UI",
      "Framework React.js",
      "Backend avec Node.js & bases de données",
      "Déploiement et versioning (Git/GitHub)",
      "Notions de sécurité applicative",
    ],
    outcomes: [
      "Créer un site web professionnel responsive",
      "Développer une application web full-stack",
      "Utiliser Git pour la gestion de code",
      "Déployer une application en ligne",
    ],
    certification: "Attestation NovaKom + portfolio de projets",
  },
  {
    id: "digital",
    icon: <Smartphone className="w-6 h-6" />,
    category: "Usage du numérique",
    title: "Compétences Numériques Essentielles",
    color: "#a855f7",
    level: "Grand débutant",
    duration: "16h (2 jours)",
    participants: "5 – 20 personnes",
    price: "Sur devis",
    description:
      "Formation accessible pour tous, destinée aux employés, commerçants et professionnels souhaitant maîtriser les outils numériques du quotidien et sécuriser leurs usages.",
    modules: [
      "Bureautique : Word, Excel, PowerPoint",
      "Messagerie et communication digitale",
      "Utilisation sécurisée d'Internet",
      "Cloud et stockage en ligne (Drive, OneDrive)",
      "Outils collaboratifs (Teams, Google Workspace)",
      "Protection des données personnelles",
    ],
    outcomes: [
      "Utiliser efficacement la suite Office",
      "Communiquer professionnellement en ligne",
      "Reconnaître et éviter les arnaques numériques",
      "Travailler avec les outils cloud",
    ],
    certification: "Attestation NovaKom + préparation PCIE",
  },
  {
    id: "reseau",
    icon: <Wifi className="w-6 h-6" />,
    category: "Réseaux & Systèmes",
    title: "Administration Réseaux & Systèmes",
    color: "#f59e0b",
    level: "Intermédiaire → Avancé",
    duration: "80h (2 semaines)",
    participants: "4 – 10 personnes",
    price: "Sur devis",
    description:
      "Formation technique complète pour les futurs administrateurs réseau et système. Apprenez à concevoir, déployer et sécuriser des infrastructures informatiques professionnelles.",
    modules: [
      "Fondamentaux TCP/IP et protocoles réseaux",
      "Configuration switches et routeurs Cisco",
      "Active Directory et gestion des utilisateurs",
      "Virtualisation avec VMware / Hyper-V",
      "Monitoring réseau (PRTG, Zabbix)",
      "Wi-Fi sécurisé et VLAN",
    ],
    outcomes: [
      "Administrer une infrastructure réseau",
      "Configurer un Active Directory",
      "Mettre en place un système de monitoring",
      "Préparer la certification CCNA",
    ],
    certification: "Attestation NovaKom + préparation Cisco CCNA",
  },
  {
    id: "data",
    icon: <BarChart3 className="w-6 h-6" />,
    category: "Data & IA",
    title: "Introduction à la Data & l'Intelligence Artificielle",
    color: "#ef4444",
    level: "Débutant → Intermédiaire",
    duration: "32h (4 jours)",
    participants: "5 – 15 personnes",
    price: "Sur devis",
    description:
      "Comprendre et exploiter les données pour prendre de meilleures décisions. Cette formation initie aux concepts de la data science et de l'IA appliquée aux besoins des entreprises.",
    modules: [
      "Introduction à la data science et ses applications",
      "Analyse de données avec Excel et Python",
      "Visualisation avec Power BI / Tableau",
      "Machine learning : concepts fondamentaux",
      "IA générative et outils pratiques (ChatGPT, Copilot)",
      "Éthique et gouvernance des données",
    ],
    outcomes: [
      "Analyser et visualiser des données métiers",
      "Utiliser Power BI pour créer des dashboards",
      "Comprendre les algorithmes de machine learning",
      "Intégrer l'IA dans les processus d'entreprise",
    ],
    certification: "Attestation NovaKom + certification Microsoft Power BI",
  },
];

function FormationCard({ f }: { f: Formation }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className="rounded-2xl overflow-hidden transition-all duration-300"
      style={{
        backgroundColor: "#0d2254",
        border: `1px solid ${expanded ? f.color + "44" : "rgba(255,255,255,0.07)"}`,
        boxShadow: expanded ? `0 0 40px ${f.color}12` : "none",
      }}
    >
      {/* Card header */}
      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: f.color + "22", color: f.color }}
            >
              {f.icon}
            </div>
            <div>
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
                className="text-white mb-2"
                style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: "1rem" }}
              >
                {f.title}
              </h3>
              <div className="flex flex-wrap gap-3">
                {[
                  { icon: <Clock className="w-3 h-3" />, label: f.duration },
                  { icon: <Users className="w-3 h-3" />, label: f.participants },
                  { icon: <BookOpen className="w-3 h-3" />, label: f.level },
                ].map((meta) => (
                  <div
                    key={meta.label}
                    className="flex items-center gap-1 text-xs"
                    style={{ color: "rgba(255,255,255,0.4)", fontFamily: "Inter, sans-serif" }}
                  >
                    {meta.icon} {meta.label}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center border transition-all hover:bg-white/10"
            style={{ borderColor: "rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.5)" }}
          >
            {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>

        <p
          className="mt-4 text-white/50 text-sm"
          style={{ fontFamily: "Inter, sans-serif", lineHeight: 1.75 }}
        >
          {f.description}
        </p>
      </div>

      {/* Expanded content */}
      {expanded && (
        <div
          className="px-6 pb-6 flex flex-col gap-6"
          style={{ borderTop: `1px solid ${f.color}22` }}
        >
          <div className="grid md:grid-cols-2 gap-6 pt-5">
            {/* Modules */}
            <div>
              <p
                className="text-white text-xs tracking-wider uppercase mb-3"
                style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}
              >
                Programme
              </p>
              <ul className="flex flex-col gap-2">
                {f.modules.map((m, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span
                      className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-xs mt-0.5"
                      style={{ backgroundColor: f.color + "22", color: f.color, fontFamily: "Poppins, sans-serif", fontWeight: 700 }}
                    >
                      {i + 1}
                    </span>
                    <span
                      className="text-white/60 text-sm"
                      style={{ fontFamily: "Inter, sans-serif", lineHeight: 1.6 }}
                    >
                      {m}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Outcomes */}
            <div>
              <p
                className="text-white text-xs tracking-wider uppercase mb-3"
                style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}
              >
                À la fin, vous saurez
              </p>
              <ul className="flex flex-col gap-2.5 mb-6">
                {f.outcomes.map((o, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: f.color }} />
                    <span
                      className="text-white/60 text-sm"
                      style={{ fontFamily: "Inter, sans-serif", lineHeight: 1.6 }}
                    >
                      {o}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Certification badge */}
              <div
                className="p-4 rounded-xl flex items-start gap-3"
                style={{
                  backgroundColor: f.color + "12",
                  border: `1px solid ${f.color}33`,
                }}
              >
                <Award className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: f.color }} />
                <div>
                  <p
                    className="text-white text-xs mb-0.5"
                    style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}
                  >
                    Certification & Attestation
                  </p>
                  <p
                    className="text-sm"
                    style={{ color: f.color, fontFamily: "Inter, sans-serif" }}
                  >
                    {f.certification}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="flex flex-wrap gap-3 pt-2">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm text-white"
              style={{
                background: `linear-gradient(135deg, ${f.color}, ${f.color}cc)`,
                fontFamily: "Inter, sans-serif",
                fontWeight: 600,
              }}
            >
              <GraduationCap className="w-4 h-4" />
              S'inscrire à cette formation
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm border transition-all hover:bg-white/5"
              style={{
                borderColor: "rgba(255,255,255,0.15)",
                color: "rgba(255,255,255,0.6)",
                fontFamily: "Inter, sans-serif",
              }}
            >
              Demander un devis groupe
            </a>
          </div>
        </div>
      )}
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
            NovaKom propose des formations professionnelles adaptées à tous les niveaux.
            Chaque parcours est sanctionné par une{" "}
            <span style={{ color: "#00A86B" }}>attestation officielle NovaKom</span> et
            prépare aux certifications internationales reconnues.
          </p>
        </div>

        {/* Trust badges */}
        <div className="flex flex-wrap justify-center gap-4 mb-14">
          {[
            { icon: <Award className="w-4 h-4" />, label: "Attestation officielle délivrée" },
            { icon: <Star className="w-4 h-4" />, label: "Certifications internationales" },
            { icon: <Users className="w-4 h-4" />, label: "Groupes & entreprises" },
            { icon: <GraduationCap className="w-4 h-4" />, label: "Formateurs experts certifiés" },
          ].map((b) => (
            <div
              key={b.label}
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

        {/* Feature banner */}
        <div
          className="rounded-2xl mb-12 overflow-hidden grid lg:grid-cols-2"
          style={{ border: "1px solid rgba(0,168,107,0.2)" }}
        >
          <div
            className="p-8 flex flex-col justify-center"
            style={{ background: "linear-gradient(135deg, #00A86B18, #0A1F44)" }}
          >
            <p
              className="text-xs tracking-widest uppercase mb-3"
              style={{ color: "#00A86B", fontFamily: "Inter, sans-serif" }}
            >
              Pourquoi se former chez NovaKom ?
            </p>
            <h3
              className="text-white mb-5"
              style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: "1.3rem", lineHeight: 1.4 }}
            >
              Des formations concrètes, certifiantes et adaptées au marché local
            </h3>
            <ul className="flex flex-col gap-3">
              {[
                "Formateurs praticiens avec expérience terrain réelle",
                "Exercices pratiques et cas concrets comoriensv",
                "Attestation officielle NovaKom remise à la fin",
                "Préparation aux certifications : CCNA, Security+, Power BI...",
                "Formations sur site ou en présentiel à Moroni",
                "Suivi post-formation et accompagnement continu",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 flex-shrink-0" style={{ color: "#00A86B" }} />
                  <span
                    className="text-white/70 text-sm"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="hidden lg:block relative">
            <img
              src={trainingImage}
              alt="Formation NovaKom"
              className="w-full h-full object-cover"
            />
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(to right, #0A1F44 0%, transparent 40%)" }}
            />
            {/* Floating cert card */}
            <div
              className="absolute bottom-6 right-6 p-4 rounded-xl flex items-center gap-3"
              style={{
                backgroundColor: "rgba(13,34,84,0.95)",
                border: "1px solid rgba(0,168,107,0.4)",
                backdropFilter: "blur(8px)",
              }}
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, #00A86B, #007a4e)" }}
              >
                <Award className="w-5 h-5 text-white" />
              </div>
              <div>
                <p
                  className="text-white text-xs"
                  style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700 }}
                >
                  Attestation officielle
                </p>
                <p
                  className="text-white/40 text-xs"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  Délivrée à la fin de chaque formation
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Formations list */}
        <div className="flex flex-col gap-4">
          {formations.map((f) => (
            <FormationCard key={f.id} f={f} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div
          className="mt-14 rounded-2xl p-8 md:p-10 text-center"
          style={{
            background: "linear-gradient(135deg, #00A86B18, #0A1F4488)",
            border: "1px solid rgba(0,168,107,0.25)",
          }}
        >
          <GraduationCap className="w-10 h-10 mx-auto mb-4" style={{ color: "#00A86B" }} />
          <h3
            className="text-white mb-3"
            style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: "1.3rem" }}
          >
            Formation sur mesure pour votre organisation
          </h3>
          <p
            className="text-white/50 max-w-xl mx-auto mb-7 text-sm"
            style={{ fontFamily: "Inter, sans-serif", lineHeight: 1.8 }}
          >
            Vous avez des besoins spécifiques ? NovaKom conçoit des programmes de formation
            entièrement personnalisés pour les entreprises, institutions et équipes de toute taille.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-xl text-white text-sm"
              style={{
                background: "linear-gradient(135deg, #00A86B, #007a4e)",
                fontFamily: "Inter, sans-serif",
                fontWeight: 600,
              }}
            >
              <BookOpen className="w-4 h-4" />
              Demander un programme sur mesure
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
              Télécharger le catalogue formations
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
