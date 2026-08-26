interface ToggleProps {
  checked: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
}

export function Toggle({ checked, onChange, label }: ToggleProps) {
  const track = (
    <div
      role="switch"
      aria-checked={checked}
      aria-label={label}
      tabIndex={0}
      onClick={() => onChange?.(!checked)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onChange?.(!checked);
        }
      }}
      style={{
        width: 40,
        height: 22,
        borderRadius: 11,
        background: checked ? "var(--color-primary)" : "var(--color-border)",
        position: "relative",
        flexShrink: 0,
        cursor: onChange ? "pointer" : "default",
        transition: "background 0.15s ease",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 2,
          left: checked ? 20 : 2,
          width: 18,
          height: 18,
          borderRadius: "50%",
          background: "var(--color-surface)",
          transition: "left 0.15s ease",
        }}
      />
    </div>
  );

  if (!label) return track;

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <span style={{ fontSize: "var(--text-body)", fontWeight: 500, color: "var(--color-neutral-dark)" }}>
        {label}
      </span>
      {track}
    </div>
  );
}
