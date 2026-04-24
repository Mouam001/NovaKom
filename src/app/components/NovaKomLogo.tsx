import logoImage from "../../assets/images/logo.png";

interface NovaKomLogoProps {
  size?: number;
  showText?: boolean;
  variant?: "dark" | "light";
}

export function NovaKomLogoIcon({ size = 48 }: { size?: number }) {
  return (
    <img
      src={logoImage}
      alt="NovaKom logo"
      width={size}
      height={size}
      style={{
        width: size,
        height: size,
        objectFit: "cover",
        borderRadius: size * 0.22,
        border: "1px solid rgba(0,168,107,0.45)",
        boxShadow: "0 6px 20px rgba(0,168,107,0.15)",
      }}
    />
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
            IT &amp; Cybersécurité
          </span>
        </div>
      )}
    </div>
  );
}
