export type SettlementStatus = "Invoiced" | "Paid" | "Overdue";

export type RevenuePeriod = "This Month" | "Last Month" | "Last Quarter";

export interface SettlementRow {
  hospitalId: string;
  hospitalName: string;
  city: string;
  grossCashRevenue: number;
  commissionPercent: number;
  commissionOwed: number;
  status: SettlementStatus;
}
