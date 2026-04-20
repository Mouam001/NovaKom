import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";

type Message = { role: "bot" | "user"; text: string };
type BotResponse = { text: string; options?: string[] };

const responses: Record<string, BotResponse> = {
  start: {
    text: "Bonjour, je suis l'assistant NovaKom 👋\nNous aidons les startups, PME et institutions à sécuriser et accélérer leur système d'information.\nChoisissez ce que vous voulez faire :",
    options: ["Découvrir nos 4 pôles", "Demander un devis", "Prendre rendez-vous", "Parler à un expert"],
  },
  "Découvrir nos 4 pôles": {
    text: "Nos 4 pôles d'expertise :\n🛡 Cybersécurité\n🖥 Support & Assistance IT\n🌐 Réseau & Systèmes\n💡 Développement Web & Application\n\nQuel pôle vous intéresse en priorité ?",
    options: ["Cybersécurité", "Support IT", "Réseau & Systèmes", "Développement Web & Application", "Retour menu"],
  },
  "Audit de sécurité": {
    text: "Un audit de sécurité permet d'identifier les failles avant une attaque. Chez NovaKom, l'audit inclut analyse des risques, tests techniques et plan d'actions priorisé.",
    options: ["Demander un audit", "Parler à un expert", "Retour menu"],
  },
  "Cybersécurité": {
    text: "Nous couvrons : audit, pentest, sécurisation réseau, sauvegarde, supervision et sensibilisation des équipes.\nObjectif : réduire les risques sans bloquer votre activité.",
    options: ["Demander un audit", "Demander un devis", "Retour menu"],
  },
  "Support IT": {
    text: "Nous prenons en charge la maintenance, l'assistance utilisateurs, l'installation/migration et la continuité de service.\nIntervention à distance et sur site selon vos besoins.",
    options: ["Demander un devis", "Parler à un expert", "Retour menu"],
  },
  "Réseau & Systèmes": {
    text: "Nous concevons et administrons vos infrastructures : serveurs, Active Directory, virtualisation, Wi-Fi sécurisé, monitoring et optimisation des performances.",
    options: ["Demander un devis", "Parler à un expert", "Retour menu"],
  },
  "Développement Web & Application": {
    text: "Nous créons des sites vitrines, plateformes métiers et applications web sur mesure.\nApproche startup : MVP rapide, architecture évolutive, UX claire, maintenance continue.",
    options: ["Demander un devis", "Parler à un expert", "Retour menu"],
  },
  "Nos offres & tarifs": {
    text: "Nous fonctionnons principalement sur devis, car chaque besoin est différent.\nSi vous voulez, je peux vous orienter vers le bon pôle avant la prise de contact.",
    options: ["Découvrir nos 4 pôles", "Demander un devis", "Parler à un expert", "Retour menu"],
  },
  "Demander un audit": {
    text: "Parfait. L'équipe NovaKom peut planifier un audit rapidement.\nChoisissez votre canal de contact :",
    options: ["Formulaire de contact", "WhatsApp", "Retour menu"],
  },
  "Demander un devis": {
    text: "Pour un devis précis, nous analysons votre contexte (taille, objectif, urgence, existant).\nRéponse initiale sous 24h.",
    options: ["Formulaire de contact", "WhatsApp", "Retour menu"],
  },
  "Prendre rendez-vous": {
    text: "Très bien. Vous pouvez réserver un échange découverte avec notre équipe pour cadrer votre besoin.",
    options: ["Formulaire de contact", "WhatsApp", "Retour menu"],
  },
  "Parler à un expert": {
    text: "Je vous mets en relation avec un expert NovaKom.\nChoisissez le mode de contact le plus rapide pour vous :",
    options: ["Formulaire de contact", "WhatsApp", "Retour menu"],
  },
  "Formulaire de contact": {
    text: "👉 Faites défiler jusqu'à la section Contact pour nous envoyer votre besoin.\nNous revenons vers vous rapidement.",
    options: ["Retour menu"],
  },
  WhatsApp: {
    text: "👉 Choisissez un pôle pour obtenir le contact WhatsApp correspondant.",
    options: ["Retour menu"],
  },
  "En savoir plus": {
    text: "NovaKom accompagne les entreprises en cybersécurité, IT, réseau/systèmes et développement web/app.\nNous intervenons localement et à distance.",
    options: ["Découvrir nos 4 pôles", "Parler à un expert", "Retour menu"],
  },
  "Retour menu": {
    text: "D'accord. Que souhaitez-vous faire maintenant ?",
    options: ["Découvrir nos 4 pôles", "Demander un devis", "Prendre rendez-vous", "Parler à un expert"],
  },
  fallback: {
    text: "Je n'ai pas bien compris. Vous pouvez choisir une option ci-dessous, ou écrire par exemple : \"devis\", \"audit\", \"support IT\" ou \"développement web\".",
    options: ["Découvrir nos 4 pôles", "Demander un devis", "Prendre rendez-vous", "Parler à un expert"],
  },
};

const poleWhatsapp: Record<string, { label: string; display: string; wa: string }> = {
  "Développement Web & Application": {
    label: "Pôle Développement",
    display: "+33 7 73 77 91 64",
    wa: "33773779164",
  },
  Cybersécurité: {
    label: "Pôle Sécurité",
    display: "+269 383 52 76",
    wa: "2693835276",
  },
  "Support IT": {
    label: "Pôle Infrastructure",
    display: "+261 38 50 137 80",
    wa: "261385013780",
  },
  "Réseau & Systèmes": {
    label: "Pôle Réseaux",
    display: "+261 38 50 137 80",
    wa: "261385013780",
  },
};

const intentRules: Array<{ key: keyof typeof responses; keywords: string[] }> = [
  { key: "Audit de sécurité", keywords: ["audit", "pentest", "securite", "cyber"] },
  { key: "Cybersécurité", keywords: ["cyber", "securite", "ransomware"] },
  { key: "Support IT", keywords: ["support", "assistance", "maintenance", "it"] },
  { key: "Réseau & Systèmes", keywords: ["reseau", "wifi", "serveur", "systeme", "active directory"] },
  { key: "Développement Web & Application", keywords: ["dev", "developpement", "site", "application", "web", "mobile", "mvp"] },
  { key: "Demander un devis", keywords: ["devis", "prix", "tarif", "budget", "cout"] },
  { key: "Prendre rendez-vous", keywords: ["rdv", "rendez", "meeting", "appel"] },
  { key: "Parler à un expert", keywords: ["expert", "contact", "parler"] },
  { key: "WhatsApp", keywords: ["whatsapp"] },
  { key: "Formulaire de contact", keywords: ["formulaire", "email", "mail", "contact"] },
  { key: "Découvrir nos 4 pôles", keywords: ["service", "poles", "pole", "offre"] },
];

const normalizeText = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();

const findResponseKey = (userText: string): keyof typeof responses => {
  const normalized = normalizeText(userText);
  const exactMatch = (Object.keys(responses) as Array<keyof typeof responses>).find(
    (key) => normalizeText(key) === normalized,
  );
  if (exactMatch) return exactMatch;

  const keywordMatch = intentRules.find((rule) =>
    rule.keywords.some((keyword) => normalized.includes(keyword)),
  );
  return keywordMatch?.key ?? "fallback";
};

export function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [options, setOptions] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [selectedPole, setSelectedPole] = useState<string | null>(null);
  const chatRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
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

  useEffect(() => {
    if (!open) return;

    const handleOutsideClick = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node;
      if (chatRef.current?.contains(target)) return;
      if (toggleRef.current?.contains(target)) return;
      setOpen(false);
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("touchstart", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("touchstart", handleOutsideClick);
    };
  }, [open]);

  const send = (text: string) => {
    if (poleWhatsapp[text]) {
      setSelectedPole(text);
    }
    if (text === "Retour menu") {
      setSelectedPole(null);
    }

    const newMessages: Message[] = [...messages, { role: "user", text }];
    setMessages(newMessages);
    setOptions([]);

    setTimeout(() => {
      const key = findResponseKey(text);
      if (key === "WhatsApp" && selectedPole && poleWhatsapp[selectedPole]) {
        const contact = poleWhatsapp[selectedPole];
        const whatsappLink = `https://wa.me/${contact.wa}`;
        setMessages((prev) => [
          ...prev,
          {
            role: "bot",
            text: `👉 ${contact.label} : ${contact.display}\n${whatsappLink}`,
          },
        ]);
        setOptions(["Retour menu"]);
        return;
      }
      const resp = responses[key] || responses.fallback;
      setMessages((prev) => [...prev, { role: "bot", text: resp.text }]);
      setOptions(resp.options || []);
    }, 450);
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
          ref={chatRef}
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
                  {m.text.split("\n").map((line, index) => {
                    const urlMatch = line.match(/https?:\/\/\S+/);
                    if (!urlMatch) {
                      return <div key={`${i}-${index}`}>{line}</div>;
                    }
                    const url = urlMatch[0];
                    const before = line.slice(0, line.indexOf(url));
                    const after = line.slice(line.indexOf(url) + url.length);
                    return (
                      <div key={`${i}-${index}`}>
                        {before}
                        <a
                          href={url}
                          target="_blank"
                          rel="noreferrer"
                          className="underline"
                        >
                          {url}
                        </a>
                        {after}
                      </div>
                    );
                  })}
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
        ref={toggleRef}
        onClick={() => {
          if (!open) setOpen(true);
        }}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all hover:scale-110"
        style={{
          background: "linear-gradient(135deg, #00A86B, #007a4e)",
          boxShadow: "0 8px 30px rgba(0,168,107,0.4)",
        }}
      >
        <MessageCircle className="w-6 h-6 text-white" />
      </button>
    </>
  );
}
