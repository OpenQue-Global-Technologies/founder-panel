import type { ReactNode } from "react";
import styles from "./StatCard.module.css";

interface StatCardProps {
  label: string;
  value: ReactNode;
  meta?: ReactNode;
  trendPercent?: number;
  action?: ReactNode;
}

export function StatCard({ label, value, meta, trendPercent, action }: StatCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span className={styles.label}>{label}</span>
        {action}
      </div>
      <div className={styles.valueRow}>
        <span className={styles.value}>{value}</span>
        {trendPercent !== undefined && (
          <span className={trendPercent >= 0 ? styles.trendUp : styles.trendDown}>
            {trendPercent >= 0 ? "▲" : "▼"} {Math.abs(trendPercent).toFixed(1)}%
          </span>
        )}
      </div>
      {meta && <span className={styles.meta}>{meta}</span>}
    </div>
  );
}
