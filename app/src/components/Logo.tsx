interface LogoProps {
  size?: number;
  wordmarkSize?: number;
  showWordmark?: boolean;
}

export function Logo({ size = 24, wordmarkSize = 16, showWordmark = true }: LogoProps) {
  const ring = Math.round(size * 0.125);
  const cut = Math.round(size * 0.29);
  const dot = Math.round(size * 0.21);

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <div style={{ position: "relative", width: size, height: size, flexShrink: 0 }}>
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            border: `${ring}px solid var(--color-primary)`,
          }}
        />
        <div
          style={{
            position: "absolute",
            top: -ring * 0.75,
            right: ring * 0.5,
            width: cut,
            height: cut,
            background: "var(--color-surface)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -ring * 0.75,
            right: -ring * 0.75,
            width: dot,
            height: dot,
            borderRadius: "50%",
            background: "var(--color-primary)",
          }}
        />
      </div>
      {showWordmark && (
        <span
          style={{
            fontFamily: "var(--font-heading)",
            fontWeight: 700,
            fontSize: wordmarkSize,
            color: "var(--color-neutral-dark)",
          }}
        >
          OpenQue
        </span>
      )}
    </div>
  );
}
