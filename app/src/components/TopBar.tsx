import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useHospitals } from "../context/HospitalsContext";
import { buildDisruptions } from "../data/dashboard";
import styles from "./TopBar.module.css";

type OpenMenu = "notifications" | "profile" | null;

export function TopBar() {
  const navigate = useNavigate();
  const { founder, logout } = useAuth();
  const { hospitals } = useHospitals();
  const [openMenu, setOpenMenu] = useState<OpenMenu>(null);
  const [readIds, setReadIds] = useState<Set<string>>(() => new Set());
  const containerRef = useRef<HTMLDivElement>(null);

  const disruptions = buildDisruptions(hospitals);
  const unreadCount = disruptions.filter((d) => !readIds.has(d.id)).length;

  useEffect(() => {
    if (!openMenu) return;
    function onMouseDown(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpenMenu(null);
      }
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpenMenu(null);
    }
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [openMenu]);

  function toggleMenu(menu: Exclude<OpenMenu, null>) {
    setOpenMenu((prev) => (prev === menu ? null : menu));
  }

  function markAllRead() {
    setReadIds(new Set(disruptions.map((d) => d.id)));
  }

  function handleLogout() {
    setOpenMenu(null);
    logout();
    navigate("/login");
  }

  return (
    <div ref={containerRef} className={styles.topBar}>
      <div className={styles.menuWrap}>
        <button
          type="button"
          className={styles.iconBtn}
          aria-label="Notifications"
          onClick={() => toggleMenu("notifications")}
        >
          <div className={styles.bellIcon} />
          {unreadCount > 0 && <div className={styles.unreadDot} />}
        </button>
        {openMenu === "notifications" && (
          <div className={`${styles.dropdown} ${styles.notificationsDropdown}`}>
            <div className={styles.dropdownHeader}>
              <span className={styles.dropdownTitle}>Notifications</span>
              <button
                type="button"
                className={styles.markReadLink}
                onClick={markAllRead}
                disabled={unreadCount === 0}
              >
                Mark all as read
              </button>
            </div>
            {disruptions.length === 0 ? (
              <div className={styles.dropdownEmpty}>No active disruptions.</div>
            ) : (
              <div className={styles.notificationList}>
                {disruptions.map((d) => {
                  const isRead = readIds.has(d.id);
                  return (
                    <div key={d.id} className={styles.notificationRow}>
                      <div className={isRead ? styles.notifDotRead : styles.notifDot} />
                      <div className={styles.notifBody}>
                        <span className={styles.notifMessage}>
                          <strong>{d.hospitalName}</strong> — {d.issue}
                        </span>
                        <span className={styles.notifTimestamp}>{d.since}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>

      <span className={styles.founderName}>{founder?.name ?? ""}</span>

      <div className={styles.menuWrap}>
        <button
          type="button"
          className={styles.avatarBtn}
          aria-label="Account menu"
          onClick={() => toggleMenu("profile")}
        >
          {founder?.initials ?? ""}
        </button>
        {openMenu === "profile" && (
          <div className={`${styles.dropdown} ${styles.profileDropdown}`}>
            <div className={styles.profileHeader}>
              <span className={styles.profileName}>{founder?.name}</span>
              <span className={styles.profileRole}>{founder?.role}</span>
            </div>
            <button
              type="button"
              className={styles.dropdownItem}
              onClick={() => {
                setOpenMenu(null);
                navigate("/settings");
              }}
            >
              Settings
            </button>
            <button
              type="button"
              className={`${styles.dropdownItem} ${styles.dropdownItemDanger}`}
              onClick={handleLogout}
            >
              Log out
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
