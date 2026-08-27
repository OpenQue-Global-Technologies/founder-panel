import { AppShell } from "../components/AppShell";
import { Panel } from "../components/Panel";
import { StatusBadge } from "../components/StatusBadge";
import { buildAccessAudit, buildDeletionRequests, buildGrievances } from "../data/compliance";
import gridStyles from "../components/DataGrid.module.css";
import styles from "./CompliancePage.module.css";

export function CompliancePage() {
  const grievances = buildGrievances();
  const deletionRequests = buildDeletionRequests();
  const accessAudit = buildAccessAudit();

  return (
    <AppShell active="Compliance">
      <div className={styles.titleRow}>
        <h1 className={styles.title}>DPDP Compliance Control Panel</h1>
        <StatusBadge status="Audit Ready" />
      </div>

      <Panel title="Patient Grievance Tracker" subtitle="Grievances filed against hospital partners under the DPDP Act">
        <div className={gridStyles.tableWrap}>
          <div className={`${gridStyles.headerRow} ${styles.grievanceCols}`}>
            <span className={gridStyles.headerCell}>Grievance ID</span>
            <span className={gridStyles.headerCell}>Patient</span>
            <span className={gridStyles.headerCell}>Hospital</span>
            <span className={gridStyles.headerCell}>Category</span>
            <span className={gridStyles.headerCell}>Filed</span>
            <span className={gridStyles.headerCell}>Status</span>
          </div>
          {grievances.map((g) => (
            <div key={g.id} className={`${gridStyles.bodyRow} ${styles.grievanceCols}`}>
              <span className={gridStyles.cellStrong}>{g.id}</span>
              <span className={gridStyles.cell}>{g.patientRef}</span>
              <span className={gridStyles.cell}>{g.hospitalName}</span>
              <span className={gridStyles.cellMuted}>{g.category}</span>
              <span className={gridStyles.cellMuted}>{g.filedDate}</span>
              <StatusBadge status={g.status} />
            </div>
          ))}
        </div>
      </Panel>

      <Panel title="Data Deletion Requests (Right to Erasure)" subtitle="30-day internal SLA from request date">
        <div className={gridStyles.tableWrap}>
          <div className={`${gridStyles.headerRow} ${styles.deletionCols}`}>
            <span className={gridStyles.headerCell}>Request ID</span>
            <span className={gridStyles.headerCell}>Requestor</span>
            <span className={gridStyles.headerCell}>Hospital</span>
            <span className={gridStyles.headerCell}>Requested</span>
            <span className={gridStyles.headerCell}>Deadline</span>
            <span className={gridStyles.headerCell}>Status</span>
          </div>
          {deletionRequests.map((d) => (
            <div key={d.id} className={`${gridStyles.bodyRow} ${styles.deletionCols}`}>
              <span className={gridStyles.cellStrong}>{d.id}</span>
              <span className={gridStyles.cell}>{d.requestor}</span>
              <span className={gridStyles.cell}>{d.hospitalName}</span>
              <span className={gridStyles.cellMuted}>{d.requestedDate}</span>
              <span className={gridStyles.cellMuted}>{d.deadline}</span>
              <StatusBadge status={d.status} />
            </div>
          ))}
        </div>
      </Panel>

      <Panel title="System Access Audit & IP Access Registry" subtitle="Founder-team access to hospital and patient data">
        <div className={gridStyles.tableWrap}>
          <div className={`${gridStyles.headerRow} ${styles.auditCols}`}>
            <span className={gridStyles.headerCell}>Timestamp</span>
            <span className={gridStyles.headerCell}>User</span>
            <span className={gridStyles.headerCell}>IP Address</span>
            <span className={gridStyles.headerCell}>Action</span>
            <span className={gridStyles.headerCell}>Resource</span>
          </div>
          {accessAudit.map((entry) => (
            <div key={entry.id} className={`${gridStyles.bodyRow} ${styles.auditCols}`}>
              <span className={gridStyles.cellMuted}>{entry.timestamp}</span>
              <span className={gridStyles.cellStrong}>{entry.user}</span>
              <span className={styles.ipCell}>{entry.ipAddress}</span>
              <span className={gridStyles.cell}>{entry.action}</span>
              <span className={gridStyles.cellMuted}>{entry.resource}</span>
            </div>
          ))}
        </div>
      </Panel>
    </AppShell>
  );
}
