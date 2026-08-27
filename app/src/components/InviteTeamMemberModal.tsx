import { useEffect, useState } from "react";
import { TextField } from "./FormField";
import { Button } from "./Button";
import type { TeamRole } from "../types/settings";
import styles from "./AddLeadModal.module.css";
import formFieldStyles from "./FormField.module.css";

const ROLES: TeamRole[] = ["Founder", "Co-Founder", "Ops Admin"];

interface InviteTeamMemberModalProps {
  onClose: () => void;
  onInvite: (input: { name: string; email: string; role: TeamRole }) => void;
}

export function InviteTeamMemberModal({ onClose, onInvite }: InviteTeamMemberModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<TeamRole>("Ops Admin");
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  function handleInvite() {
    const nextErrors: typeof errors = {};
    if (!name.trim()) nextErrors.name = "Name is required.";
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) nextErrors.email = "Enter a valid email address.";
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }
    onInvite({ name: name.trim(), email: email.trim(), role });
  }

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.panel} onClick={(e) => e.stopPropagation()}>
        <span className={styles.title}>Add Founder Login</span>

        <TextField label="Full Name" placeholder="e.g. Kabir Anand" value={name} onChange={(e) => setName(e.target.value)} errorMessage={errors.name} />
        <TextField
          label="Email"
          type="email"
          placeholder="name@openque.in"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          errorMessage={errors.email}
        />
        <div className={formFieldStyles.field}>
          <label className={formFieldStyles.label}>Role</label>
          <select className={formFieldStyles.select} value={role} onChange={(e) => setRole(e.target.value as TeamRole)}>
            {ROLES.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.footer}>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleInvite}>
            Send Invite
          </Button>
        </div>
      </div>
    </div>
  );
}
