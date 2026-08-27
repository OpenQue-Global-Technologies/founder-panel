interface LineChartPoint {
  label: string;
  value: number;
}

interface LineChartProps {
  data: LineChartPoint[];
  color?: string;
  height?: number;
  showLabels?: boolean;
}

const VIEW_WIDTH = 600;

export function LineChart({ data, color = "var(--color-primary)", height = 140, showLabels = true }: LineChartProps) {
  if (data.length === 0) return null;

  const max = Math.max(...data.map((d) => d.value), 1);
  const min = Math.min(...data.map((d) => d.value), 0);
  const range = max - min || 1;
  const stepX = data.length > 1 ? VIEW_WIDTH / (data.length - 1) : 0;
  const topPad = 8;
  const usableHeight = height - topPad * 2;

  const points = data.map((d, i) => {
    const x = data.length > 1 ? i * stepX : VIEW_WIDTH / 2;
    const y = topPad + usableHeight - ((d.value - min) / range) * usableHeight;
    return { x, y, ...d };
  });

  const linePath = points.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ");
  const areaPath = `${linePath} L${points[points.length - 1].x},${height} L${points[0].x},${height} Z`;
  const gradientId = `line-chart-gradient-${color.replace(/[^a-z0-9]/gi, "")}`;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <svg viewBox={`0 0 ${VIEW_WIDTH} ${height}`} width="100%" height={height} preserveAspectRatio="none">
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.25" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={areaPath} fill={`url(#${gradientId})`} stroke="none" />
        <path d={linePath} fill="none" stroke={color} strokeWidth={2.5} strokeLinejoin="round" strokeLinecap="round" />
        {points.map((p) => (
          <circle key={p.label} cx={p.x} cy={p.y} r={3} fill={color} />
        ))}
      </svg>
      {showLabels && (
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          {data.map((d) => (
            <span key={d.label} style={{ fontSize: 10, color: "var(--color-neutral-muted)" }}>
              {d.label}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
