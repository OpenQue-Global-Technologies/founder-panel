export interface TimeSeriesPoint {
  label: string;
  value: number;
}

export interface LiveMetrics {
  activeUsers: number;
  wsConnectedCount: number;
  wsTotalCount: number;
  apiLatencyMs: number;
  apiLatencyP99Ms: number;
  errorRatePercent: number;
}

export type DisruptionSeverity = "Delayed" | "Suspended" | "Waiting";

export interface Disruption {
  id: string;
  hospitalId: string;
  hospitalName: string;
  city: string;
  issue: string;
  status: DisruptionSeverity;
  since: string;
}
