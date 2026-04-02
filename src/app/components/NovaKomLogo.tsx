/**
 * NovaKom – Logo SVG sur mesure
 *
 * Concept :
 *  • Forme extérieure : hexagone (technologie, réseau, alvéole cyber)
 *  • Intérieur : lettre "N" construite en traces de circuit imprimé
 *    avec nœuds lumineux aux points de connexion (topologie réseau)
 *  • Arc de signal / impulsion (nova = étoile, explosion numérique)
 *    qui entoure l'hexagone → connectivité & innovation
 *  • Croissant subtil en haut (identité comorienne – drapeau)
 *  • Palette : #0A1F44 (bleu nuit) + #00A86B (vert numérique)
 */

interface NovaKomLogoProps {
  /** Largeur totale de l'icône (hauteur calculée automatiquement) */
  size?: number;
  /** Afficher le logotype textuel à côté de l'icône */
  showText?: boolean;
  /** Variante sombre (texte blanc) ou claire (texte #0A1F44) */
  variant?: "dark" | "light";
}

export function NovaKomLogoIcon({ size = 48 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 56 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="NovaKom logo"
    >
      {/* ── Définitions : filtres glow ── */}
      <defs>
        <filter id="nk-glow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="1.8" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        <filter id="nk-node-glow" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="1.4" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        <linearGradient id="nk-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00A86B" />
          <stop offset="100%" stopColor="#00d68a" />
        </linearGradient>
        <linearGradient id="nk-bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0d2254" />
          <stop offset="100%" stopColor="#0A1F44" />
        </linearGradient>
      </defs>

      {/* ── Hexagone de fond ── */}
      {/* Hexagone pointu-top, légèrement aplati */}
      <path
        d="M28 2 L52 15.5 L52 40.5 L28 54 L4 40.5 L4 15.5 Z"
        fill="url(#nk-bg)"
        stroke="#00A86B"
        strokeWidth="1.4"
        strokeOpacity="0.55"
      />

      {/* ── Hexagone intérieur décoratif (légèrement transparent) ── */}
      <path
        d="M28 8 L46 18.5 L46 37.5 L28 48 L10 37.5 L10 18.5 Z"
        fill="none"
        stroke="#00A86B"
        strokeWidth="0.4"
        strokeOpacity="0.15"
        strokeDasharray="3 3"
      />

      {/* ── Arc de signal (nova / impulsion) en haut ── */}
      <path
        d="M11 13 Q28 2 45 13"
        fill="none"
        stroke="url(#nk-grad)"
        strokeWidth="1"
        strokeOpacity="0.35"
        strokeDasharray="2.5 2"
      />
      {/* Second arc légèrement plus grand */}
      <path
        d="M7 15.5 Q28 1 49 15.5"
        fill="none"
        stroke="#00A86B"
        strokeWidth="0.5"
        strokeOpacity="0.18"
        strokeDasharray="1.5 3"
      />

      {/* ──────────────────────────────────────────
          Lettre "N" en circuit imprimé
          Points clés :
            A  = (15, 16)  haut-gauche
            B  = (15, 40)  bas-gauche
            C  = (41, 16)  haut-droite
            D  = (41, 40)  bas-droite
          La diagonale passe par  E = (28, 28) (centre)
          Style circuit : on « pixelise » la diagonale
          AB via deux segments orthogonaux
          ────────────────────────────────────────── */}

      {/* Trace gauche verticale  A → B */}
      <line
        x1="15" y1="16"
        x2="15" y2="40"
        stroke="url(#nk-grad)"
        strokeWidth="2.6"
        strokeLinecap="round"
        filter="url(#nk-glow)"
      />

      {/* Diagonale circuit A → (pivot horizontal) → D
          Passage : (15,16) → (22,16) → (34,40) → (41,40)
          → donne l'effet "trace PCB" en marches
      */}
      <polyline
        points="15,16  22,16  34,40  41,40"
        stroke="url(#nk-grad)"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        filter="url(#nk-glow)"
      />

      {/* Trace droite verticale  C → D */}
      <line
        x1="41" y1="16"
        x2="41" y2="40"
        stroke="url(#nk-grad)"
        strokeWidth="2.6"
        strokeLinecap="round"
        filter="url(#nk-glow)"
      />

      {/* ── Nœuds de connexion (points de réseau) ── */}
      {/* Nœud A – haut gauche */}
      <circle cx="15" cy="16" r="3.5" fill="#00A86B" filter="url(#nk-node-glow)" />
      <circle cx="15" cy="16" r="1.8" fill="#fff" />

      {/* Nœud B – bas gauche */}
      <circle cx="15" cy="40" r="3.5" fill="#00A86B" filter="url(#nk-node-glow)" />
      <circle cx="15" cy="40" r="1.8" fill="#fff" />

      {/* Nœud C – haut droit */}
      <circle cx="41" cy="16" r="3.5" fill="#00A86B" filter="url(#nk-node-glow)" />
      <circle cx="41" cy="16" r="1.8" fill="#fff" />

      {/* Nœud D – bas droit */}
      <circle cx="41" cy="40" r="3.5" fill="#00A86B" filter="url(#nk-node-glow)" />
      <circle cx="41" cy="40" r="1.8" fill="#fff" />

      {/* Nœud pivot haut de la diagonale (22, 16) */}
      <circle cx="22" cy="16" r="2.2" fill="#00d68a" opacity="0.85" filter="url(#nk-node-glow)" />

      {/* Nœud pivot bas de la diagonale (34, 40) */}
      <circle cx="34" cy="40" r="2.2" fill="#00d68a" opacity="0.85" filter="url(#nk-node-glow)" />

      {/* Nœud central – intersection du N (centre optique) */}
      <circle cx="28" cy="28" r="2.8" fill="#00A86B" filter="url(#nk-node-glow)" opacity="0.7" />
      <circle cx="28" cy="28" r="1.2" fill="#00d68a" />

      {/* ── Croissant comorien (très discret, bas du hex) ── */}
      {/* Petit arc en bas, évocation de la lune des Comores */}
      <path
        d="M23 49.5 Q28 47 33 49.5"
        fill="none"
        stroke="#00A86B"
        strokeWidth="1.2"
        strokeOpacity="0.5"
        strokeLinecap="round"
      />

      {/* ── Point "signal" en haut droite ── */}
      <circle cx="45" cy="13" r="1.5" fill="#00A86B" opacity="0.6" />
      <circle cx="48" cy="11" r="1" fill="#00A86B" opacity="0.35" />
    </svg>
  );
}

export function NovaKomLogo({
  size = 44,
  showText = true,
  variant = "dark",
}: NovaKomLogoProps) {
  const textColor = variant === "dark" ? "#ffffff" : "#0A1F44";

  return (
    <div className="flex items-center gap-3 select-none">
      <NovaKomLogoIcon size={size} />
      {showText && (
        <div className="flex flex-col justify-center">
          <span
            style={{
              fontFamily: "Poppins, sans-serif",
              fontWeight: 800,
              fontSize: size * 0.42 + "px",
              color: textColor,
              letterSpacing: "-0.01em",
              lineHeight: 1,
            }}
          >
            Nova
            <span style={{ color: "#00A86B" }}>Kom</span>
          </span>
          <span
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 500,
              fontSize: size * 0.185 + "px",
              color: variant === "dark" ? "rgba(255,255,255,0.38)" : "rgba(10,31,68,0.45)",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              lineHeight: 1.3,
              marginTop: "2px",
            }}
          >
            IT &amp; Cyber Defense
          </span>
        </div>
      )}
    </div>
  );
}
