import type { Hospital } from "../types/hospital";
import type { RevenuePeriod, SettlementRow, SettlementStatus } from "../types/revenue";

export const REVENUE_PERIODS: RevenuePeriod[] = ["This Month", "Last Month", "Last Quarter"];

// OpenQue is a cash-only product: hospitals collect payment directly from patients and
// OpenQue never touches patient funds. There is no payment gateway integration, and there
// never will be for Scale 1 — commission owed here is settled manually by the finance team
// (bank transfer against a monthly invoice), not auto-debited. This mock client stands in
// for a future read-only settlements API backed by the founder's accounting ledger; it does
// not initiate or process any payment itself.
function scaleRevenueForPeriod(hospital: Hospital, period: RevenuePeriod): number {
  const trend = hospital.revenueTrend;
  const last = trend[trend.length - 1]?.value || 1;
  if (period === "This Month") return hospital.monthlyRevenue;
  if (period === "Last Month") {
    const prev = trend[trend.length - 2]?.value ?? last;
    return Math.round(hospital.monthlyRevenue * (prev / last));
  }
  const lastThree = trend.slice(-3);
  const ratioSum = lastThree.reduce((acc, point) => acc + point.value / last, 0);
  return Math.round(hospital.monthlyRevenue * ratioSum);
}

function statusFor(hospital: Hospital, index: number): SettlementStatus {
  if (hospital.monthlyRevenue === 0) return "Paid";
  const bucket = (index + hospital.name.length) % 5;
  if (bucket === 0) return "Overdue";
  if (bucket <= 2) return "Invoiced";
  return "Paid";
}

export function buildSettlementRows(hospitals: Hospital[], period: RevenuePeriod): SettlementRow[] {
  return hospitals.map((hospital, index) => {
    const grossCashRevenue = scaleRevenueForPeriod(hospital, period);
    const commissionOwed = Math.round((grossCashRevenue * hospital.commissionRate) / 100);
    return {
      hospitalId: hospital.id,
      hospitalName: hospital.name,
      city: hospital.city,
      grossCashRevenue,
      commissionPercent: hospital.commissionRate,
      commissionOwed,
      status: statusFor(hospital, index),
    };
  });
}
