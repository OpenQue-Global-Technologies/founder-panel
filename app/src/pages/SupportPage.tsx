import { useMemo, useState } from "react";
import { AppShell } from "../components/AppShell";
import { StatusBadge } from "../components/StatusBadge";
import { Button } from "../components/Button";
import { TextAreaField } from "../components/FormField";
import { useAuth } from "../context/AuthContext";
import { buildInitialTickets } from "../data/support";
import type { Ticket, TicketStatus } from "../types/support";
import gridStyles from "../components/DataGrid.module.css";
import styles from "./SupportPage.module.css";

const TICKET_STATUSES: TicketStatus[] = ["Open", "In Progress", "Resolved", "Closed"];
const STATUS_FILTERS: (TicketStatus | "All Statuses")[] = ["All Statuses", ...TICKET_STATUSES];
type QueueTab = "All Tickets" | "Payments";

export function SupportPage() {
  const { founder } = useAuth();
  const [tickets, setTickets] = useState<Ticket[]>(buildInitialTickets);
  const [tab, setTab] = useState<QueueTab>("All Tickets");
  const [statusFilter, setStatusFilter] = useState<TicketStatus | "All Statuses">("All Statuses");
  const [selectedId, setSelectedId] = useState<string | null>(tickets[0]?.id ?? null);
  const [reply, setReply] = useState("");

  const filteredTickets = useMemo(() => {
    return tickets.filter((t) => {
      const matchesTab = tab === "All Tickets" || t.category === "Payments";
      const matchesStatus = statusFilter === "All Statuses" || t.status === statusFilter;
      return matchesTab && matchesStatus;
    });
  }, [tickets, tab, statusFilter]);

  const selectedTicket = tickets.find((t) => t.id === selectedId) ?? null;

  function updateStatus(id: string, status: TicketStatus) {
    setTickets((prev) => prev.map((t) => (t.id === id ? { ...t, status } : t)));
  }

  function sendReply() {
    if (!selectedTicket || !reply.trim()) return;
    setTickets((prev) =>
      prev.map((t) =>
        t.id === selectedTicket.id
          ? {
              ...t,
              status: t.status === "Open" ? "In Progress" : t.status,
              messages: [
                ...t.messages,
                {
                  id: `m${t.messages.length + 1}`,
                  author: founder?.name ?? "Founder Team",
                  role: "Founder Team",
                  body: reply.trim(),
                  timestamp: "Just now",
                },
              ],
            }
          : t
      )
    );
    setReply("");
  }

  return (
    <AppShell active="Support">
      <h1 className={styles.title}>Dispute Queue</h1>

      <div className={styles.controlsRow}>
        <div className={styles.tabs}>
          {(["All Tickets", "Payments"] as QueueTab[]).map((t) => (
            <button
              key={t}
              type="button"
              className={t === tab ? `${styles.tabBtn} ${styles.tabBtnActive}` : styles.tabBtn}
              onClick={() => setTab(t)}
            >
              {t}
            </button>
          ))}
        </div>
        <select
          className={styles.statusSelect}
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as TicketStatus | "All Statuses")}
        >
          {STATUS_FILTERS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.layout}>
        <div className={gridStyles.tableWrap}>
          <div className={styles.ticketList}>
            {filteredTickets.length === 0 ? (
              <div className={gridStyles.emptyRow}>No tickets match this filter.</div>
            ) : (
              filteredTickets.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  className={
                    t.id === selectedId ? `${styles.ticketRow} ${styles.ticketRowSelected}` : styles.ticketRow
                  }
                  onClick={() => setSelectedId(t.id)}
                >
                  <div className={styles.ticketTopLine}>
                    <span className={styles.ticketId}>{t.id}</span>
                    <StatusBadge status={t.status} />
                  </div>
                  <span className={styles.ticketSubject}>{t.subject}</span>
                  <span className={styles.ticketMeta}>
                    {t.partnerName} · {t.category}
                  </span>
                  <span className={styles.ticketMeta}>Created {t.createdAt}</span>
                </button>
              ))
            )}
          </div>
        </div>

        <div className={styles.detailPanel}>
          {!selectedTicket ? (
            <div className={styles.emptyState}>Select a ticket to view the conversation.</div>
          ) : (
            <>
              <div className={styles.detailHeader}>
                <div>
                  <div className={styles.detailSubject}>{selectedTicket.subject}</div>
                  <span className={styles.detailMeta}>
                    {selectedTicket.id} · {selectedTicket.partnerName} · {selectedTicket.category}
                  </span>
                </div>
                <div className={styles.statusControl}>
                  <span className={styles.detailMeta}>Status</span>
                  <select
                    className={styles.statusSelect}
                    style={{ marginLeft: 0 }}
                    value={selectedTicket.status}
                    onChange={(e) => updateStatus(selectedTicket.id, e.target.value as TicketStatus)}
                  >
                    {TICKET_STATUSES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className={styles.thread}>
                {selectedTicket.messages.map((m) => (
                  <div
                    key={m.id}
                    className={
                      m.role === "Partner" ? `${styles.message} ${styles.messagePartner}` : `${styles.message} ${styles.messageFounder}`
                    }
                  >
                    <span className={styles.messageAuthor}>{m.author}</span>
                    <span className={styles.messageBody}>{m.body}</span>
                    <span className={styles.messageTimestamp}>{m.timestamp}</span>
                  </div>
                ))}
              </div>

              <div className={styles.replyRow}>
                <TextAreaField
                  rows={3}
                  placeholder="Write a reply to the partner..."
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                />
                <Button variant="primary" style={{ alignSelf: "flex-end" }} onClick={sendReply} disabled={!reply.trim()}>
                  Send Reply
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </AppShell>
  );
}
