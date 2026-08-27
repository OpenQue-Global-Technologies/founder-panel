import type { ReactNode } from "react";
import styles from "./Panel.module.css";

interface PanelProps {
  title?: string;
  subtitle?: string;
  action?: ReactNode;
  children: ReactNode;
  style?: React.CSSProperties;
}

export function Panel({ title, subtitle, action, children, style }: PanelProps) {
  return (
    <div className={styles.panel} style={style}>
      {(title || action) && (
        <div className={styles.header}>
          <div className={styles.titleBlock}>
            {title && <span className={styles.title}>{title}</span>}
            {subtitle && <span className={styles.subtitle}>{subtitle}</span>}
          </div>
          {action}
        </div>
      )}
      {children}
    </div>
  );
}

export function PanelLinkButton({ onClick, children }: { onClick?: () => void; children: ReactNode }) {
  return (
    <button type="button" className={styles.linkBtn} onClick={onClick}>
      {children}
    </button>
  );
}
