import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppShell } from "../components/AppShell";
import { StatCard } from "../components/StatCard";
import { Panel } from "../components/Panel";
import { LineChart } from "../components/LineChart";
import { Gauge } from "../components/Gauge";
import { StatusBadge } from "../components/StatusBadge";
import { useHospitals } from "../context/HospitalsContext";
import {
  buildApiRequestSeries,
  buildDisruptions,
  buildInitialLiveMetrics,
  buildWsConnectionSeries,
  jitterMetrics,
} from "../data/dashboard";
import styles from "./DashboardPage.module.css";

const TICK_MS = 3000;

export function DashboardPage() {
  const { hospitals } = useHospitals();
  const navigate = useNavigate();
  const [metrics, setMetrics] = useState(buildInitialLiveMetrics);
  const [apiSeries, setApiSeries] = useState(buildApiRequestSeries);
  const [wsSeries, setWsSeries] = useState(buildWsConnectionSeries);

  useEffect(() => {
    const timer = setInterval(() => {
      setMetrics((prev) => jitterMetrics(prev));
      setApiSeries((prev) => {
        const last = prev[prev.length - 1]?.value ?? 2400;
        const next = Math.max(0, Math.round(last + (Math.random() - 0.5) * 260));
        return [...prev.slice(1), { label: "now", value: next }];
      });
      setWsSeries((prev) => {
        const last = prev[prev.length - 1]?.value ?? 1800;
        const next = Math.max(0, Math.round(last + (Math.random() - 0.5) * 90));
        return [...prev.slice(1), { label: "now", value: next }];
      });
    }, TICK_MS);
    return () => clearInterval(timer);
  }, []);

  const disruptions = buildDisruptions(hospitals);
  const wsConnectedPercent = metrics.wsTotalCount === 0 ? 0 : (metrics.wsConnectedCount / metrics.wsTotalCount) * 100;

  return (
    <AppShell active="Dashboard">
      <div className={styles.titleRow}>
        <h1 className={styles.title}>Live Platform Monitor</h1>
        <StatusBadge status="System Healthy" />
      </div>

      <div className={styles.statGrid}>
        <StatCard label="Active Users" value={metrics.activeUsers.toLocaleString("en-IN")} meta="Live session count" />
        <StatCard
          label="WebSocket Connections"
          value={`${wsConnectedPercent.toFixed(1)}%`}
          meta={`${metrics.wsConnectedCount.toLocaleString("en-IN")} / ${metrics.wsTotalCount.toLocaleString("en-IN")} connected`}
        />
        <StatCard
          label="API Latency"
          value={`${metrics.apiLatencyMs} ms`}
          meta={`p99: ${metrics.apiLatencyP99Ms} ms`}
        />
        <StatCard
          label="Active Disruptions"
          value={disruptions.length}
          meta={disruptions.length === 0 ? "All partners nominal" : "Hospitals need attention"}
        />
      </div>

      <div className={styles.chartGrid}>
        <Panel title="API Requests / min" subtitle="Last 60 minutes, 5-minute intervals">
          <LineChart data={apiSeries} color="var(--color-primary)" />
        </Panel>
        <Panel title="WebSocket Connections" subtitle="Last 60 minutes, 5-minute intervals">
          <LineChart data={wsSeries} color="var(--color-secondary)" />
        </Panel>
      </div>

      <div className={styles.gaugeErrorRow}>
        <Panel title="Error Rate">
          <div className={styles.gaugeWrap}>
            <Gauge valuePercent={metrics.errorRatePercent} label="of requests errored, last 5 min" />
          </div>
        </Panel>
        <Panel title="Active Hospital Disruptions" subtitle="Partners flagged for founder attention">
          {disruptions.length === 0 ? (
            <div className={styles.emptyDisruptions}>No active disruptions. All hospital partners are nominal.</div>
          ) : (
            <div className={styles.disruptionList}>
              {disruptions.map((d) => (
                <div key={d.id} className={styles.disruptionRow}>
                  <div className={styles.disruptionMain}>
                    <div className={styles.disruptionHospital}>
                      <span className={styles.disruptionName}>{d.hospitalName}</span>
                      <span className={styles.disruptionCity}>{d.city}</span>
                      <StatusBadge status={d.status} />
                    </div>
                    <span className={styles.disruptionIssue}>{d.issue}</span>
                  </div>
                  <span className={styles.disruptionSince}>{d.since}</span>
                  <button
                    type="button"
                    className={styles.disruptionSince}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      color: "var(--color-primary)",
                      fontWeight: 600,
                      fontSize: 13,
                    }}
                    onClick={() => navigate(`/partners/${d.hospitalId}`)}
                  >
                    View →
                  </button>
                </div>
              ))}
            </div>
          )}
        </Panel>
      </div>
    </AppShell>
  );
}
