interface TopBarProps {
  founderName: string;
  initials: string;
  unreadNotifications?: number;
}

export function TopBar({ founderName, initials, unreadNotifications = 0 }: TopBarProps) {
  return (
    <div
      style={{
        height: 64,
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        gap: 16,
        padding: "0 32px",
        borderBottom: "1px solid var(--color-border)",
        background: "var(--color-surface)",
        flexShrink: 0,
      }}
    >
      <div
        style={{
          position: "relative",
          width: 36,
          height: 36,
          borderRadius: "50%",
          background: "var(--color-background)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
        }}
        role="button"
        aria-label="Notifications"
      >
        <div style={{ width: 14, height: 15, borderRadius: "5px 5px 2px 2px", border: "2px solid var(--color-neutral-muted)" }} />
        {unreadNotifications > 0 && (
          <div
            style={{
              position: "absolute",
              top: 5,
              right: 6,
              width: 7,
              height: 7,
              borderRadius: "50%",
              background: "var(--color-error-button)",
              border: "1.5px solid var(--color-surface)",
            }}
          />
        )}
      </div>
      <span style={{ fontSize: "var(--text-body)", fontWeight: 600, color: "var(--color-neutral-dark)" }}>
        {founderName}
      </span>
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: "50%",
          background: "var(--color-primary)",
          color: "var(--color-surface)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 13,
          fontWeight: 600,
        }}
      >
        {initials}
      </div>
    </div>
  );
}
