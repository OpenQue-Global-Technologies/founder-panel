interface GaugeProps {
  valuePercent: number;
  size?: number;
  label?: string;
  goodBelowPercent?: number;
  warnBelowPercent?: number;
}

function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
  const angleRad = ((angleDeg - 180) * Math.PI) / 180;
  return { x: cx + r * Math.cos(angleRad), y: cy + r * Math.sin(angleRad) };
}

function arcPath(cx: number, cy: number, r: number, startAngle: number, endAngle: number) {
  const start = polarToCartesian(cx, cy, r, endAngle);
  const end = polarToCartesian(cx, cy, r, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1;
  return `M${start.x},${start.y} A${r},${r} 0 ${largeArcFlag} 0 ${end.x},${end.y}`;
}

export function Gauge({ valuePercent, size = 180, label, goodBelowPercent = 1, warnBelowPercent = 3 }: GaugeProps) {
  const clamped = Math.min(Math.max(valuePercent, 0), 100);
  const cx = size / 2;
  const cy = size / 2;
  const r = size / 2 - 14;
  const angle = (clamped / 100) * 180;

  const color =
    clamped <= goodBelowPercent
      ? "var(--color-success-text)"
      : clamped <= warnBelowPercent
        ? "var(--color-delayed-text)"
        : "var(--color-error-button)";

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
      <svg viewBox={`0 0 ${size} ${size / 2 + 12}`} width={size} height={size / 2 + 12}>
        <path d={arcPath(cx, cy, r, 0, 180)} fill="none" stroke="var(--color-border)" strokeWidth={14} strokeLinecap="round" />
        <path d={arcPath(cx, cy, r, 0, angle)} fill="none" stroke={color} strokeWidth={14} strokeLinecap="round" />
        <text x={cx} y={cy - 4} textAnchor="middle" fontSize={26} fontWeight={700} fontFamily="var(--font-heading)" fill="var(--color-neutral-dark)">
          {clamped.toFixed(2)}%
        </text>
      </svg>
      {label && <span style={{ fontSize: 12, color: "var(--color-neutral-muted)" }}>{label}</span>}
    </div>
  );
}
