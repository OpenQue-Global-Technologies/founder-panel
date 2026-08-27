import type { AccessLogEntry, DeletionRequest, Grievance } from "../types/compliance";

export function buildGrievances(): Grievance[] {
  return [
    { id: "GRV-2026-014", patientRef: "Patient #48213", hospitalName: "Apollo Care Multispecialty", category: "Consent — SMS reminders", filedDate: "22 Aug 2026", status: "Open" },
    { id: "GRV-2026-013", patientRef: "Patient #29104", hospitalName: "Fortis Wellness Center", category: "Data accuracy — appointment history", filedDate: "18 Aug 2026", status: "Investigating" },
    { id: "GRV-2026-012", patientRef: "Patient #17755", hospitalName: "Lilavati General", category: "Unauthorized data sharing claim", filedDate: "09 Aug 2026", status: "Investigating" },
    { id: "GRV-2026-011", patientRef: "Patient #33982", hospitalName: "Sunrise Multi-Speciality", category: "Consent — WhatsApp notifications", filedDate: "02 Aug 2026", status: "Resolved" },
    { id: "GRV-2026-010", patientRef: "Patient #08841", hospitalName: "Apollo Care Multispecialty", category: "Access request delay", filedDate: "27 Jul 2026", status: "Resolved" },
  ];
}

// DPDP Act grievance redressal is time-bound; this panel assumes the founder team's internal
// SLA of a 30-day completion deadline from the request date for Right to Erasure requests.
export function buildDeletionRequests(): DeletionRequest[] {
  return [
    { id: "DEL-2026-006", requestor: "Patient #48213", hospitalName: "Apollo Care Multispecialty", requestedDate: "20 Aug 2026", deadline: "19 Sep 2026", status: "Pending" },
    { id: "DEL-2026-005", requestor: "Patient #21190", hospitalName: "Trinity Health Institute", requestedDate: "12 Aug 2026", deadline: "11 Sep 2026", status: "In Progress" },
    { id: "DEL-2026-004", requestor: "Patient #55031", hospitalName: "Aster Prime Hospital", requestedDate: "30 Jul 2026", deadline: "29 Aug 2026", status: "In Progress" },
    { id: "DEL-2026-003", requestor: "Patient #10982", hospitalName: "Fortis Wellness Center", requestedDate: "14 Jul 2026", deadline: "13 Aug 2026", status: "Completed" },
    { id: "DEL-2026-002", requestor: "Patient #77410", hospitalName: "Wellspring Medical Center", requestedDate: "02 Jul 2026", deadline: "01 Aug 2026", status: "Completed" },
  ];
}

export function buildAccessAudit(): AccessLogEntry[] {
  return [
    { id: "log-1", timestamp: "26 Aug 2026, 09:14", user: "Priya Shah", ipAddress: "103.27.14.88", action: "Viewed patient PII export", resource: "Apollo Care Multispecialty" },
    { id: "log-2", timestamp: "25 Aug 2026, 18:02", user: "Arjun Mehta", ipAddress: "103.27.14.91", action: "Updated commission rate", resource: "Apollo Care Multispecialty" },
    { id: "log-3", timestamp: "25 Aug 2026, 11:47", user: "Divya Rao", ipAddress: "49.36.88.201", action: "Resolved grievance", resource: "GRV-2026-011" },
    { id: "log-4", timestamp: "24 Aug 2026, 21:35", user: "Unknown", ipAddress: "185.220.101.4", action: "Blocked login attempt — IP not whitelisted", resource: "Founder Login" },
    { id: "log-5", timestamp: "24 Aug 2026, 10:08", user: "Priya Shah", ipAddress: "103.27.14.88", action: "Exported hospital partner list (CSV)", resource: "Hospital Partner List" },
    { id: "log-6", timestamp: "23 Aug 2026, 16:20", user: "Arjun Mehta", ipAddress: "103.27.14.91", action: "Suspended hospital account", resource: "CarePlus Diagnostics" },
  ];
}
