"use client";

import { useClinic } from "@/entities/clinic";
import { AppointmentForm, type AppointmentConfig } from "@/features/appointment";

export function Appointment() {
  const c = useClinic();
  const config: AppointmentConfig = {
    businessName: c.fullName,
    currency: c.currency,
    contacts: c.contacts,
    services: c.services.items.map((s) => ({ id: s.id, name: s.name, price: s.price })),
    staff: c.doctors.items.map((d) => ({ id: d.id, name: d.name, role: d.role })),
    hours: { open: 8 * 60, close: 21 * 60, step: 30 },
    labels: { staff: c.appointment.staffLabel },
  };

  return (
    <section id="appointment" className="py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <h2 className="font-site text-[clamp(2.2rem,5vw,3.75rem)] font-semibold leading-none tracking-[-0.03em]">{c.appointment.title}</h2>
        <p className="mt-4 max-w-xl text-site-muted">{c.appointment.lead}</p>
        <div className="mt-12">
          <AppointmentForm config={config} />
        </div>
      </div>
    </section>
  );
}
