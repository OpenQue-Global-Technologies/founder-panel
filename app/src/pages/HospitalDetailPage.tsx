import { useState } from "react";
import { useNavigate, useParams, Navigate } from "react-router-dom";
import { AppShell } from "../components/AppShell";
import { Button } from "../components/Button";
import { StatusBadge } from "../components/StatusBadge";
import { Toggle } from "../components/Toggle";
import { CommissionRateModal } from "../components/CommissionRateModal";
import { useHospitals } from "../context/HospitalsContext";
import { formatInr } from "../data/hospitals";
import { useAuth } from "../context/AuthContext";
import styles from "./HospitalDetailPage.module.css";

export function HospitalDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getHospital, toggleSystemIntegration, suspendHospital } = useHospitals();
  const { founder } = useAuth();
  const [modalOpen, setModalOpen] = useState(false);

  const hospital = id ? getHospital(id) : undefined;

  if (!hospital) {
    return <Navigate to="/partners" replace />;
  }

  const maxRevenue = Math.max(...hospital.revenueTrend.map((r) => r.value), 1);

  function handleSuspend() {
    if (!hospital) return;
    if (window.confirm(`Suspend ${hospital.name}? This revokes queue access for all attached doctors.`)) {
      suspendHospital(hospital.id);
    }
  }

  return (
    <AppShell active="Partners">
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <span className={styles.breadcrumb}>Partners / Hospitals</span>
        <div className={styles.titleRow}>
          <div className={styles.titleLeft}>
            <h1 className={styles.title}>{hospital.name}</h1>
            <StatusBadge status={hospital.status} />
          </div>
          <Toggle
            checked={hospital.systemIntegration}
            onChange={() => toggleSystemIntegration(hospital.id)}
            label="System Integration"
          />
        </div>
      </div>

      <div className={styles.kpiGrid}>
        <div className={styles.kpiCard}>
          <span className={styles.kpiLabel}>Active Doctors</span>
          <span className={styles.kpiValue}>{hospital.activeDoctors}</span>
        </div>
        <div className={styles.kpiCard}>
          <div className={styles.kpiHeader}>
            <span className={styles.kpiLabel}>Commission Rate</span>
            <button type="button" className={styles.editRateLink} onClick={() => setModalOpen(true)}>
              Edit Rate
            </button>
          </div>
          <span className={styles.kpiValue}>{hospital.commissionRate}%</span>
        </div>
        <div className={styles.kpiCard}>
          <span className={styles.kpiLabel}>Monthly Revenue</span>
          <span className={styles.kpiValue}>{formatInr(hospital.monthlyRevenue)}</span>
        </div>
        <div className={styles.kpiCard}>
          <span className={styles.kpiLabel}>Total Appointments</span>
          <span className={styles.kpiValue}>{hospital.totalAppointments.toLocaleString("en-IN")}</span>
        </div>
      </div>

      <div className={styles.twoColGrid}>
        <div className={styles.panel}>
          <div className={styles.panelHeader}>
            <span className={styles.panelTitle}>Consulting Specialists</span>
            <button type="button" className={styles.linkBtn}>
              Manage Roster
            </button>
          </div>
          <div className={styles.specialistsTable}>
            <div className={styles.specialistsHead}>
              <span className={styles.specialistsHeadCell}>Doctor Name</span>
              <span className={styles.specialistsHeadCell}>Specialty</span>
              <span className={styles.specialistsHeadCell}>Status</span>
              <span className={styles.specialistsHeadCell}>Consultations</span>
            </div>
            {hospital.specialists.length === 0 ? (
              <div style={{ padding: "16px 4px", fontSize: 13, color: "var(--color-neutral-muted)" }}>
                No specialists on roster.
              </div>
            ) : (
              hospital.specialists.map((doc) => (
                <div key={doc.id} className={styles.specialistsRow}>
                  <span className={styles.doctorName}>
                    <span className={styles.doctorAvatar}>{doc.initials}</span>
                    {doc.name}
                  </span>
                  <span className={styles.specialistCell}>{doc.specialty}</span>
                  <StatusBadge status={doc.status} />
                  <span className={styles.specialistCell}>{doc.consultations}</span>
                </div>
              ))
            )}
          </div>
        </div>

        <div className={styles.panel}>
          <div>
            <div className={styles.panelTitle}>Revenue Trend</div>
            <div className={styles.chartSubtitle}>Monthly tracking over last 6 months</div>
          </div>
          <div className={styles.chart}>
            {hospital.revenueTrend.map((point, i) => (
              <div key={point.month} className={styles.chartBarWrap}>
                <div
                  className={i === hospital.revenueTrend.length - 1 ? `${styles.chartBar} ${styles.chartBarLast}` : styles.chartBar}
                  style={{ height: `${(point.value / maxRevenue) * 100}%` }}
                />
                <span className={styles.chartMonth}>{point.month}</span>
              </div>
            ))}
          </div>
          <div className={styles.chartFooter}>
            <div className={styles.chartFooterDot} />
            <span className={styles.chartFooterText}>On-track to exceed Q3 forecasts</span>
          </div>
        </div>
      </div>

      <div className={styles.emergencyPanel}>
        <div className={styles.emergencyText}>
          <span className={styles.emergencyTitle}>Emergency &amp; Security Controls</span>
          <span className={styles.emergencyBody}>
            Suspending this hospital immediately revokes queue access for all attached doctors and pauses commission
            accrual. This action is logged and notifies the partner&apos;s admin contact.
          </span>
        </div>
        <Button variant="destructive" onClick={handleSuspend} disabled={hospital.status === "Suspended"}>
          {hospital.status === "Suspended" ? "Suspended" : "Suspend Hospital"}
        </Button>
      </div>

      <Button variant="secondary" style={{ alignSelf: "flex-start" }} onClick={() => navigate("/partners")}>
        ← Back to Partner List
      </Button>

      {modalOpen && (
        <CommissionRateModal
          hospital={hospital}
          changedBy={founder?.name ?? "Founder"}
          onClose={() => setModalOpen(false)}
        />
      )}
    </AppShell>
  );
}
