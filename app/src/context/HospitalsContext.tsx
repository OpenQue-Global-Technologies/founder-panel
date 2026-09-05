import { createContext, useContext, useState, useCallback, useMemo, type ReactNode } from "react";
import type { Hospital } from "../types/hospital";
import { buildInitialHospitals } from "../data/hospitals";

interface HospitalsContextValue {
  hospitals: Hospital[];
  getHospital: (id: string) => Hospital | undefined;
  addHospital: (hospital: Hospital) => void;
  toggleSystemIntegration: (id: string) => void;
  suspendHospital: (id: string) => void;
  updateCommission: (
    id: string,
    input: { newRate: number; effectiveDate: string; reason: string; changedBy: string }
  ) => void;
}

const HospitalsContext = createContext<HospitalsContextValue | null>(null);

export function HospitalsProvider({ children }: { children: ReactNode }) {
  const [hospitals, setHospitals] = useState<Hospital[]>(() => buildInitialHospitals());

  const getHospital = useCallback((id: string) => hospitals.find((h) => h.id === id), [hospitals]);

  const addHospital = useCallback((hospital: Hospital) => {
    setHospitals((prev) => [hospital, ...prev]);
  }, []);

  const toggleSystemIntegration = useCallback((id: string) => {
    setHospitals((prev) => prev.map((h) => (h.id === id ? { ...h, systemIntegration: !h.systemIntegration } : h)));
  }, []);

  const suspendHospital = useCallback((id: string) => {
    setHospitals((prev) => prev.map((h) => (h.id === id ? { ...h, status: "Suspended", systemIntegration: false } : h)));
  }, []);

  const updateCommission = useCallback(
    (id: string, input: { newRate: number; effectiveDate: string; reason: string; changedBy: string }) => {
      setHospitals((prev) =>
        prev.map((h) => {
          if (h.id !== id) return h;
          return {
            ...h,
            commissionRate: input.newRate,
            commissionAudit: [
              { date: input.effectiveDate, oldRate: h.commissionRate, newRate: input.newRate, changedBy: input.changedBy },
              ...h.commissionAudit,
            ],
          };
        })
      );
    },
    []
  );

  const value = useMemo(
    () => ({ hospitals, getHospital, addHospital, toggleSystemIntegration, suspendHospital, updateCommission }),
    [hospitals, getHospital, addHospital, toggleSystemIntegration, suspendHospital, updateCommission]
  );

  return <HospitalsContext.Provider value={value}>{children}</HospitalsContext.Provider>;
}

export function useHospitals() {
  const ctx = useContext(HospitalsContext);
  if (!ctx) throw new Error("useHospitals must be used within HospitalsProvider");
  return ctx;
}
