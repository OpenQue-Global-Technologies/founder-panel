import { useEffect, useState } from "react";
import { TextField } from "./FormField";
import { Button } from "./Button";
import type { OperatingMode } from "../types/hospital";
import styles from "./AddLeadModal.module.css";
import formFieldStyles from "./FormField.module.css";

const MODE_OPTIONS: { value: OperatingMode; label: string }[] = [
  { value: "Solo", label: "Solo" },
  { value: "Team", label: "Small Team" },
  { value: "Full", label: "Full Hospital" },
];

export interface AddHospitalInput {
  name: string;
  city: string;
  mode: OperatingMode;
  commissionRate: number;
  adminEmail: string;
}

interface AddHospitalModalProps {
  onClose: () => void;
  onCreate: (input: AddHospitalInput) => void;
}

export function AddHospitalModal({ onClose, onCreate }: AddHospitalModalProps) {
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [mode, setMode] = useState<OperatingMode>("Solo");
  const [commissionRate, setCommissionRate] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [errors, setErrors] = useState<{ name?: string; city?: string; commissionRate?: string; adminEmail?: string }>({});

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  function handleCreate() {
    const rateValue = Number(commissionRate);
    const nextErrors: typeof errors = {};
    if (!name.trim()) nextErrors.name = "Hospital name is required.";
    if (!city.trim()) nextErrors.city = "City is required.";
    if (!commissionRate.trim() || Number.isNaN(rateValue) || rateValue < 0 || rateValue > 100) {
      nextErrors.commissionRate = "Enter a valid rate between 0 and 100.";
    }
    if (!/^\S+@\S+\.\S+$/.test(adminEmail.trim())) {
      nextErrors.adminEmail = "Enter a valid email address.";
    }
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }
    onCreate({
      name: name.trim(),
      city: city.trim(),
      mode,
      commissionRate: rateValue,
      adminEmail: adminEmail.trim(),
    });
  }

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.panel} onClick={(e) => e.stopPropagation()}>
        <span className={styles.title}>Add New Hospital</span>

        <TextField
          label="Hospital Name"
          placeholder="e.g. Sunrise Multispecialty Hospital"
          value={name}
          onChange={(e) => setName(e.target.value)}
          errorMessage={errors.name}
        />
        <TextField
          label="City"
          placeholder="e.g. Bhopal"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          errorMessage={errors.city}
        />
        <div className={formFieldStyles.field}>
          <label className={formFieldStyles.label}>Operating Mode</label>
          <select
            className={formFieldStyles.select}
            value={mode}
            onChange={(e) => setMode(e.target.value as OperatingMode)}
          >
            {MODE_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
        <TextField
          label="Initial Commission Rate (%)"
          type="text"
          inputMode="decimal"
          placeholder="e.g. 10"
          value={commissionRate}
          onChange={(e) => setCommissionRate(e.target.value)}
          errorMessage={errors.commissionRate}
        />
        <TextField
          label="Primary Admin Email"
          type="email"
          placeholder="admin@hospital.in"
          value={adminEmail}
          onChange={(e) => setAdminEmail(e.target.value)}
          errorMessage={errors.adminEmail}
        />

        <div className={styles.footer}>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleCreate}>
            Add Hospital
          </Button>
        </div>
      </div>
    </div>
  );
}
