import { useState } from "react";
import { AppShell } from "../components/AppShell";
import { Panel, PanelLinkButton } from "../components/Panel";
import { Button } from "../components/Button";
import { StatusBadge } from "../components/StatusBadge";
import { Toggle } from "../components/Toggle";
import { InviteTeamMemberModal } from "../components/InviteTeamMemberModal";
import {
  buildInitialApiKeys,
  buildInitialFeatureFlags,
  buildInitialIntegrations,
  buildInitialTeamMembers,
  generateApiKey,
  inviteTeamMember,
} from "../data/settings";
import gridStyles from "../components/DataGrid.module.css";
import styles from "./SettingsPage.module.css";

export function SettingsPage() {
  const [team, setTeam] = useState(buildInitialTeamMembers);
  const [apiKeys, setApiKeys] = useState(buildInitialApiKeys);
  const [flags, setFlags] = useState(buildInitialFeatureFlags);
  const [integrations, setIntegrations] = useState(buildInitialIntegrations);
  const [inviteOpen, setInviteOpen] = useState(false);

  function removeTeamMember(id: string) {
    setTeam((prev) => prev.filter((m) => m.id !== id));
  }

  function toggleFlag(id: string) {
    setFlags((prev) => prev.map((f) => (f.id === id ? { ...f, enabled: !f.enabled } : f)));
  }

  function toggleIntegration(id: string) {
    setIntegrations((prev) => prev.map((i) => (i.id === id ? { ...i, enabled: !i.enabled } : i)));
  }

  function revokeKey(id: string) {
    setApiKeys((prev) => prev.map((k) => (k.id === id ? { ...k, status: "Revoked" } : k)));
  }

  function generateKey() {
    setApiKeys((prev) => [generateApiKey(`API Key ${prev.length + 1}`), ...prev]);
  }

  return (
    <AppShell active="Settings">
      <h1 className={styles.title}>Founder Settings</h1>

      <Panel
        title="Team Management"
        subtitle="Founder logins with access to this command panel"
        action={<PanelLinkButton onClick={() => setInviteOpen(true)}>+ Add Founder Login</PanelLinkButton>}
      >
        <div className={gridStyles.tableWrap}>
          <div className={`${gridStyles.headerRow} ${styles.teamCols}`}>
            <span className={gridStyles.headerCell}>Name</span>
            <span className={gridStyles.headerCell}>Email</span>
            <span className={gridStyles.headerCell}>Role</span>
            <span className={gridStyles.headerCell}>Last Active</span>
            <span className={gridStyles.headerCell}>Status</span>
            <span className={gridStyles.headerCell}></span>
          </div>
          {team.map((member) => (
            <div key={member.id} className={`${gridStyles.bodyRow} ${styles.teamCols}`}>
              <span className={gridStyles.cellStrong}>{member.name}</span>
              <span className={gridStyles.cellMuted}>{member.email}</span>
              <span className={gridStyles.cell}>{member.role}</span>
              <span className={gridStyles.cellMuted}>{member.lastActive}</span>
              <StatusBadge status={member.status} />
              <button
                type="button"
                className={styles.actionBtn}
                disabled={member.role === "Founder"}
                onClick={() => removeTeamMember(member.id)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </Panel>

      <Panel
        title="API Key Management"
        subtitle="Keys for external integrations against the OpenQue platform API"
        action={
          <Button variant="secondary" onClick={generateKey}>
            + Generate New Key
          </Button>
        }
      >
        <div className={gridStyles.tableWrap}>
          <div className={`${gridStyles.headerRow} ${styles.apiKeyCols}`}>
            <span className={gridStyles.headerCell}>Label</span>
            <span className={gridStyles.headerCell}>Key</span>
            <span className={gridStyles.headerCell}>Created</span>
            <span className={gridStyles.headerCell}>Last Used</span>
            <span className={gridStyles.headerCell}>Status</span>
            <span className={gridStyles.headerCell}></span>
          </div>
          {apiKeys.map((key) => (
            <div key={key.id} className={`${gridStyles.bodyRow} ${styles.apiKeyCols}`}>
              <span className={gridStyles.cellStrong}>{key.label}</span>
              <span className={styles.keyCell}>{key.maskedKey}</span>
              <span className={gridStyles.cellMuted}>{key.createdAt}</span>
              <span className={gridStyles.cellMuted}>{key.lastUsed}</span>
              <StatusBadge status={key.status} />
              <button
                type="button"
                className={styles.actionBtn}
                disabled={key.status === "Revoked"}
                onClick={() => revokeKey(key.id)}
              >
                Revoke
              </button>
            </div>
          ))}
        </div>
      </Panel>

      <Panel title="Feature Flags" subtitle="Platform-wide toggles for in-progress features">
        <div>
          {flags.map((flag) => (
            <div key={flag.id} className={styles.flagRow}>
              <div className={styles.flagText}>
                <span className={styles.flagName}>{flag.name}</span>
                <span className={styles.flagDescription}>{flag.description}</span>
              </div>
              <Toggle checked={flag.enabled} onChange={() => toggleFlag(flag.id)} />
            </div>
          ))}
        </div>
      </Panel>

      <Panel title="Integration Settings" subtitle="SMS, WhatsApp, email, and alerting providers">
        <div className={gridStyles.tableWrap}>
          <div className={`${gridStyles.headerRow} ${styles.integrationCols}`}>
            <span className={gridStyles.headerCell}>Purpose</span>
            <span className={gridStyles.headerCell}>Provider</span>
            <span className={gridStyles.headerCell}>Status</span>
            <span className={gridStyles.headerCell}>Enabled</span>
          </div>
          {integrations.map((integration) => (
            <div key={integration.id} className={`${gridStyles.bodyRow} ${styles.integrationCols}`}>
              <span className={gridStyles.cellStrong}>{integration.name}</span>
              <span className={gridStyles.cell}>{integration.provider}</span>
              <StatusBadge status={integration.status} />
              <Toggle checked={integration.enabled} onChange={() => toggleIntegration(integration.id)} />
            </div>
          ))}
        </div>
      </Panel>

      {inviteOpen && (
        <InviteTeamMemberModal
          onClose={() => setInviteOpen(false)}
          onInvite={(input) => {
            setTeam((prev) => [...prev, inviteTeamMember(input.name, input.email, input.role)]);
            setInviteOpen(false);
          }}
        />
      )}
    </AppShell>
  );
}
