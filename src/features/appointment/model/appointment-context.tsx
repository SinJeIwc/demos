"use client";

import { useLenis } from "lenis/react";
import { createContext, useCallback, useContext, useState, type ReactNode } from "react";

export const APPOINTMENT_ANCHOR = "#appointment";

type Ctx = {
  serviceId: string | null;
  staffId: string | null;
  setServiceId: (id: string | null) => void;
  setStaffId: (id: string | null) => void;
  /** Предвыбрать услугу/специалиста (например, с карточки врача) и прокрутить к форме */
  openAppointment: (preset?: { serviceId?: string; staffId?: string }) => void;
  scrollTo: (target: string) => void;
};

const AppointmentContext = createContext<Ctx | null>(null);

export function AppointmentProvider({ children }: { children: ReactNode }) {
  const [serviceId, setServiceId] = useState<string | null>(null);
  const [staffId, setStaffId] = useState<string | null>(null);
  const lenis = useLenis();

  const scrollTo = useCallback(
    (target: string) => {
      if (lenis) lenis.scrollTo(target, { offset: -72, duration: 1.3 });
      else document.querySelector(target)?.scrollIntoView({ behavior: "smooth" });
    },
    [lenis],
  );

  const openAppointment = useCallback(
    (preset?: { serviceId?: string; staffId?: string }) => {
      if (preset?.serviceId) setServiceId(preset.serviceId);
      if (preset?.staffId) setStaffId(preset.staffId);
      scrollTo(APPOINTMENT_ANCHOR);
    },
    [scrollTo],
  );

  return (
    <AppointmentContext.Provider value={{ serviceId, staffId, setServiceId, setStaffId, openAppointment, scrollTo }}>
      {children}
    </AppointmentContext.Provider>
  );
}

export function useAppointment() {
  const ctx = useContext(AppointmentContext);
  if (!ctx) throw new Error("useAppointment must be used inside <AppointmentProvider>");
  return ctx;
}
