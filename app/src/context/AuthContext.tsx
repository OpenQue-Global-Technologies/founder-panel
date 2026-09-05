import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

interface Founder {
  name: string;
  initials: string;
  email: string;
  role: string;
}

interface AuthContextValue {
  founder: Founder | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const SESSION_KEY = "openque_founder_session";

const VALID_EMAIL = "founder@openque.in";
const VALID_PASSWORD = "RootAccess#2026";

const FOUNDER: Founder = { name: "Priya Shah", initials: "PS", email: VALID_EMAIL, role: "Founder" };

const AuthContext = createContext<AuthContextValue | null>(null);

function readSession(): Founder | null {
  try {
    return sessionStorage.getItem(SESSION_KEY) ? FOUNDER : null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [founder, setFounder] = useState<Founder | null>(() => readSession());

  const login = useCallback(async (email: string, password: string) => {
    await new Promise((resolve) => setTimeout(resolve, 900));
    if (email.trim().toLowerCase() !== VALID_EMAIL || password !== VALID_PASSWORD) {
      throw new Error("Incorrect email or password.");
    }
    sessionStorage.setItem(SESSION_KEY, "1");
    setFounder(FOUNDER);
  }, []);

  const logout = useCallback(() => {
    sessionStorage.removeItem(SESSION_KEY);
    setFounder(null);
  }, []);

  return <AuthContext.Provider value={{ founder, login, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
