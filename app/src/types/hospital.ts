export type HospitalStatus = "Active" | "Suspended" | "Waiting" | "Delayed";

export type OperatingMode = "Solo" | "Team" | "Full";

export type DutyStatus = "On Duty" | "Off Duty";

export interface Doctor {
  id: string;
  name: string;
  initials: string;
  specialty: string;
  status: DutyStatus;
  consultations: number;
}

export interface CommissionAuditEntry {
  date: string;
  oldRate: number;
  newRate: number;
  changedBy: string;
}

export interface Hospital {
  id: string;
  name: string;
  city: string;
  mode: OperatingMode;
  status: HospitalStatus;
  doctors: number;
  monthlyRevenue: number;
  commissionRate: number;
  activeDoctors: number;
  totalAppointments: number;
  systemIntegration: boolean;
  adminEmail?: string;
  specialists: Doctor[];
  revenueTrend: { month: string; value: number }[];
  commissionAudit: CommissionAuditEntry[];
}
