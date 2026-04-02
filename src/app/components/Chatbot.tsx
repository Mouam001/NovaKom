import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";

type Message = { role: "bot" | "user"; text: string };

const responses: Record<string, { text: string; options?: string[] }> = {
  start: {
    text: "Bonjour ! Je suis l'assistant NovaKom 👋\nComment puis-je vous aider aujourd'hui ?",
    options: ["Audit de sécurité", "Nos services", "Nos offres & tarifs", "Parler à un expert"],
  },
  "Audit de sécurité": {
    text: "Un audit de sécurité permet d'identifier les vulnérabilités de votre système avant que des attaquants ne le fassent. NovaKom propose des audits complets incluant tests d'intrusion, analyse réseau et rapport détaillé.",
    options: ["Demander un audit", "En savoir plus", "Retour"],
  },
  "Nos services": {
    text: "NovaKom propose 3 pôles d'expertise :\n🛡 Cybersécurité\n🖥 Support & Assistance IT\n🌐 Administration Réseau & Système\n\nQuel pôle vous intéresse ?",
    options: ["Cybersécurité", "Support IT", "Réseau & Système", "Retour"],
  },
  "Cybersécurité": {
    text: "Notre pôle cybersécurité couvre : audit, pentest, firewall, VPN, sauvegarde sécurisée et sensibilisation des équipes. Nous protégeons votre organisation de bout en bout.",
    options: ["Demander un audit", "Nos tarifs", "Retour"],
  },
  "Support IT": {
    text: "Notre support IT inclut maintenance, assistance utilisateurs, installation, migration et récupération de données. Disponible en présentiel à Moroni et à distance.",
    options: ["Obtenir un devis", "Retour"],
  },
  "Réseau & Système": {
    text: "Nous installons et administrons vos serveurs, Active Directory, solutions de virtualisation, WiFi sécurisé et monitoring réseau 24/7.",
    options: ["Obtenir un devis", "Retour"],
  },
  "Nos offres & tarifs": {
    text: "Nous proposons 3 packs :\n📦 Basic – Maintenance + sauvegarde\n📦 Standard – Maintenance + sécurité réseau\n📦 Premium – Infogérance complète + cybersécurité avancée\n\nTous nos tarifs sont sur devis selon vos besoins spécifiques.",
    options: ["Obtenir un devis", "Parler à un expert", "Retour"],
  },
  "Demander un audit": {
    text: "Parfait ! Notre équipe vous contactera pour planifier votre audit. Vous pouvez également remplir le formulaire de contact sur notre site.",
    options: ["Formulaire de contact", "WhatsApp"],
  },
  "Obtenir un devis": {
    text: "Pour un devis personnalisé, contactez-nous directement. Nous répondons sous 24h.",
    options: ["Formulaire de contact", "WhatsApp"],
  },
  "Parler à un expert": {
    text: "Je vous mets en relation avec un expert NovaKom. Choisissez votre mode de contact préféré :",
    options: ["Formulaire de contact", "WhatsApp"],
  },
  "Formulaire de contact": {
    text: "👉 Faites défiler vers le bas jusqu'à la section Contact pour remplir notre formulaire.",
    options: ["Recommencer"],
  },
  WhatsApp: {
    text: "👉 Contactez-nous sur WhatsApp au +269 321 00 00. Nous répondons rapidement !",
    options: ["Recommencer"],
  },
  "En savoir plus": {
    text: "NovaKom est basé à Moroni, Union des Comores. Nous intervenons localement et à distance pour les entreprises, PME et institutions.",
    options: ["Parler à un expert", "Retour"],
  },
  Retour: { text: "D'accord ! Comment puis-je vous aider ?", options: ["Audit de sécurité", "Nos services", "Nos offres & tarifs", "Parler à un expert"] },
  Recommencer: { text: "Bonjour ! Comment puis-je vous aider aujourd'hui ?", options: ["Audit de sécurité", "Nos services", "Nos offres & tarifs", "Parler à un expert"] },
};

export function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [options, setOptions] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open && messages.length === 0) {
      const init = responses["start"];
      setMessages([{ role: "bot", text: init.text }]);
      setOptions(init.options || []);
    }
  }, [open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = (text: string) => {
    const newMessages: Message[] = [...messages, { role: "user", text }];
    setMessages(newMessages);
    setOptions([]);

    setTimeout(() => {
      const key = Object.keys(responses).find((k) =>
        text.toLowerCase().includes(k.toLowerCase())
      ) || "start";
      const resp = responses[key] || responses["start"];
      setMessages((prev) => [...prev, { role: "bot", text: resp.text }]);
      setOptions(resp.options || []);
    }, 700);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    send(input.trim());
    setInput("");
  };

  return (
    <>
      {/* Chat window */}
      {open && (
        <div
          className="fixed bottom-24 right-6 w-80 sm:w-96 z-50 flex flex-col rounded-2xl overflow-hidden shadow-2xl"
          style={{
            backgroundColor: "#0d2254",
            border: "1px solid rgba(0,168,107,0.3)",
            height: "480px",
          }}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between px-5 py-4"
            style={{ background: "linear-gradient(135deg, #00A86B, #007a4e)" }}
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-white text-sm" style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}>
                  Assistant NovaKom
                </p>
                <div className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  <p className="text-white/70 text-xs" style={{ fontFamily: "Inter, sans-serif" }}>
                    En ligne
                  </p>
                </div>
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="text-white/70 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"} items-end gap-2`}>
                {m.role === "bot" && (
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: "#00A86B22" }}
                  >
                    <Bot className="w-3 h-3" style={{ color: "#00A86B" }} />
                  </div>
                )}
                <div
                  className="max-w-[80%] px-4 py-2.5 rounded-2xl text-sm whitespace-pre-line"
                  style={{
                    backgroundColor: m.role === "bot" ? "#0a1f44" : "#00A86B",
                    color: "#fff",
                    fontFamily: "Inter, sans-serif",
                    lineHeight: 1.6,
                    borderRadius: m.role === "bot" ? "0.25rem 1rem 1rem 1rem" : "1rem 1rem 0.25rem 1rem",
                    border: m.role === "bot" ? "1px solid rgba(255,255,255,0.08)" : "none",
                  }}
                >
                  {m.text}
                </div>
                {m.role === "user" && (
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: "#ffffff22" }}
                  >
                    <User className="w-3 h-3 text-white" />
                  </div>
                )}
              </div>
            ))}

            {/* Options */}
            {options.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-1">
                {options.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => send(opt)}
                    className="px-3 py-1.5 rounded-xl text-xs border transition-all hover:scale-105"
                    style={{
                      borderColor: "#00A86B55",
                      color: "#00A86B",
                      backgroundColor: "#00A86B11",
                      fontFamily: "Inter, sans-serif",
                    }}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <form
            onSubmit={handleSubmit}
            className="flex items-center gap-2 px-4 py-3"
            style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Tapez votre message..."
              className="flex-1 bg-transparent text-white placeholder-white/30 text-sm outline-none"
              style={{ fontFamily: "Inter, sans-serif" }}
            />
            <button
              type="submit"
              className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: "linear-gradient(135deg, #00A86B, #007a4e)" }}
            >
              <Send className="w-3.5 h-3.5 text-white" />
            </button>
          </form>
        </div>
      )}

      {/* Toggle button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all hover:scale-110"
        style={{
          background: "linear-gradient(135deg, #00A86B, #007a4e)",
          boxShadow: "0 8px 30px rgba(0,168,107,0.4)",
        }}
      >
        {open ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <MessageCircle className="w-6 h-6 text-white" />
        )}
      </button>
    </>
  );
}
