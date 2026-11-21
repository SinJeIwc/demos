"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useBeauty } from "@/entities/beauty";
import { useAppointment } from "@/features/appointment";

/** Мастера в арках: фото — их работа, по клику запись к конкретному мастеру */
export function Masters() {
  const { masters } = useBeauty();
  const { openAppointment } = useAppointment();

  return (
    <section id="masters" className="bg-site-ink py-24 text-site-bg sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <h2 className="font-site text-[clamp(2.6rem,6vw,5rem)] leading-none">{masters.title}</h2>
        <ul className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {masters.items.map((m, i) => (
            <motion.li
              key={m.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
              className="group"
            >
              <div className="relative aspect-[3/4] overflow-hidden rounded-t-full rounded-b-3xl">
                <Image src={m.image} alt={m.role} fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover transition-transform duration-1000 group-hover:scale-110" />
                <button
                  onClick={() => openAppointment({ staffId: m.id })}
                  className="absolute inset-x-4 bottom-4 translate-y-3 rounded-full bg-site-alt py-3 text-sm text-site-ink opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 focus-visible:translate-y-0 focus-visible:opacity-100"
                >
                  {masters.book}
                </button>
              </div>
              <h3 className="mt-5 font-site text-3xl">{m.name}</h3>
              <p className="mt-1 opacity-60">{m.role}</p>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
