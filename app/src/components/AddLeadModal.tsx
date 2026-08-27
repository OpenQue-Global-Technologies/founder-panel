import { useEffect, useState } from "react";
import { TextField } from "./FormField";
import { Button } from "./Button";
import { PIPELINE_OWNERS } from "../data/pipeline";
import styles from "./AddLeadModal.module.css";
import formFieldStyles from "./FormField.module.css";

interface AddLeadModalProps {
  onClose: () => void;
  onCreate: (input: { hospitalName: string; city: string; owner: string; estMonthlyRevenue?: number }) => void;
}

export function AddLeadModal({ onClose, onCreate }: AddLeadModalProps) {
  const [hospitalName, setHospitalName] = useState("");
  const [city, setCity] = useState("");
  const [owner, setOwner] = useState(PIPELINE_OWNERS[0]);
  const [estMonthlyRevenue, setEstMonthlyRevenue] = useState("");
  const [errors, setErrors] = useState<{ hospitalName?: string; city?: string }>({});

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  function handleCreate() {
    const nextErrors: typeof errors = {};
    if (!hospitalName.trim()) nextErrors.hospitalName = "Hospital name is required.";
    if (!city.trim()) nextErrors.city = "City is required.";
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }
    onCreate({
      hospitalName: hospitalName.trim(),
      city: city.trim(),
      owner,
      estMonthlyRevenue: estMonthlyRevenue ? Number(estMonthlyRevenue) : undefined,
    });
  }

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.panel} onClick={(e) => e.stopPropagation()}>
        <span className={styles.title}>Add New Lead</span>

        <TextField
          label="Hospital Name"
          placeholder="e.g. Sunrise Multispecialty Hospital"
          value={hospitalName}
          onChange={(e) => setHospitalName(e.target.value)}
          errorMessage={errors.hospitalName}
        />
        <TextField
          label="City"
          placeholder="e.g. Bhopal"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          errorMessage={errors.city}
        />
        <div className={formFieldStyles.field}>
          <label className={formFieldStyles.label}>Deal Owner</label>
          <select className={formFieldStyles.select} value={owner} onChange={(e) => setOwner(e.target.value)}>
            {PIPELINE_OWNERS.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>
        <TextField
          label="Estimated Monthly Revenue (₹)"
          type="text"
          inputMode="numeric"
          placeholder="e.g. 250000"
          value={estMonthlyRevenue}
          onChange={(e) => setEstMonthlyRevenue(e.target.value.replace(/[^0-9]/g, ""))}
        />

        <div className={styles.footer}>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleCreate}>
            Add Lead
          </Button>
        </div>
      </div>
    </div>
  );
}
