"use client";

import { motion } from "motion/react";
import { useClinic } from "@/entities/clinic";
import { useAppointment } from "@/features/appointment";

/** Врачи. Без стоковых портретов: монограмма честнее, чем чужое лицо на демо */
export function Doctors() {
  const { doctors } = useClinic();
  const { openAppointment } = useAppointment();

  return (
    <section id="doctors" className="bg-site-surface py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <h2 className="font-site text-[clamp(2.2rem,5vw,3.75rem)] font-semibold leading-none tracking-[-0.03em]">{doctors.title}</h2>
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {doctors.items.map((d, i) => (
            <motion.li
              key={d.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ delay: i * 0.08, duration: 0.7 }}
              className="group flex flex-col rounded-[28px] border border-site-line bg-site-bg p-6"
            >
              <div className="relative grid aspect-square place-items-center overflow-hidden rounded-[22px] bg-site-ink text-site-bg">
                <span className="font-site text-6xl font-semibold tracking-tight transition-transform duration-700 group-hover:scale-110">{d.initials}</span>
                <span className="absolute bottom-4 right-4 rounded-full bg-site-alt px-3 py-1 text-xs font-medium text-site-ink">
                  {d.years} {doctors.years}
                </span>
              </div>
              <h3 className="mt-5 font-site text-xl font-semibold">{d.name}</h3>
              <p className="mt-1 flex-1 text-site-muted">{d.role}</p>
              <button
                onClick={() => openAppointment({ staffId: d.id })}
                className="mt-5 rounded-full border border-site-line py-3 text-sm transition-colors hover:border-site-ink hover:bg-site-ink hover:text-site-bg"
              >
                {doctors.book}
              </button>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
