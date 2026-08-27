import type { CohortRow, FunnelStageData, MonthlyMetricPoint, NorthStarMetric, StickinessMetric } from "../types/metrics";

export function buildNorthStar(): NorthStarMetric {
  return { completedAppointments: 18420, momChangePercent: 12.6 };
}

export function buildStickiness(): StickinessMetric {
  const dau = 1842;
  const mau = 6840;
  return { dau, mau, ratioPercent: (dau / mau) * 100 };
}

export function buildMonthlyExpansion(): MonthlyMetricPoint[] {
  const months = ["Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"];
  const base = [9200, 9800, 10400, 11100, 11800, 12600, 13500, 14400, 15600, 16800, 17600, 18420];
  return months.map((label, i) => ({ label, value: base[i] }));
}

export function buildFunnel(): FunnelStageData[] {
  return [
    { label: "Registered Accounts", count: 5240 },
    { label: "Verified Profile", count: 4180 },
    { label: "First Booking", count: 2860 },
    { label: "Repeat Bookings", count: 1920 },
  ];
}

export function buildCohorts(): CohortRow[] {
  return [
    { cohort: "Mar 2026", retention: [100, 64, 52, 46, 41, 38] },
    { cohort: "Apr 2026", retention: [100, 68, 55, 49, 44, 0] },
    { cohort: "May 2026", retention: [100, 71, 58, 52, 0, 0] },
    { cohort: "Jun 2026", retention: [100, 73, 61, 0, 0, 0] },
    { cohort: "Jul 2026", retention: [100, 76, 0, 0, 0, 0] },
    { cohort: "Aug 2026", retention: [100, 0, 0, 0, 0, 0] },
  ];
}
