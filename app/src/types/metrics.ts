export interface MonthlyMetricPoint {
  label: string;
  value: number;
}

export interface FunnelStageData {
  label: string;
  count: number;
}

export interface CohortRow {
  cohort: string;
  retention: number[];
}

export interface NorthStarMetric {
  completedAppointments: number;
  momChangePercent: number;
}

export interface StickinessMetric {
  dau: number;
  mau: number;
  ratioPercent: number;
}
