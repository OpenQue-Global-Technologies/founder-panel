interface FunnelStage {
  label: string;
  count: number;
}

export function Funnel({ stages }: { stages: FunnelStage[] }) {
  const max = stages[0]?.count || 1;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {stages.map((stage, i) => {
        const widthPercent = Math.max((stage.count / max) * 100, 4);
        const conversionFromPrev = i === 0 ? 100 : (stage.count / stages[i - 1].count) * 100;
        return (
          <div key={stage.label} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
              <span style={{ fontSize: "var(--text-body)", fontWeight: 600, color: "var(--color-neutral-dark)" }}>
                {stage.label}
              </span>
              <span style={{ fontSize: "var(--text-caption)", color: "var(--color-neutral-muted)" }}>
                {stage.count.toLocaleString("en-IN")}
                {i > 0 && <> · {conversionFromPrev.toFixed(0)}% of prev</>}
              </span>
            </div>
            <div style={{ height: 14, background: "var(--color-border)", borderRadius: 999 }}>
              <div
                style={{
                  height: "100%",
                  width: `${widthPercent}%`,
                  background: i === stages.length - 1 ? "var(--color-primary)" : "var(--color-secondary)",
                  borderRadius: 999,
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
