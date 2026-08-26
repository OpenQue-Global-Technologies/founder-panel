import { useState, type FormEvent } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Logo } from "../components/Logo";
import { TextField } from "../components/FormField";
import { Toggle } from "../components/Toggle";
import { Button } from "../components/Button";
import { useAuth } from "../context/AuthContext";
import styles from "./LoginPage.module.css";

export function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [enforceKey, setEnforceKey] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const from = (location.state as { from?: string } | null)?.from ?? "/partners";

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Incorrect email or password.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.brandBlock}>
          <Logo size={40} showWordmark={false} />
          <span className={styles.wordmark}>OpenQue</span>
          <span className={styles.subtitle}>Internal Founder Command Panel</span>
          <span className={styles.badge}>FOUNDER ACCESS ONLY</span>
          <div className={styles.divider} />
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <TextField
            label="Founder Email"
            type="text"
            placeholder="founder@openque.in"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            autoComplete="username"
          />
          <TextField
            label="Credentials"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
            autoComplete="current-password"
            errorMessage={error ?? undefined}
            rightSlot={
              <button
                type="button"
                className={styles.eyeToggle}
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                <span className={styles.eyeDot} />
              </button>
            }
          />
          <Toggle
            checked={enforceKey}
            onChange={setEnforceKey}
            label="Enforce Hardware Security Key"
          />
          <Button type="submit" loading={loading} style={{ marginTop: 4 }}>
            Initialize Root Access
          </Button>
        </form>
      </div>
      <div className={styles.footer}>
        <div className={styles.statusDot} />
        <span className={styles.statusText}>Your IP is whitelisted (Session Verified)</span>
      </div>
    </div>
  );
}
