"use client";

import { useLenis } from "lenis/react";
import { createContext, useCallback, useContext, useState, type ReactNode } from "react";

type BookingCtx = {
  roomId: string;
  setRoomId: (id: string) => void;
  /** Выбрать номер (если передан) и плавно прокрутить к форме брони */
  openBooking: (roomId?: string) => void;
  /** Плавная прокрутка к якорю, например "#rooms" */
  scrollTo: (target: string) => void;
};

const Ctx = createContext<BookingCtx | null>(null);

export const BOOKING_ANCHOR = "#booking";

export function BookingProvider({ initialRoomId, children }: { initialRoomId: string; children: ReactNode }) {
  const [roomId, setRoomId] = useState(initialRoomId);
  const lenis = useLenis();

  const scrollTo = useCallback(
    (target: string) => {
      if (lenis) lenis.scrollTo(target, { offset: -72, duration: 1.4 });
      else document.querySelector(target)?.scrollIntoView({ behavior: "smooth" });
    },
    [lenis],
  );

  const openBooking = useCallback(
    (id?: string) => {
      if (id) setRoomId(id);
      scrollTo(BOOKING_ANCHOR);
    },
    [scrollTo],
  );

  return <Ctx.Provider value={{ roomId, setRoomId, openBooking, scrollTo }}>{children}</Ctx.Provider>;
}

export function useBooking() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useBooking must be used inside <BookingProvider>");
  return ctx;
}
