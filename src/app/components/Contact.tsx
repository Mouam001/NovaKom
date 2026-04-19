import { useState } from "react";
import { Phone, Mail, MapPin, Calendar, Send } from "lucide-react";

export function Contact() {
  const [form, setForm] = useState({ name: "", company: "", email: "", phone: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setForm({ name: "", company: "", email: "", phone: "", subject: "", message: "" });
  };

  const inputStyle = {
    backgroundColor: "#0d2254",
    border: "1px solid rgba(255,255,255,0.1)",
    color: "#fff",
    fontFamily: "Inter, sans-serif",
    fontSize: "0.9rem",
    outline: "none",
    borderRadius: "0.75rem",
    padding: "0.75rem 1rem",
    width: "100%",
    transition: "border-color 0.2s",
  };

  return (
    <section
      id="contact"
      className="py-24"
      style={{ backgroundColor: "#0A1F44" }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p
            className="text-xs tracking-widest uppercase mb-3"
            style={{ color: "#00A86B", fontFamily: "Inter, sans-serif" }}
          >
            Prenons contact
          </p>
          <h2
            className="text-white mb-5"
            style={{
              fontFamily: "Poppins, sans-serif",
              fontWeight: 700,
              fontSize: "clamp(1.6rem, 3vw, 2.5rem)",
            }}
          >
            Discutons de votre projet
          </h2>
          <p
            className="text-white/50 max-w-xl mx-auto"
            style={{ fontFamily: "Inter, sans-serif", fontSize: "0.95rem", lineHeight: 1.75 }}
          >
            Que vous souhaitiez un audit, une démo ou simplement des informations,
            notre équipe est disponible pour vous répondre.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Info */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {[
              {
                icon: <Phone className="w-5 h-5" />,
                label: "Téléphone",
                value: "+269 355 54 74",
                sub: "Lun – Sam, 8h – 18h",
              },
              {
                icon: <Mail className="w-5 h-5" />,
                label: "Email",
                value: "contactus@novakom.tech",
                sub: "Réponse sous 24h",
              },
              {
                icon: <MapPin className="w-5 h-5" />,
                label: "Adresse",
                value: "Moroni, Union des Comores",
                sub: "Intervention locale & distancielle",
              },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-start gap-4 p-5 rounded-xl"
                style={{
                  backgroundColor: "#0d2254",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: "#00A86B22", color: "#00A86B" }}
                >
                  {item.icon}
                </div>
                <div>
                  <p className="text-white/40 text-xs mb-0.5" style={{ fontFamily: "Inter, sans-serif" }}>
                    {item.label}
                  </p>
                  <p className="text-white text-sm" style={{ fontFamily: "Inter, sans-serif", fontWeight: 500 }}>
                    {item.value}
                  </p>
                  <p className="text-white/40 text-xs" style={{ fontFamily: "Inter, sans-serif" }}>
                    {item.sub}
                  </p>
                </div>
              </div>
            ))}

            {/* Prise de RDV */}
            <a
              href="#"
              className="flex items-center justify-center gap-3 py-4 rounded-xl text-white transition-all hover:opacity-90"
              style={{
                background: "linear-gradient(135deg, #00A86B, #007a4e)",
                fontFamily: "Inter, sans-serif",
                fontWeight: 600,
                fontSize: "0.9rem",
              }}
            >
              <Calendar className="w-4 h-4" />
              Prendre un rendez-vous
            </a>

            {/* WhatsApp */}
            <a
              href="https://wa.me/0033773779164"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 py-4 rounded-xl text-white border transition-all hover:bg-white/5"
              style={{
                borderColor: "rgba(255,255,255,0.15)",
                fontFamily: "Inter, sans-serif",
                fontWeight: 500,
                fontSize: "0.9rem",
              }}
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" style={{ color: "#25D366" }}>
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Contacter sur WhatsApp
            </a>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="lg:col-span-3 rounded-2xl p-8 flex flex-col gap-4"
            style={{
              backgroundColor: "#0d2254",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            <h3
              className="text-white mb-2"
              style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: "1.1rem" }}
            >
              Formulaire de contact
            </h3>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-white/50 text-xs block mb-1.5" style={{ fontFamily: "Inter, sans-serif" }}>
                  Nom complet *
                </label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="Votre nom"
                  style={inputStyle}
                />
              </div>
              <div>
                <label className="text-white/50 text-xs block mb-1.5" style={{ fontFamily: "Inter, sans-serif" }}>
                  Entreprise
                </label>
                <input
                  name="company"
                  value={form.company}
                  onChange={handleChange}
                  placeholder="Votre entreprise"
                  style={inputStyle}
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-white/50 text-xs block mb-1.5" style={{ fontFamily: "Inter, sans-serif" }}>
                  Email *
                </label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="votre@email.com"
                  style={inputStyle}
                />
              </div>
              <div>
                <label className="text-white/50 text-xs block mb-1.5" style={{ fontFamily: "Inter, sans-serif" }}>
                  Téléphone
                </label>
                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+269 ..."
                  style={inputStyle}
                />
              </div>
            </div>

            <div>
              <label className="text-white/50 text-xs block mb-1.5" style={{ fontFamily: "Inter, sans-serif" }}>
                Sujet *
              </label>
              <select
                name="subject"
                value={form.subject}
                onChange={handleChange}
                required
                style={{ ...inputStyle, cursor: "pointer" }}
              >
                <option value="" style={{ backgroundColor: "#0d2254" }}>Sélectionnez un sujet</option>
                <option value="audit" style={{ backgroundColor: "#0d2254" }}>Demande d'audit</option>
                <option value="cybersec" style={{ backgroundColor: "#0d2254" }}>Cybersécurité</option>
                <option value="support" style={{ backgroundColor: "#0d2254" }}>Support IT</option>
                <option value="reseau" style={{ backgroundColor: "#0d2254" }}>Administration réseau</option>
                <option value="pack" style={{ backgroundColor: "#0d2254" }}>Offres & packs</option>
                <option value="pack" style={{ backgroundColor: "#0d2254" }}>Développement Site & Application</option>
                <option value="autre" style={{ backgroundColor: "#0d2254" }}>Autre</option>
              </select>
            </div>

            <div>
              <label className="text-white/50 text-xs block mb-1.5" style={{ fontFamily: "Inter, sans-serif" }}>
                Message *
              </label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows={5}
                placeholder="Décrivez votre besoin..."
                style={{ ...inputStyle, resize: "none" }}
              />
            </div>

            <button
              type="submit"
              className="mt-2 flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-white text-sm transition-all hover:opacity-90 hover:scale-[1.01]"
              style={{
                background: "linear-gradient(135deg, #00A86B, #007a4e)",
                fontFamily: "Inter, sans-serif",
                fontWeight: 600,
              }}
            >
              {sent ? (
                "✅ Message envoyé avec succès !"
              ) : (
                <>
                  <Send className="w-4 h-4" /> Envoyer le message
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
