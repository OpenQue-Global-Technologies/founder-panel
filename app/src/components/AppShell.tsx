import type { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { TopBar } from "./TopBar";

export function AppShell({ active, children }: { active: string; children: ReactNode }) {
  return (
    <div style={{ minHeight: "100vh", background: "var(--color-background)", display: "flex" }}>
      <Sidebar active={active} />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        <TopBar />
        <div style={{ padding: 32, display: "flex", flexDirection: "column", gap: 24 }}>{children}</div>
      </div>
    </div>
  );
}
