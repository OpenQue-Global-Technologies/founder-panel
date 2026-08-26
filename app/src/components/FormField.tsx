import { useId, type InputHTMLAttributes, type TextareaHTMLAttributes, type ReactNode } from "react";
import styles from "./FormField.module.css";

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  errorMessage?: string;
  rightSlot?: ReactNode;
}

export function TextField({ id: explicitId, label, errorMessage, rightSlot, className, ...rest }: TextFieldProps) {
  const generatedId = useId();
  const id = explicitId || (label ? generatedId : undefined);

  return (
    <div className={styles.field}>
      {label && (
        <label className={styles.label} htmlFor={id}>
          {label}
        </label>
      )}
      <div style={{ position: "relative" }}>
        <input
          id={id}
          className={[styles.input, errorMessage ? styles.error : "", className].filter(Boolean).join(" ")}
          style={rightSlot ? { paddingRight: 40 } : undefined}
          {...rest}
        />
        {rightSlot && (
          <div style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)" }}>
            {rightSlot}
          </div>
        )}
      </div>
      {errorMessage && <span className={styles.errorMessage}>{errorMessage}</span>}
    </div>
  );
}

interface TextAreaFieldProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

export function TextAreaField({ id: explicitId, label, className, ...rest }: TextAreaFieldProps) {
  const generatedId = useId();
  const id = explicitId || (label ? generatedId : undefined);

  return (
    <div className={styles.field}>
      {label && (
        <label className={styles.label} htmlFor={id}>
          {label}
        </label>
      )}
      <textarea id={id} className={[styles.textarea, className].filter(Boolean).join(" ")} {...rest} />
    </div>
  );
}

export function ReadonlyField({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className={styles.field}>
      <label className={styles.label}>{label}</label>
      <div className={styles.readonlyDisplay}>{value}</div>
    </div>
  );
}
