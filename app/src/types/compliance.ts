export type GrievanceStatus = "Open" | "Investigating" | "Resolved";

export interface Grievance {
  id: string;
  patientRef: string;
  hospitalName: string;
  category: string;
  filedDate: string;
  status: GrievanceStatus;
}

export type DeletionRequestStatus = "Pending" | "In Progress" | "Completed";

export interface DeletionRequest {
  id: string;
  requestor: string;
  hospitalName: string;
  requestedDate: string;
  deadline: string;
  status: DeletionRequestStatus;
}

export interface AccessLogEntry {
  id: string;
  timestamp: string;
  user: string;
  ipAddress: string;
  action: string;
  resource: string;
}
