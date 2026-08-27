import type { ApiKey, FeatureFlag, Integration, TeamMember, TeamRole } from "../types/settings";

export function buildInitialTeamMembers(): TeamMember[] {
  return [
    { id: "team-1", name: "Priya Shah", email: "priya@openque.in", role: "Founder", lastActive: "Active now", status: "Active" },
    { id: "team-2", name: "Arjun Mehta", email: "arjun@openque.in", role: "Co-Founder", lastActive: "2 hours ago", status: "Active" },
    { id: "team-3", name: "Divya Rao", email: "divya@openque.in", role: "Ops Admin", lastActive: "1 day ago", status: "Active" },
    { id: "team-4", name: "Kabir Anand", email: "kabir@openque.in", role: "Ops Admin", lastActive: "Never signed in", status: "Invited" },
  ];
}

export function buildInitialApiKeys(): ApiKey[] {
  return [
    { id: "key-1", label: "Production — Partner Sync", maskedKey: "oq_live_••••••••••••7f2a", createdAt: "12 Feb 2026", lastUsed: "5 min ago", status: "Active" },
    { id: "key-2", label: "Staging — Internal Tools", maskedKey: "oq_test_••••••••••••c91d", createdAt: "03 May 2026", lastUsed: "3 days ago", status: "Active" },
    { id: "key-3", label: "Legacy Export Script", maskedKey: "oq_live_••••••••••••44b0", createdAt: "18 Nov 2025", lastUsed: "Never", status: "Revoked" },
  ];
}

export function buildInitialFeatureFlags(): FeatureFlag[] {
  return [
    { id: "flag-1", name: "Real-time queue WebSocket v2", description: "Rolls out the rebuilt WebSocket transport for live queue updates.", enabled: true },
    { id: "flag-2", name: "Commission audit export", description: "Lets hospital admins export their own commission audit history as CSV.", enabled: true },
    { id: "flag-3", name: "Founder dashboard live tick", description: "Auto-refreshes platform monitor stats every few seconds instead of on page load.", enabled: true },
    { id: "flag-4", name: "Multi-branch hospital accounts", description: "Allows one hospital group to manage several branches under a single login.", enabled: false },
    { id: "flag-5", name: "Doctor self-service roster edits", description: "Lets doctors update their own specialty and availability without founder approval.", enabled: false },
  ];
}

export function buildInitialIntegrations(): Integration[] {
  return [
    { id: "int-1", name: "Appointment Reminders", provider: "WhatsApp Business API", status: "Connected", enabled: true },
    { id: "int-2", name: "OTP & Alerts", provider: "SMS Gateway — Twilio", status: "Connected", enabled: true },
    { id: "int-3", name: "Invoices & Receipts", provider: "Email — Transactional (Postmark)", status: "Connected", enabled: true },
    { id: "int-4", name: "Founder Incident Alerts", provider: "Slack Webhook", status: "Not Connected", enabled: false },
  ];
}

export function generateApiKey(label: string): ApiKey {
  const raw = Math.random().toString(36).slice(2, 10);
  return {
    id: `key-${Date.now()}`,
    label,
    maskedKey: `oq_live_••••••••••••${raw.slice(-4)}`,
    createdAt: "Just now",
    lastUsed: "Never",
    status: "Active",
  };
}

export function inviteTeamMember(name: string, email: string, role: TeamRole): TeamMember {
  return {
    id: `team-${Date.now()}`,
    name,
    email,
    role,
    lastActive: "Never signed in",
    status: "Invited",
  };
}
