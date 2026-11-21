"use client";

import { useRestaurant } from "@/entities/restaurant";
import { AppointmentForm, type AppointmentConfig } from "@/features/appointment";

export function Reservation() {
  const r = useRestaurant();
  const config: AppointmentConfig = {
    businessName: r.fullName,
    currency: r.currency,
    contacts: r.contacts,
    guests: { min: 1, max: 20, initial: 2 },
    hours: { open: 12 * 60, close: 23 * 60, step: 30 },
  };

  return (
    <section id="appointment" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <h2 className="font-site text-[clamp(2.2rem,5vw,4rem)] leading-none">{r.reservation.title}</h2>
        <p className="mt-4 max-w-xl text-site-muted">{r.reservation.lead}</p>
        <div className="mt-12">
          <AppointmentForm config={config} />
        </div>
        <p className="mt-6 text-sm text-site-muted">{r.reservation.banquet}</p>
      </div>
    </section>
  );
}
