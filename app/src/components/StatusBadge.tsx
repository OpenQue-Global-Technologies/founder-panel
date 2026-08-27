type BadgeTone = "success" | "waiting" | "delayed" | "inactive" | "error";

const TONE_STYLES: Record<BadgeTone, { bg: string; text: string }> = {
  success: { bg: "var(--color-success-bg)", text: "var(--color-success-text)" },
  waiting: { bg: "var(--color-waiting-bg)", text: "var(--color-waiting-text)" },
  delayed: { bg: "var(--color-delayed-bg)", text: "var(--color-delayed-text)" },
  inactive: { bg: "var(--color-inactive-bg)", text: "var(--color-inactive-text)" },
  error: { bg: "var(--color-error-bg)", text: "var(--color-error-text)" },
};

const STATUS_TONE: Record<string, BadgeTone> = {
  Active: "success",
  "On Duty": "success",
  Waiting: "waiting",
  Delayed: "delayed",
  Suspended: "inactive",
  "Off Duty": "inactive",
  "System Healthy": "success",
  "Audit Ready": "success",
  // Revenue — settlement status
  Paid: "success",
  Invoiced: "waiting",
  Overdue: "error",
  // Support — ticket status
  Open: "delayed",
  "In Progress": "waiting",
  Resolved: "success",
  Closed: "inactive",
  // Compliance — grievance / deletion request status
  Investigating: "waiting",
  Pending: "delayed",
  Completed: "success",
  // Settings — team / API key status
  Invited: "waiting",
  Revoked: "inactive",
  Connected: "success",
  "Not Connected": "inactive",
};

export function StatusBadge({ status }: { status: string }) {
  const tone = STATUS_TONE[status] ?? "inactive";
  const { bg, text } = TONE_STYLES[tone];
  return (
    <span
      style={{
        display: "inline-flex",
        width: "fit-content",
        padding: "3px 10px",
        borderRadius: "var(--radius-sm)",
        background: bg,
        color: text,
        fontSize: "var(--text-caption)",
        fontWeight: 600,
      }}
    >
      {status}
    </span>
  );
}
