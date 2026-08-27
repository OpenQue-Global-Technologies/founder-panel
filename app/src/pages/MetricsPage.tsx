import { AppShell } from "../components/AppShell";
import { StatCard } from "../components/StatCard";
import { Panel } from "../components/Panel";
import { LineChart } from "../components/LineChart";
import { Funnel } from "../components/Funnel";
import { buildCohorts, buildFunnel, buildMonthlyExpansion, buildNorthStar, buildStickiness } from "../data/metrics";
import styles from "./MetricsPage.module.css";

const COHORT_MONTH_LABELS = ["M0", "M1", "M2", "M3", "M4", "M5"];

function retentionColor(percent: number): string {
  if (percent === 0) return "transparent";
  const alpha = Math.min(0.85, 0.12 + percent / 130);
  return `rgba(7, 79, 248, ${alpha.toFixed(2)})`;
}

export function MetricsPage() {
  const northStar = buildNorthStar();
  const stickiness = buildStickiness();
  const expansion = buildMonthlyExpansion();
  const funnel = buildFunnel();
  const cohorts = buildCohorts();

  return (
    <AppShell active="Metrics">
      <h1 className={styles.title}>Platform Growth Metrics</h1>

      <div className={styles.statGrid}>
        <StatCard
          label="North Star Metric — Completed Appointments / Month"
          value={northStar.completedAppointments.toLocaleString("en-IN")}
          trendPercent={northStar.momChangePercent}
          meta="Month-over-month"
        />
        <StatCard
          label="Product Stickiness — DAU / MAU"
          value={`${stickiness.ratioPercent.toFixed(1)}%`}
          meta={`${stickiness.dau.toLocaleString("en-IN")} DAU · ${stickiness.mau.toLocaleString("en-IN")} MAU`}
        />
      </div>

      <Panel title="Monthly Appointment Expansion" subtitle="Completed appointments, trailing 12 months">
        <LineChart data={expansion} color="var(--color-primary)" />
      </Panel>

      <div className={styles.statGrid}>
        <Panel title="Acquisition Conversion Funnel" subtitle="Registered Accounts → Repeat Bookings">
          <Funnel stages={funnel} />
        </Panel>

        <Panel title="Cohort Retention Analysis" subtitle="% of cohort still booking, by month since signup">
          <div style={{ overflowX: "auto" }}>
            <table className={styles.cohortTable}>
              <thead>
                <tr>
                  <th>Cohort</th>
                  {COHORT_MONTH_LABELS.map((m) => (
                    <th key={m}>{m}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {cohorts.map((row) => (
                  <tr key={row.cohort}>
                    <td className={styles.cohortLabel}>{row.cohort}</td>
                    {row.retention.map((value, i) => (
                      <td key={i}>
                        {value === 0 && i > 0 ? (
                          <span className={styles.cohortEmpty}>—</span>
                        ) : (
                          <span
                            className={styles.cohortCell}
                            style={{ display: "inline-block", padding: "3px 8px", background: retentionColor(value) }}
                          >
                            {value}%
                          </span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>
      </div>
    </AppShell>
  );
}
