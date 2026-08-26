import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppShell } from "../components/AppShell";
import { Button } from "../components/Button";
import { StatusBadge } from "../components/StatusBadge";
import { useHospitals } from "../context/HospitalsContext";
import { formatInr } from "../data/hospitals";
import type { HospitalStatus, OperatingMode } from "../types/hospital";
import styles from "./PartnerListPage.module.css";

const MODES: (OperatingMode | "All")[] = ["All", "Solo", "Team", "Full"];
const STATUSES: (HospitalStatus | "All Statuses")[] = ["All Statuses", "Active", "Waiting", "Delayed", "Suspended"];
const PAGE_SIZE = 5;

function exportCsv(rows: { name: string; city: string; mode: string; status: string; doctors: number; monthlyRevenue: number; commissionRate: number }[]) {
  const header = ["Hospital Name", "City", "Operating Mode", "Status", "Doctors", "Monthly Revenue", "Commission Rate"];
  const lines = [header.join(",")];
  for (const row of rows) {
    lines.push(
      [row.name, row.city, row.mode, row.status, row.doctors, row.monthlyRevenue, `${row.commissionRate}%`]
        .map((value) => `"${String(value).replace(/"/g, '""')}"`)
        .join(",")
    );
  }
  const blob = new Blob([lines.join("\n")], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "openque-hospital-partners.csv";
  link.click();
  URL.revokeObjectURL(url);
}

export function PartnerListPage() {
  const { hospitals } = useHospitals();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [mode, setMode] = useState<OperatingMode | "All">("All");
  const [status, setStatus] = useState<HospitalStatus | "All Statuses">("All Statuses");
  const [page, setPage] = useState(1);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 650);
    return () => clearTimeout(timer);
  }, []);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return hospitals.filter((h) => {
      const matchesQuery = !query || h.name.toLowerCase().includes(query) || h.city.toLowerCase().includes(query);
      const matchesMode = mode === "All" || h.mode === mode;
      const matchesStatus = status === "All Statuses" || h.status === status;
      return matchesQuery && matchesMode && matchesStatus;
    });
  }, [hospitals, search, mode, status]);

  useEffect(() => {
    setPage(1);
  }, [search, mode, status]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageRows = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
  const rangeStart = filtered.length === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1;
  const rangeEnd = Math.min(currentPage * PAGE_SIZE, filtered.length);

  function clearFilters() {
    setSearch("");
    setMode("All");
    setStatus("All Statuses");
  }

  return (
    <AppShell active="Partners">
      <div className={styles.titleRow}>
        <h1 className={styles.title}>Hospital Partner List</h1>
        <Button variant="primary">+ Add New Hospital</Button>
      </div>

      <div className={styles.filtersRow}>
        <input
          className={styles.searchInput}
          type="text"
          placeholder="Search hospitals, cities..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className={styles.segmented}>
          {MODES.map((m) => (
            <button
              key={m}
              type="button"
              className={m === mode ? `${styles.segmentBtn} ${styles.segmentBtnActive}` : styles.segmentBtn}
              onClick={() => setMode(m)}
            >
              {m}
            </button>
          ))}
        </div>
        <select
          className={styles.statusSelect}
          value={status}
          onChange={(e) => setStatus(e.target.value as HospitalStatus | "All Statuses")}
        >
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <Button variant="secondary" className={styles.exportBtn} onClick={() => exportCsv(filtered)}>
          Export CSV
        </Button>
      </div>

      {loading ? (
        <div className={styles.tableWrap} style={{ padding: "8px 20px" }}>
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className={styles.skeletonRow} />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>
            <div className={styles.emptyIconDot} />
          </div>
          <span className={styles.emptyText}>No hospitals match your search.</span>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              clearFilters();
            }}
          >
            Clear filters
          </a>
        </div>
      ) : (
        <>
          <div className={styles.tableWrap}>
            <div className={styles.headerRow}>
              <span className={styles.headerCell}>Hospital Name</span>
              <span className={styles.headerCell}>City</span>
              <span className={styles.headerCell}>Mode</span>
              <span className={styles.headerCell}>Status</span>
              <span className={styles.headerCell}>Doctors</span>
              <span className={styles.headerCell}>Monthly Revenue</span>
              <span className={styles.headerCell}>Commission</span>
            </div>
            {pageRows.map((h) => (
              <button
                key={h.id}
                type="button"
                className={styles.bodyRow}
                onClick={() => navigate(`/partners/${h.id}`)}
              >
                <span className={styles.cellName}>{h.name}</span>
                <span className={styles.cell}>{h.city}</span>
                <span className={styles.cell}>{h.mode}</span>
                <StatusBadge status={h.status} />
                <span className={styles.cell}>{h.doctors}</span>
                <span className={styles.cell}>{formatInr(h.monthlyRevenue)}</span>
                <span className={styles.cell}>{h.status === "Suspended" ? "—" : `${h.commissionRate}%`}</span>
              </button>
            ))}
          </div>

          <div className={styles.footerRow}>
            <span className={styles.footerText}>
              Showing {rangeStart}–{rangeEnd} of {filtered.length} hospitals
            </span>
            <div className={styles.pageControls}>
              <button
                type="button"
                className={styles.pageBtn}
                disabled={currentPage === 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
              >
                Previous
              </button>
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  type="button"
                  className={i + 1 === currentPage ? `${styles.pageBtn} ${styles.pageBtnActive}` : styles.pageBtn}
                  onClick={() => setPage(i + 1)}
                >
                  {i + 1}
                </button>
              ))}
              <button
                type="button"
                className={styles.pageBtn}
                disabled={currentPage === totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              >
                Next
              </button>
            </div>
          </div>
        </>
      )}
    </AppShell>
  );
}
