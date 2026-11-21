"use client";

import { useLenis } from "lenis/react";
import { createContext, useCallback, useContext, useState, type ReactNode } from "react";

type BookingCtx = {
  roomId: string;
  setRoomId: (id: string) => void;
  /** Выбрать номер (если передан) и плавно прокрутить к форме брони */
  openBooking: (roomId?: string) => void;
  scrollTo: (target: string) => void;
};

const Ctx = createContext<BookingCtx | null>(null);

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
      scrollTo("#booking");
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

export const formatMoney = (n: number) => new Intl.NumberFormat("ru-RU").format(n);
