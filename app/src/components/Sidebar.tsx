import { useNavigate } from "react-router-dom";
import { Logo } from "./Logo";
import styles from "./Sidebar.module.css";

const NAV_ITEMS: { label: string; path: string }[] = [
  { label: "Dashboard", path: "/dashboard" },
  { label: "Metrics", path: "/metrics" },
  { label: "Partners", path: "/partners" },
  { label: "Pipeline", path: "/pipeline" },
  { label: "Revenue", path: "/revenue" },
  { label: "Support", path: "/support" },
  { label: "Compliance", path: "/compliance" },
  { label: "Settings", path: "/settings" },
];

export function Sidebar({ active = "Partners" }: { active?: string }) {
  const navigate = useNavigate();

  return (
    <div className={styles.sidebar}>
      <div className={styles.brand}>
        <Logo size={24} wordmarkSize={16} />
        <span className={styles.brandSubtitle}>FOUNDER COMMAND</span>
      </div>
      <nav className={styles.nav}>
        {NAV_ITEMS.map((item) => (
          <button
            key={item.label}
            type="button"
            className={item.label === active ? `${styles.navItem} ${styles.navItemActive}` : styles.navItem}
            onClick={() => navigate(item.path)}
          >
            {item.label}
          </button>
        ))}
      </nav>
    </div>
  );
}
