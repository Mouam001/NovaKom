import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Clock3,
  ExternalLink,
  Lightbulb,
  MapPin,
  Rocket,
  Sparkles,
  Video,
} from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Chatbot } from "../components/Chatbot";
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import { useLanguage } from "../contexts/LanguageContext";
import microsoftPoster from "../../assets/images/novakom_pub_2222.png";
import aiPoster from "../../assets/images/novakom_IA.png";
import securityPoster from "../../assets/images/SECURITE_nOVAKOM.png";

type Webinar = {
  id: string;
  title: string;
  date: string;
  moroniTime: string;
  parisTime: string;
  location: string;
  description: string;
  poster: string;
  registrationUrl: string;
  tags: string[];
  awakening: string;
  outcomes: string[];
};

const webinars: Webinar[] = [
  {
    id: "sensibilisation-cybersecurite",
    title: "Sensibilisation à la cybersécurité",
    date: "Dimanche 28 Juin 2026",
    moroniTime: "20h",
    parisTime: "19h",
    location: "Google Meet",
    description:
      "Formation gratuite en ligne pour reconnaître les menaces numériques, sécuriser vos comptes, protéger vos données personnelles et adopter les bons réflexes de sécurité au quotidien.",
    poster: securityPoster,
    registrationUrl: "https://forms.cloud.microsoft/r/2ZMCHmz9cx?origin=lprLink",
    tags: ["Cybersécurité", "Phishing", "2FA", "Bonnes pratiques"],
    awakening:
      "Cette formation réveille les bons réflexes numériques : reconnaître les pièges, protéger ses accès et utiliser Internet avec plus de confiance.",
    outcomes: [
      "Identifier les menaces courantes avant de cliquer",
      "Protéger ses comptes, appareils et données",
      "Se préparer aux risques numériques du quotidien",
    ],
  },
  {
    id: "microsoft-365-google-drive-outils-collaboratifs",
    title: "Microsoft 365, Google Drive & Outils Collaboratifs",
    date: "Samedi 04/07/2026",
    moroniTime: "20h",
    parisTime: "19h",
    location: "Google Meet",
    description:
      "Formation gratuite pour apprendre à utiliser Microsoft 365, Google Drive, les outils collaboratifs, le stockage, le partage de documents et les bonnes pratiques de sécurité.",
    poster: microsoftPoster,
    registrationUrl: "https://forms.cloud.microsoft/r/wE6axQjWPa?origin=lprLink",
    tags: ["Microsoft 365", "Google Drive", "Collaboration", "Sécurité"],
    awakening:
      "Une session pour passer de l'utilisation occasionnelle au vrai travail collaboratif : organiser, partager, coéditer et sécuriser les documents avec les outils du quotidien.",
    outcomes: [
      "Comprendre les usages professionnels de demain",
      "Gagner du temps dans le travail en équipe",
      "Adopter des réflexes de partage plus sûrs",
    ],
  },
  {
    id: "ia-pour-tout-le-monde",
    title: "Les IA pour tout le monde",
    date: "Dimanche 12/07/2026",
    moroniTime: "20h",
    parisTime: "19h",
    location: "Google Meet",
    description:
      "Formation gratuite pour découvrir les 5 outils IA les plus utilisés, apprendre à rédiger des prompts, rechercher, résumer, créer du contenu et gagner du temps.",
    poster: aiPoster,
    registrationUrl: "https://forms.cloud.microsoft/r/U2LkKKe0by?origin=lprLink",
    tags: ["IA", "Prompts", "Productivité", "Création de contenu"],
    awakening:
      "L'objectif est de démystifier l'IA et de montrer comment elle peut devenir un assistant simple pour apprendre, créer, résumer et mieux décider.",
    outcomes: [
      "Découvrir les outils IA qui transforment déjà les métiers",
      "Savoir poser de bonnes questions aux IA",
      "Voir comment rester productif dans le monde de demain",
    ],
  },
];

function WebinarCard({ webinar }: { webinar: Webinar }) {
  const hasRegistrationUrl = webinar.registrationUrl.trim().length > 0;
  const hasPoster = webinar.poster.trim().length > 0;

  return (
    <article
      className="overflow-hidden rounded-2xl border border-white/10 bg-[#0d2254] transition-all duration-300 lg:hover:-translate-y-1 lg:hover:border-[#00A86B55]"
      style={{ boxShadow: "0 22px 70px rgba(0,0,0,0.22)" }}
    >
      <div className="grid lg:grid-cols-[0.95fr_1.05fr]">
        <div className="relative min-h-[260px] bg-[#06152f] sm:min-h-[320px] lg:min-h-full">
          {hasPoster ? (
            <img
              src={webinar.poster}
              alt={`Poster ${webinar.title}`}
              className="h-full min-h-[260px] w-full object-cover sm:min-h-[320px] lg:min-h-full"
            />
          ) : (
            <div className="flex h-full min-h-[260px] items-center justify-center p-8 text-center sm:min-h-[320px]">
              <div>
                <Sparkles className="mx-auto mb-4 h-10 w-10 text-[#00A86B]" />
                <p
                  className="text-sm font-semibold uppercase tracking-[0.14em] text-white/45"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  Poster à ajouter
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="relative flex flex-col overflow-hidden p-6 sm:p-8 lg:p-10">
          <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[#00A86B99] to-transparent" />
          <div className="mb-5 flex flex-wrap gap-2">
            {webinar.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-[#00A86B33] bg-[#00A86B18] px-3 py-1 text-xs font-semibold text-[#00A86B]"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                {tag}
              </span>
            ))}
          </div>

          <h2
            className="mb-4 text-white"
            style={{
              fontFamily: "Poppins, sans-serif",
              fontSize: "clamp(1.45rem, 2.5vw, 2rem)",
              fontWeight: 700,
              lineHeight: 1.2,
            }}
          >
            {webinar.title}
          </h2>

          <p
            className="mb-7 text-sm text-white/62"
            style={{ fontFamily: "Inter, sans-serif", lineHeight: 1.8 }}
          >
            {webinar.description}
          </p>

          <div className="mb-6 grid gap-3 sm:grid-cols-2">
            <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] p-3">
              <CalendarDays className="h-4 w-4 flex-shrink-0 text-[#00A86B]" />
              <span className="text-sm text-white/80" style={{ fontFamily: "Inter, sans-serif" }}>
                {webinar.date}
              </span>
            </div>
            <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] p-3">
              <MapPin className="h-4 w-4 flex-shrink-0 text-[#00A86B]" />
              <span className="text-sm text-white/80" style={{ fontFamily: "Inter, sans-serif" }}>
                {webinar.location}
              </span>
            </div>
            <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] p-3">
              <Clock3 className="h-4 w-4 flex-shrink-0 text-[#00A86B]" />
              <span className="text-sm text-white/80" style={{ fontFamily: "Inter, sans-serif" }}>
                {webinar.moroniTime} Moroni
              </span>
            </div>
            <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] p-3">
              <Clock3 className="h-4 w-4 flex-shrink-0 text-[#00A86B]" />
              <span className="text-sm text-white/80" style={{ fontFamily: "Inter, sans-serif" }}>
                {webinar.parisTime} Paris
              </span>
            </div>
          </div>

          <div className="mb-8 rounded-2xl border border-[#00A86B26] bg-[#06152f]/55 p-5">
            <div className="mb-4 flex items-start gap-3">
              <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-[#00A86B18] text-[#00D084] animate-pulse">
                <Lightbulb className="h-5 w-5" />
              </div>
              <div>
                <p
                  className="mb-1 text-xs font-bold uppercase tracking-[0.14em] text-[#00D084]"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  Découvrir le monde de demain
                </p>
                <p
                  className="text-sm text-white/70"
                  style={{ fontFamily: "Inter, sans-serif", lineHeight: 1.75 }}
                >
                  {webinar.awakening}
                </p>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {webinar.outcomes.map((outcome) => (
                <div
                  key={outcome}
                  className="rounded-xl border border-white/10 bg-white/[0.04] p-3 transition-colors duration-300 lg:hover:bg-white/[0.07]"
                >
                  <CheckCircle2 className="mb-2 h-4 w-4 text-[#00D084]" />
                  <p
                    className="text-xs text-white/72"
                    style={{ fontFamily: "Inter, sans-serif", lineHeight: 1.55 }}
                  >
                    {outcome}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-4 flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#00A86B24] to-transparent px-3 py-2 text-[#9EF2C9]">
              <Rocket className="h-4 w-4 flex-shrink-0" />
              <span className="text-xs font-semibold" style={{ fontFamily: "Inter, sans-serif" }}>
                Une formation courte pour éveiller, pratiquer et repartir avec des réflexes concrets.
              </span>
            </div>
          </div>

          <div className="mt-auto">
            {hasRegistrationUrl ? (
              <a
                href={webinar.registrationUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl px-7 py-3.5 text-base font-extrabold text-white transition-all duration-300 sm:w-auto lg:hover:-translate-y-0.5 lg:hover:scale-105"
                style={{
                  background: "linear-gradient(135deg, #00C878, #007a4e)",
                  boxShadow: "0 16px 34px rgba(0,168,107,0.28), inset 0 1px 0 rgba(255,255,255,0.24)",
                  fontFamily: "Inter, sans-serif",
                }}
              >
                S'inscrire
                <ExternalLink className="h-4 w-4" />
              </a>
            ) : (
              <span
                className="inline-flex w-full items-center justify-center rounded-xl border border-white/12 px-6 py-3 text-sm font-semibold text-white/55 sm:w-auto"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                Lien bientôt disponible
              </span>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

export function WebinarsPage() {
  const { language } = useLanguage();
  const isFr = language === "fr";

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  return (
    <div className="min-h-screen bg-[#081733]">
      <Navbar />
      <main>
        <section className="relative overflow-hidden px-6 pb-20 pt-32 sm:pt-36 lg:pb-24">
          <div
            className="absolute inset-x-0 top-0 h-[420px]"
            style={{
              background:
                "radial-gradient(circle at 50% 0%, rgba(0,168,107,0.22), transparent 58%), linear-gradient(180deg, #0A1F44 0%, #081733 100%)",
            }}
          />
          <div className="relative mx-auto max-w-7xl">
            <Link
              to="/#formations"
              className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-white/60 transition-colors lg:hover:text-white"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              <ArrowLeft className="h-4 w-4" />
              {isFr ? "Retour aux formations" : "Back to training"}
            </Link>

            <div className="mb-12 max-w-3xl">
              <div
                className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#00A86B33] bg-[#00A86B18] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-[#00A86B]"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                <Video className="h-4 w-4" />
                NovaKom Academy
              </div>
              <h1
                className="mb-5 text-white"
                style={{
                  fontFamily: "Poppins, sans-serif",
                  fontSize: "clamp(2rem, 5vw, 4rem)",
                  fontWeight: 800,
                  lineHeight: 1.05,
                }}
              >
                {isFr ? "Webinaires gratuits NovaKom Academy" : "Free NovaKom Academy webinars"}
              </h1>
              <p
                className="text-base text-white/62 sm:text-lg"
                style={{ fontFamily: "Inter, sans-serif", lineHeight: 1.8 }}
              >
                {isFr
                  ? "Des sessions pratiques en ligne pour renforcer vos compétences numériques, collaboratives et IA avec l'équipe NovaKom."
                  : "Practical online sessions to strengthen digital, collaboration and AI skills with the NovaKom team."}
              </p>
            </div>

            <div className="grid gap-8">
              {webinars.map((webinar) => (
                <WebinarCard key={webinar.id} webinar={webinar} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
}
