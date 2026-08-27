import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppShell } from "../components/AppShell";
import { Button } from "../components/Button";
import { AddLeadModal } from "../components/AddLeadModal";
import { useHospitals } from "../context/HospitalsContext";
import { PIPELINE_STAGES, buildInitialLeads, createLead } from "../data/pipeline";
import { formatInr } from "../data/hospitals";
import type { Lead } from "../types/pipeline";
import styles from "./PipelinePage.module.css";

export function PipelinePage() {
  const { hospitals } = useHospitals();
  const navigate = useNavigate();
  const [leads, setLeads] = useState<Lead[]>(() => buildInitialLeads(hospitals));
  const [modalOpen, setModalOpen] = useState(false);

  function moveLead(id: string, direction: -1 | 1) {
    setLeads((prev) =>
      prev.map((lead) => {
        if (lead.id !== id) return lead;
        const currentIndex = PIPELINE_STAGES.indexOf(lead.stage);
        const nextIndex = Math.min(Math.max(currentIndex + direction, 0), PIPELINE_STAGES.length - 1);
        return { ...lead, stage: PIPELINE_STAGES[nextIndex], lastActivity: "Just now" };
      })
    );
  }

  function handleCreateLead(input: { hospitalName: string; city: string; owner: string; estMonthlyRevenue?: number }) {
    setLeads((prev) => [createLead(input), ...prev]);
    setModalOpen(false);
  }

  return (
    <AppShell active="Pipeline">
      <div className={styles.titleRow}>
        <h1 className={styles.title}>Hospital Onboarding Tracker</h1>
        <Button variant="primary" onClick={() => setModalOpen(true)}>
          + Add New Lead
        </Button>
      </div>

      <div className={styles.board}>
        {PIPELINE_STAGES.map((stage) => {
          const stageLeads = leads.filter((l) => l.stage === stage);
          return (
            <div key={stage} className={styles.column}>
              <div className={styles.columnHeader}>
                <span className={styles.columnTitle}>{stage}</span>
                <span className={styles.columnCount}>{stageLeads.length}</span>
              </div>
              <div className={styles.columnBody}>
                {stageLeads.map((lead) => {
                  const stageIndex = PIPELINE_STAGES.indexOf(lead.stage);
                  return (
                    <div
                      key={lead.id}
                      className={styles.card}
                      onClick={() => lead.hospitalId && navigate(`/partners/${lead.hospitalId}`)}
                      style={{ cursor: lead.hospitalId ? "pointer" : "default" }}
                    >
                      <span className={styles.cardName}>{lead.hospitalName}</span>
                      <span className={styles.cardMeta}>
                        {lead.city} · {lead.owner}
                      </span>
                      <span className={styles.cardMeta}>{lead.lastActivity}</span>
                      <div className={styles.cardFooter}>
                        <span className={styles.cardRevenue}>
                          {lead.estMonthlyRevenue ? formatInr(lead.estMonthlyRevenue) : "—"}
                        </span>
                        {!lead.hospitalId && (
                          <div className={styles.cardMoveBtns} onClick={(e) => e.stopPropagation()}>
                            <button
                              type="button"
                              className={styles.moveBtn}
                              disabled={stageIndex === 0}
                              onClick={() => moveLead(lead.id, -1)}
                              aria-label="Move to previous stage"
                            >
                              ←
                            </button>
                            <button
                              type="button"
                              className={styles.moveBtn}
                              disabled={stageIndex === PIPELINE_STAGES.length - 1}
                              onClick={() => moveLead(lead.id, 1)}
                              aria-label="Move to next stage"
                            >
                              →
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {modalOpen && <AddLeadModal onClose={() => setModalOpen(false)} onCreate={handleCreateLead} />}
    </AppShell>
  );
}
