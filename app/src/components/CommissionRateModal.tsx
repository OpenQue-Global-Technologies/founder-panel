import { useEffect, useState } from "react";
import type { Hospital } from "../types/hospital";
import { useHospitals } from "../context/HospitalsContext";
import { TextField, TextAreaField, ReadonlyField } from "./FormField";
import { Button } from "./Button";
import styles from "./CommissionRateModal.module.css";

interface CommissionRateModalProps {
  hospital: Hospital;
  changedBy: string;
  onClose: () => void;
}

function formatDisplayDate(isoDate: string): string {
  const date = new Date(`${isoDate}T00:00:00`);
  if (Number.isNaN(date.getTime())) return isoDate;
  return date.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}

export function CommissionRateModal({ hospital, changedBy, onClose }: CommissionRateModalProps) {
  const { updateCommission } = useHospitals();
  const [newRate, setNewRate] = useState("");
  const [effectiveDate, setEffectiveDate] = useState("");
  const [reason, setReason] = useState("");
  const [errors, setErrors] = useState<{ newRate?: string; effectiveDate?: string; reason?: string }>({});

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  function handleSave() {
    const rateValue = Number(newRate);
    const nextErrors: typeof errors = {};
    if (!newRate.trim() || Number.isNaN(rateValue) || rateValue < 0 || rateValue > 100) {
      nextErrors.newRate = "Enter a valid rate between 0 and 100.";
    }
    if (!effectiveDate) {
      nextErrors.effectiveDate = "Effective date is required.";
    }
    if (!reason.trim()) {
      nextErrors.reason = "A reason is required for the audit log.";
    }
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }
    updateCommission(hospital.id, {
      newRate: rateValue,
      effectiveDate: formatDisplayDate(effectiveDate),
      reason: reason.trim(),
      changedBy,
    });
    onClose();
  }

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.panel} onClick={(e) => e.stopPropagation()}>
        <span className={styles.title}>Commission Rate Manager</span>

        <div className={styles.rateRow}>
          <div className={styles.rateField}>
            <ReadonlyField label="Current Rate" value={`${hospital.commissionRate}%`} />
          </div>
          <div className={styles.rateField}>
            <TextField
              label="New Rate"
              type="text"
              inputMode="decimal"
              placeholder="e.g. 14"
              value={newRate}
              onChange={(e) => setNewRate(e.target.value)}
              errorMessage={errors.newRate}
            />
          </div>
        </div>

        <TextField
          label="Effective Date"
          type="date"
          value={effectiveDate}
          onChange={(e) => setEffectiveDate(e.target.value)}
          errorMessage={errors.effectiveDate}
        />

        <TextAreaField
          label="Reason for Modification"
          rows={3}
          placeholder="Explain why this rate is changing..."
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />
        {errors.reason && (
          <span style={{ fontSize: 12, color: "var(--color-error-text)", marginTop: -12 }}>{errors.reason}</span>
        )}

        <div className={styles.historySection}>
          <span className={styles.historyLabel}>Modification Audit History</span>
          <div className={styles.historyTable}>
            <div className={styles.historyHead}>
              <span className={styles.historyHeadCell}>Date</span>
              <span className={styles.historyHeadCell}>Old Rate</span>
              <span className={styles.historyHeadCell}>New Rate</span>
              <span className={styles.historyHeadCell}>Changed By</span>
            </div>
            {hospital.commissionAudit.map((entry, i) => (
              <div key={i} className={styles.historyRow}>
                <span className={styles.historyCell}>{entry.date}</span>
                <span className={styles.historyCell}>{entry.oldRate}%</span>
                <span className={styles.historyCell}>{entry.newRate}%</span>
                <span className={styles.historyCell}>{entry.changedBy}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.footer}>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
}
