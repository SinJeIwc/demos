"use client";

import { useBeauty } from "@/entities/beauty";
import { AppointmentForm, type AppointmentConfig } from "@/features/appointment";

export function BookingSection() {
  const b = useBeauty();
  const config: AppointmentConfig = {
    businessName: b.fullName,
    currency: b.currency,
    contacts: b.contacts,
    services: b.services.categories.flatMap((c) => c.items.map((i) => ({ id: i.id, name: i.name, price: i.price, group: c.id }))),
    staff: b.masters.items.map((m) => ({ id: m.id, name: m.name, role: m.role })),
    hours: { open: 9 * 60, close: 21 * 60, step: 30 },
    labels: { staff: b.booking.staffLabel },
  };

  return (
    <section id="appointment" className="bg-site-surface py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <h2 className="font-site text-[clamp(2.6rem,6vw,5rem)] leading-none">{b.booking.title}</h2>
        <p className="mt-4 max-w-xl text-site-muted">{b.booking.lead}</p>
        <div className="mt-12">
          <AppointmentForm config={config} />
        </div>
      </div>
    </section>
  );
}
