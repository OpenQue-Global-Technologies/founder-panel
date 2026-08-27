import type { Hospital } from "../types/hospital";
import type { Disruption, LiveMetrics, TimeSeriesPoint } from "../types/dashboard";

export function buildInitialLiveMetrics(): LiveMetrics {
  return {
    activeUsers: 1842,
    wsConnectedCount: 1798,
    wsTotalCount: 1842,
    apiLatencyMs: 118,
    apiLatencyP99Ms: 412,
    errorRatePercent: 0.42,
  };
}

export function jitterMetrics(metrics: LiveMetrics): LiveMetrics {
  const activeUsers = Math.max(0, metrics.activeUsers + Math.round((Math.random() - 0.5) * 40));
  const wsTotalCount = activeUsers;
  const wsConnectedCount = Math.min(wsTotalCount, Math.max(0, metrics.wsConnectedCount + Math.round((Math.random() - 0.5) * 30)));
  const apiLatencyMs = Math.max(40, Math.round(metrics.apiLatencyMs + (Math.random() - 0.5) * 24));
  const apiLatencyP99Ms = Math.max(apiLatencyMs, Math.round(metrics.apiLatencyP99Ms + (Math.random() - 0.5) * 60));
  const errorRatePercent = Math.min(8, Math.max(0, metrics.errorRatePercent + (Math.random() - 0.5) * 0.15));
  return { activeUsers, wsConnectedCount, wsTotalCount, apiLatencyMs, apiLatencyP99Ms, errorRatePercent };
}

function buildSeries(baseline: number, spread: number, points: number): TimeSeriesPoint[] {
  const series: TimeSeriesPoint[] = [];
  let value = baseline;
  for (let i = points - 1; i >= 0; i--) {
    value = Math.max(0, value + (Math.random() - 0.5) * spread);
    series.push({ label: i === 0 ? "now" : `-${i * 5}m`, value: Math.round(value) });
  }
  return series;
}

export function buildApiRequestSeries(): TimeSeriesPoint[] {
  return buildSeries(2400, 260, 12);
}

export function buildWsConnectionSeries(): TimeSeriesPoint[] {
  return buildSeries(1800, 90, 12);
}

const DISRUPTION_ISSUE_BY_STATUS: Record<string, string> = {
  Delayed: "Appointment sync running behind — queue updates delayed for attached doctors.",
  Suspended: "Hospital access suspended — queue and billing frozen pending founder review.",
  Waiting: "Onboarding incomplete — awaiting first live queue activation.",
};

export function buildDisruptions(hospitals: Hospital[]): Disruption[] {
  return hospitals
    .filter((h) => h.status === "Delayed" || h.status === "Suspended" || h.status === "Waiting")
    .map((h, i) => ({
      id: `disruption-${h.id}`,
      hospitalId: h.id,
      hospitalName: h.name,
      city: h.city,
      issue: DISRUPTION_ISSUE_BY_STATUS[h.status] ?? "Unresolved platform issue flagged for review.",
      status: h.status as Disruption["status"],
      since: `${2 + ((i * 7) % 26)}h ago`,
    }));
}
