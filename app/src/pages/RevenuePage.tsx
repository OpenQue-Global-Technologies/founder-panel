import { useMemo, useState } from "react";
import { AppShell } from "../components/AppShell";
import { StatCard } from "../components/StatCard";
import { StatusBadge } from "../components/StatusBadge";
import { useHospitals } from "../context/HospitalsContext";
import { formatInr } from "../data/hospitals";
import { REVENUE_PERIODS, buildSettlementRows } from "../data/revenue";
import type { RevenuePeriod } from "../types/revenue";
import gridStyles from "../components/DataGrid.module.css";
import styles from "./RevenuePage.module.css";

export function RevenuePage() {
  const { hospitals } = useHospitals();
  const [period, setPeriod] = useState<RevenuePeriod>("This Month");

  const rows = useMemo(() => buildSettlementRows(hospitals, period), [hospitals, period]);

  const totals = useMemo(() => {
    const grossRevenue = rows.reduce((sum, r) => sum + r.grossCashRevenue, 0);
    const commissionOwed = rows.reduce((sum, r) => sum + r.commissionOwed, 0);
    const overdueAmount = rows.filter((r) => r.status === "Overdue").reduce((sum, r) => sum + r.commissionOwed, 0);
    return { grossRevenue, commissionOwed, overdueAmount };
  }, [rows]);

  return (
    <AppShell active="Revenue">
      <div className={styles.titleRow}>
        <h1 className={styles.title}>Commission Settlement Tracker</h1>
        <select className={styles.periodSelect} value={period} onChange={(e) => setPeriod(e.target.value as RevenuePeriod)}>
          {REVENUE_PERIODS.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.statGrid}>
        <StatCard label="Gross Cash Revenue" value={formatInr(totals.grossRevenue)} meta={period} />
        <StatCard label="Commission Owed" value={formatInr(totals.commissionOwed)} meta="Across all hospital partners" />
        <StatCard label="Overdue Amount" value={formatInr(totals.overdueAmount)} meta="Follow up required" />
      </div>

      <div className={gridStyles.tableWrap}>
        <div className={`${gridStyles.headerRow} ${styles.gridCols}`}>
          <span className={gridStyles.headerCell}>Hospital</span>
          <span className={gridStyles.headerCell}>City</span>
          <span className={gridStyles.headerCell}>Gross Cash Revenue</span>
          <span className={gridStyles.headerCell}>Commission %</span>
          <span className={gridStyles.headerCell}>Commission Owed</span>
          <span className={gridStyles.headerCell}>Status</span>
        </div>
        {rows.map((row) => (
          <div key={row.hospitalId} className={`${gridStyles.bodyRow} ${styles.gridCols}`}>
            <span className={gridStyles.cellStrong}>{row.hospitalName}</span>
            <span className={gridStyles.cell}>{row.city}</span>
            <span className={gridStyles.cell}>{formatInr(row.grossCashRevenue)}</span>
            <span className={gridStyles.cell}>{row.commissionPercent}%</span>
            <span className={gridStyles.cell}>{formatInr(row.commissionOwed)}</span>
            <StatusBadge status={row.status} />
          </div>
        ))}
      </div>
    </AppShell>
  );
}
