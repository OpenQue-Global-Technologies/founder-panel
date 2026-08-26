import { Logo } from "./Logo";
import styles from "./Sidebar.module.css";

const NAV_ITEMS = ["Dashboard", "Metrics", "Partners", "Pipeline", "Revenue", "Support", "Compliance", "Settings"];

export function Sidebar({ active = "Partners" }: { active?: string }) {
  return (
    <div className={styles.sidebar}>
      <div className={styles.brand}>
        <Logo size={24} wordmarkSize={16} />
        <span className={styles.brandSubtitle}>FOUNDER COMMAND</span>
      </div>
      <nav className={styles.nav}>
        {NAV_ITEMS.map((item) => (
          <button
            key={item}
            type="button"
            className={item === active ? `${styles.navItem} ${styles.navItemActive}` : styles.navItem}
          >
            {item}
          </button>
        ))}
      </nav>
    </div>
  );
}
