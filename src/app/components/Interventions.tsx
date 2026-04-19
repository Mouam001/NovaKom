import { useState, useEffect } from "react";
import { Play, X, Star, Quote, MessageSquarePlus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "../lib/supabase";
import { useAuth } from "../contexts/AuthContext";

const photos = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1758101755915-462eddc23f57?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxJVCUyMHRlY2huaWNpYW4lMjB3b3JraW5nJTIwYnVzaW5lc3MlMjBzaG9wJTIwbmV0d29yayUyMGluc3RhbGxhdGlvbnxlbnwxfHx8fDE3NzI0OTcwNjJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    label: "Déploiement des réseaux",
    tag: "Installation réseau",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1735825764457-ffdf0b5aa5dd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21wdXRlciUyMHNldHVwJTIwc21hbGwlMjBidXNpbmVzcyUyMG9mZmljZSUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NzI0OTcwNjJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    label: "Configuration des postes de travail ",
    tag: "Support IT",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1663932210347-164a05ed0ccd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZXR3b3JrJTIwY2FibGUlMjByb3V0ZXIlMjBpbnN0YWxsYXRpb24lMjB0ZWNobmljaWFufGVufDF8fHx8MTc3MjQ5NzA2M3ww&ixlib=rb-4.1.0&q=80&w=1080",
    label: "Câblage bien structuré",
    tag: "Infrastructure réseau",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1762163516269-3c143e04175c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZXJ2ZXIlMjByYWNrJTIwaW5zdGFsbGF0aW9uJTIwZGF0YSUyMGNlbnRlciUyMG1haW50ZW5hbmNlfGVufDF8fHx8MTc3MjQ5NzA2NXww&ixlib=rb-4.1.0&q=80&w=1080",
    label: "Installation des salles serveurs",
    tag: "Serveurs",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1585216274151-e3debff99c0d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXJld2FsbCUyMHNlY3VyaXR5JTIwb2ZmaWNlJTIwaW50ZXJ2ZW50aW9uJTIwcHJvZmVzc2lvbmFsJTIwc2V0dXB8ZW58MXx8fHwxNzcyNDk3MDY4fDA&ixlib=rb-4.1.0&q=80&w=1080",
    label: "Mise en place des firewalls",
    tag: "Cybersécurité",
  },
];

export function Interventions() {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<"photos" | "videos" | "avis">("photos");
  const [approvedReviews, setApprovedReviews] = useState<any[]>([]);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const loadApprovedReviews = async () => {
      try {
        const response = await apiRequest('/reviews/approved');
        const data = await response.json();
        if (response.ok) {
          setApprovedReviews(data.reviews || []);
        }
      } catch (err) {
        console.error('Error loading approved reviews:', err);
      }
    };

    loadApprovedReviews();
  }, []);

  const normalizedApprovedReviews = approvedReviews.map((review) => {
    const displayName = review.userName || "Client NovaKom";
    const initials = displayName
      .split(" ")
      .map((word: string) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
    const parsedRating = Number.parseInt(String(review.rating ?? 0), 10);

    return {
      id: review.id,
      name: displayName,
      company: review.company || "",
      avatar: initials || "CL",
      rating: Number.isNaN(parsedRating) ? 0 : Math.max(0, Math.min(5, parsedRating)),
      text: review.message || "",
    };
  });

  const ratedReviews = normalizedApprovedReviews.filter((review) => review.rating > 0);
  const averageRating = ratedReviews.length
    ? ratedReviews.reduce((sum, review) => sum + review.rating, 0) / ratedReviews.length
    : 0;
  const uniqueCompanies = new Set(
    normalizedApprovedReviews
      .map((review) => review.company.trim().toLowerCase())
      .filter((company) => company.length > 0)
  );
  const satisfiedClientsRate = ratedReviews.length
    ? Math.round((ratedReviews.filter((review) => review.rating >= 4).length / ratedReviews.length) * 100)
    : 0;

  const openLight = (id: number) => setLightbox(id);
  const closeLight = () => setLightbox(null);
  const currentPhoto = photos.find((p) => p.id === lightbox);

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
            Nos futures réalisations terrain
          </p>
          <h2
            className="text-white mb-5"
            style={{
              fontFamily: "Poppins, sans-serif",
              fontWeight: 700,
              fontSize: "clamp(1.6rem, 3vw, 2.5rem)",
            }}
          >
            Nous lançerons prochainement nos services auprès des commerces et entreprises.
            Cette section présentera nos futures réalisations.
          </h2>
          <p
            className="text-white/50 max-w-xl mx-auto"
            style={{ fontFamily: "Inter, sans-serif", fontSize: "0.95rem", lineHeight: 1.75 }}
          >
            Découvrez prochainement nos interventions chez nos clients — photos, 
            vidéos et témoignages de commerçants et entreprises comoriens qui nous feront confiance.
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
          <div className="max-w-2xl mx-auto">
            <div
              className="rounded-xl flex flex-col items-center justify-center gap-4 p-10 text-center"
              style={{
                backgroundColor: "#0d2254",
                border: "2px dashed rgba(255,255,255,0.1)",
                minHeight: "260px",
              }}
            >
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "#00A86B18" }}
              >
                <Play className="w-6 h-6" style={{ color: "#00A86B" }} />
              </div>
              <p
                className="text-white text-lg"
                style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}
              >
                Vidéos bientôt disponibles
              </p>
              <p className="text-white/55 text-sm max-w-md" style={{ fontFamily: "Inter, sans-serif", lineHeight: 1.7 }}>
                Nous publierons prochainement les premières vidéos de nos futures interventions
                pour permettre à nos clients de découvrir notre accompagnement sur le terrain.
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
                { val: `${averageRating.toFixed(1)}/5`, label: "Note moyenne clients" },
                { val: `${uniqueCompanies.size}`, label: "Commerces équipés" },
                { val: `${satisfiedClientsRate}%`, label: "Clients satisfaits" },
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

            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {normalizedApprovedReviews.length === 0 ? (
                <div
                  className="md:col-span-2 rounded-xl p-8 text-center"
                  style={{ backgroundColor: "#0d2254", border: "1px solid rgba(255,255,255,0.1)" }}
                >
                  <p className="text-white/70" style={{ fontFamily: "Inter, sans-serif" }}>
                    Aucun avis validé pour le moment.
                  </p>
                </div>
              ) : (
                normalizedApprovedReviews.map((review) => (
                  <div
                    key={review.id}
                    className="rounded-xl p-6"
                    style={{ backgroundColor: "#0d2254", border: "1px solid rgba(255,255,255,0.1)" }}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold"
                        style={{ backgroundColor: "#00A86B22", color: "#00A86B", fontFamily: "Inter, sans-serif" }}
                      >
                        {review.avatar}
                      </div>
                      <div>
                        <p className="text-white text-sm" style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}>
                          {review.name}
                        </p>
                        <p className="text-white/50 text-xs" style={{ fontFamily: "Inter, sans-serif" }}>
                          {review.company || "Entreprise non renseignée"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-600"}`}
                        />
                      ))}
                      <span className="text-xs text-white/60 ml-2" style={{ fontFamily: "Inter, sans-serif" }}>
                        {review.rating}/5
                      </span>
                    </div>

                    <p className="text-white/80 text-sm" style={{ fontFamily: "Inter, sans-serif", lineHeight: 1.7 }}>
                      {review.text}
                    </p>
                  </div>
                ))
              )}
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
