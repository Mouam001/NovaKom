import { useState, useEffect } from "react";
import { Play, X, Star, ChevronLeft, ChevronRight, Quote, MapPin, Building2, MessageSquarePlus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "../lib/supabase";
import { useAuth } from "../contexts/AuthContext";

const photos = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1758101755915-462eddc23f57?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxJVCUyMHRlY2huaWNpYW4lMjB3b3JraW5nJTIwYnVzaW5lc3MlMjBzaG9wJTIwbmV0d29yayUyMGluc3RhbGxhdGlvbnxlbnwxfHx8fDE3NzI0OTcwNjJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    label: "Déploiement réseau",
    tag: "Installation réseau",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1735825764457-ffdf0b5aa5dd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21wdXRlciUyMHNldHVwJTIwc21hbGwlMjBidXNpbmVzcyUyMG9mZmljZSUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NzI0OTcwNjJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    label: "Configuration postes de travail ",
    tag: "Support IT",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1663932210347-164a05ed0ccd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZXR3b3JrJTIwY2FibGUlMjByb3V0ZXIlMjBpbnN0YWxsYXRpb24lMjB0ZWNobmljaWFufGVufDF8fHx8MTc3MjQ5NzA2M3ww&ixlib=rb-4.1.0&q=80&w=1080",
    label: "Câblage structuré",
    tag: "Infrastructure réseau",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1762163516269-3c143e04175c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZXJ2ZXIlMjByYWNrJTIwaW5zdGFsbGF0aW9uJTIwZGF0YSUyMGNlbnRlciUyMG1haW50ZW5hbmNlfGVufDF8fHx8MTc3MjQ5NzA2NXww&ixlib=rb-4.1.0&q=80&w=1080",
    label: "Installation salle serveurs",
    tag: "Serveurs",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1585216274151-e3debff99c0d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXJld2FsbCUyMHNlY3VyaXR5JTIwb2ZmaWNlJTIwaW50ZXJ2ZW50aW9uJTIwcHJvZmVzc2lvbmFsJTIwc2V0dXB8ZW58MXx8fHwxNzcyNDk3MDY4fDA&ixlib=rb-4.1.0&q=80&w=1080",
    label: "Mise en place firewall",
    tag: "Cybersécurité",
  },
];

const videos = [
  {
    id: "v1",
    thumbnail: "https://images.unsplash.com/photo-1762163516269-3c143e04175c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
    title: "Déploiement réseau Wi-Fi sécurisé",
    subtitle: "Centre commercial Moroni Plaza",
    url: "#",
  },
  {
    id: "v2",
    thumbnail: "https://images.unsplash.com/photo-1768839721176-2fa91fdce725?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
    title: "Audit de sécurité en entreprise",
    subtitle: "Banque BIC Comores · Durée : 3:12",
    url: "#",
  },
  {
    id: "v3",
    thumbnail: "https://images.unsplash.com/photo-1744868562210-fffb7fa882d9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
    title: "Installation salle serveurs sécurisée",
    subtitle: "Ministère des Finances · Durée : 4:05",
    url: "#",
  },
];

const testimonials = [
  {
    name: "Ibrahim Abdallah",
    role: "Gérant",
    company: "Boutique Tech Zone, Moroni",
    avatar: "IA",
    color: "#3b82f6",
    rating: 5,
    text: "NovaKom a transformé notre infrastructure informatique en seulement 3 jours. Réseau stable, postes configurés, sécurité assurée. Une équipe sérieuse et très professionnelle. Je recommande vivement !",
  },
  {
    name: "Fatouma Said",
    role: "Directrice Générale",
    company: "Supermarché Al Kamar, Moroni",
    avatar: "FS",
    color: "#00A86B",
    rating: 5,
    text: "Depuis l'intervention de NovaKom, nous n'avons plus eu aucune panne réseau. Leur support est réactif et leurs techniciens maîtrisent leur sujet. Un vrai partenaire de confiance.",
  },
  {
    name: "Youssouf Hamidou",
    role: "Responsable IT",
    company: "Hôtel Itsandra Beach, Moroni",
    avatar: "YH",
    color: "#a855f7",
    rating: 5,
    text: "L'équipe NovaKom a installé toute notre salle serveurs avec des standards internationaux. Monitoring 24/7, documentation complète, formation de notre personnel. Travail exemplaire.",
  },
  {
    name: "Anziza Mohamed",
    role: "Expert-Comptable",
    company: "Cabinet Sunrise, Mutsamudu",
    avatar: "AM",
    color: "#f59e0b",
    rating: 5,
    text: "Suite à notre audit de sécurité, NovaKom a détecté plusieurs failles critiques que nous ignorions. Leur rapport détaillé et les corrections apportées nous ont mis en conformité. Service impeccable.",
  },
];

export function Interventions() {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<"photos" | "videos" | "avis">("photos");
  const [reviewIdx, setReviewIdx] = useState(0);
  const navigate = useNavigate();
  const { user } = useAuth();

  const openLight = (id: number) => setLightbox(id);
  const closeLight = () => setLightbox(null);
  const currentPhoto = photos.find((p) => p.id === lightbox);

  const prevReview = () => setReviewIdx((i) => (i - 1 + testimonials.length) % testimonials.length);
  const nextReview = () => setReviewIdx((i) => (i + 1) % testimonials.length);

  const tagColors: Record<string, string> = {
    "Installation réseau": "#3b82f6",
    "Support IT": "#00A86B",
    "Infrastructure réseau": "#a855f7",
    Serveurs: "#f59e0b",
    Cybersécurité: "#ef4444",
  };

  return (
    <section
      id="interventions"
      className="py-24"
      style={{ backgroundColor: "#0A1F44" }}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <p
            className="text-xs tracking-widest uppercase mb-3"
            style={{ color: "#00A86B", fontFamily: "Inter, sans-serif" }}
          >
            Nos réalisations terrain
          </p>
          <h2
            className="text-white mb-5"
            style={{
              fontFamily: "Poppins, sans-serif",
              fontWeight: 700,
              fontSize: "clamp(1.6rem, 3vw, 2.5rem)",
            }}
          >
            Interventions auprès des commerces
          </h2>
          <p
            className="text-white/50 max-w-xl mx-auto"
            style={{ fontFamily: "Inter, sans-serif", fontSize: "0.95rem", lineHeight: 1.75 }}
          >
            Découvrez nos interventions réelles chez nos clients — photos, vidéos et
            témoignages de commerçants et entreprises comoriens qui nous font confiance.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-2 mb-10 bg-[#0d2254] rounded-xl p-1.5 max-w-sm mx-auto border border-white/5">
          {(["photos", "videos", "avis"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="flex-1 py-2.5 rounded-lg text-sm capitalize transition-all"
              style={{
                backgroundColor: activeTab === tab ? "#00A86B" : "transparent",
                color: activeTab === tab ? "#fff" : "rgba(255,255,255,0.4)",
                fontFamily: "Inter, sans-serif",
                fontWeight: activeTab === tab ? 600 : 400,
              }}
            >
              {tab === "photos" ? "📸 Photos" : tab === "videos" ? "🎬 Vidéos" : "⭐ Avis clients"}
            </button>
          ))}
        </div>

        {/* PHOTOS */}
        {activeTab === "photos" && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {photos.map((photo) => (
              <div
                key={photo.id}
                className="relative rounded-xl overflow-hidden cursor-pointer group"
                style={{ border: "1px solid rgba(255,255,255,0.07)" }}
                onClick={() => openLight(photo.id)}
              >
                <img
                  src={photo.src}
                  alt={photo.label}
                  className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Overlay */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                  style={{ background: "rgba(10,31,68,0.6)", backdropFilter: "blur(2px)" }}
                >
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: "rgba(0,168,107,0.9)" }}
                  >
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </div>
                </div>
                {/* Bottom bar */}
                <div
                  className="absolute bottom-0 left-0 right-0 p-4"
                  style={{ background: "linear-gradient(to top, rgba(10,31,68,0.95), transparent)" }}
                >
                  <span
                    className="inline-block px-2 py-0.5 rounded-full text-xs mb-1.5"
                    style={{
                      backgroundColor: (tagColors[photo.tag] || "#00A86B") + "22",
                      color: tagColors[photo.tag] || "#00A86B",
                      border: `1px solid ${(tagColors[photo.tag] || "#00A86B")}44`,
                      fontFamily: "Inter, sans-serif",
                    }}
                  >
                    {photo.tag}
                  </span>
                  <p
                    className="text-white text-xs leading-tight"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    {photo.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* VIDEOS */}
        {activeTab === "videos" && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((v) => (
              <div
                key={v.id}
                className="rounded-xl overflow-hidden group cursor-pointer"
                style={{
                  backgroundColor: "#0d2254",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
                onClick={() => alert("Vidéo à venir : " + v.title)}
              >
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={v.thumbnail}
                    alt={v.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div
                    className="absolute inset-0 flex items-center justify-center"
                    style={{ background: "rgba(10,31,68,0.5)" }}
                  >
                    <div
                      className="w-14 h-14 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform"
                      style={{
                        background: "linear-gradient(135deg, #00A86B, #007a4e)",
                        boxShadow: "0 0 30px rgba(0,168,107,0.5)",
                      }}
                    >
                      <Play className="w-6 h-6 text-white ml-1" fill="white" />
                    </div>
                  </div>
                  {/* Duration badge */}
                  <div
                    className="absolute bottom-3 right-3 px-2 py-0.5 rounded text-xs"
                    style={{ backgroundColor: "rgba(0,0,0,0.7)", color: "#fff", fontFamily: "Inter, sans-serif" }}
                  >
                    {v.subtitle.split("·")[1]?.trim()}
                  </div>
                </div>
                <div className="p-4">
                  <p
                    className="text-white text-sm mb-1"
                    style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}
                  >
                    {v.title}
                  </p>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3 h-3" style={{ color: "#00A86B" }} />
                    <p
                      className="text-white/40 text-xs"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      {v.subtitle.split("·")[0]?.trim()}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {/* CTA upload card */}
            <div
              className="rounded-xl flex flex-col items-center justify-center gap-3 p-8 text-center cursor-pointer group hover:border-[#00A86B66] transition-colors"
              style={{
                backgroundColor: "#0d2254",
                border: "2px dashed rgba(255,255,255,0.1)",
                minHeight: "200px",
              }}
            >
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "#00A86B18" }}
              >
                <Play className="w-5 h-5" style={{ color: "#00A86B" }} />
              </div>
              <p className="text-white/40 text-sm" style={{ fontFamily: "Inter, sans-serif" }}>
                D'autres vidéos bientôt disponibles
              </p>
            </div>
          </div>
        )}

        {/* TESTIMONIALS */}
        {activeTab === "avis" && (
          <div>
            {/* Stats bar */}
            <div className="flex flex-wrap justify-center gap-8 mb-12">
              {[
                { val: "4.9/5", label: "Note moyenne clients" },
                { val: "20+", label: "Commerces équipés" },
                { val: "100%", label: "Clients satisfaits" },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <p
                    className="text-white"
                    style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: "1.8rem", color: "#00A86B" }}
                  >
                    {s.val}
                  </p>
                  <p className="text-white/40 text-xs" style={{ fontFamily: "Inter, sans-serif" }}>
                    {s.label}
                  </p>
                </div>
              ))}
            </div>

            {/* Bouton Laisser un avis */}
            <div className="text-center mb-12">
              <button
                onClick={() => user ? navigate('/review') : navigate('/login', { state: { from: '/review' } })}
                className="px-6 py-3 rounded-lg text-white font-semibold transition-all hover:scale-105 shadow-lg inline-flex items-center gap-2"
                style={{
                  background: "linear-gradient(135deg, #ff6b35, #f9a826)",
                  fontFamily: "Inter, sans-serif",
                }}
              >
                <MessageSquarePlus className="w-5 h-5" />
                {user ? 'Laisser un avis' : 'Connectez-vous pour laisser un avis'}
              </button>
            </div>

            {/* Description */}
            <div className="max-w-4xl mx-auto text-center">
              <Quote className="w-10 h-10 mb-5 opacity-30 mx-auto" style={{ color: "#00A86B" }} />
              <p
                className="text-white/80 mb-8"
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "1.05rem",
                  lineHeight: 1.85,
                }}
              >
                Chez NovaKom, nous nous engageons à fournir des services de qualité pour sécuriser et optimiser les infrastructures informatiques des commerces et entreprises comoriens. Nos interventions incluent l'installation de réseaux, la configuration de serveurs, les audits de sécurité, et bien plus. Bientôt, vous pourrez découvrir les témoignages de nos premiers clients satisfaits.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightbox !== null && currentPhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: "rgba(5,12,30,0.95)", backdropFilter: "blur(10px)" }}
          onClick={closeLight}
        >
          <div
            className="relative max-w-4xl w-full rounded-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
            style={{ border: "1px solid rgba(0,168,107,0.3)" }}
          >
            <img src={currentPhoto.src} alt={currentPhoto.label} className="w-full max-h-[75vh] object-cover" />
            <div
              className="p-4 flex items-center justify-between"
              style={{ backgroundColor: "#0d2254" }}
            >
              <div>
                <span
                  className="inline-block px-2 py-0.5 rounded-full text-xs mb-1"
                  style={{
                    backgroundColor: (tagColors[currentPhoto.tag] || "#00A86B") + "22",
                    color: tagColors[currentPhoto.tag] || "#00A86B",
                    fontFamily: "Inter, sans-serif",
                  }}
                >
                  {currentPhoto.tag}
                </span>
                <p className="text-white text-sm" style={{ fontFamily: "Inter, sans-serif" }}>
                  {currentPhoto.label}
                </p>
              </div>
              <button
                onClick={closeLight}
                className="w-9 h-9 rounded-full flex items-center justify-center border border-white/20 text-white/70 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}