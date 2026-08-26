import type { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { TopBar } from "./TopBar";
import { useAuth } from "../context/AuthContext";

export function AppShell({ active, children }: { active: string; children: ReactNode }) {
  const { founder } = useAuth();
  return (
    <div style={{ minHeight: "100vh", background: "var(--color-background)", display: "flex" }}>
      <Sidebar active={active} />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        <TopBar founderName={founder?.name ?? ""} initials={founder?.initials ?? ""} unreadNotifications={3} />
        <div style={{ padding: 32, display: "flex", flexDirection: "column", gap: 24 }}>{children}</div>
      </div>
    </div>
  );
}
