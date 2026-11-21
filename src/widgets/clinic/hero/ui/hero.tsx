"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useClinic } from "@/entities/clinic";
import { useAppointment } from "@/features/appointment";
import { IconArrow, IconCheck } from "@/shared/ui/icons";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const c = useClinic();
  const { openAppointment, scrollTo } = useAppointment();

  return (
    <section id="top" className="relative overflow-hidden pb-16 pt-28 sm:pt-36">
      {/* Мягкая «эмаль» за фотографией */}
      <div className="pointer-events-none absolute -right-40 top-10 size-[42rem] rounded-full bg-site-alt/35 blur-3xl" aria-hidden />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease }}
            className="font-site text-balance text-[clamp(2.6rem,6vw,4.75rem)] font-semibold leading-[1.02] tracking-[-0.035em]"
          >
            {c.hero.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.8, ease }}
            className="mt-6 max-w-lg text-lg text-site-muted"
          >
            {c.hero.lead}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.8, ease }}
            className="mt-9 flex flex-wrap gap-3"
          >
            <button
              onClick={() => openAppointment()}
              className="group inline-flex items-center gap-3 rounded-full bg-site-accent px-7 py-4 font-medium text-site-accent-ink transition-transform hover:scale-[1.02]"
            >
              {c.cta}
              <IconArrow className="size-5 transition-transform group-hover:translate-x-1" />
            </button>
            <button onClick={() => scrollTo("#services")} className="rounded-full border border-site-line px-7 py-4 transition-colors hover:border-site-ink/40">
              {c.hero.secondary}
            </button>
          </motion.div>

          <dl className="mt-14 grid max-w-lg grid-cols-3 gap-6">
            {c.hero.facts.map((f, i) => (
              <motion.div
                key={f.label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.08, duration: 0.7, ease }}
                className="border-t border-site-line pt-4"
              >
                <dt className="font-site text-3xl font-semibold tracking-tight">{f.value}</dt>
                <dd className="mt-1 text-sm text-site-muted">{f.label}</dd>
              </motion.div>
            ))}
          </dl>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94, borderRadius: "999px" }}
          animate={{ opacity: 1, scale: 1, borderRadius: "40px" }}
          transition={{ duration: 1.2, ease }}
          className="relative aspect-[4/5] overflow-hidden lg:col-span-6 lg:aspect-[5/6]"
        >
          <Image src={c.hero.image} alt={c.hero.imageAlt} fill priority sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8, ease }}
            className="absolute bottom-5 left-5 right-5 flex items-center gap-3 rounded-2xl bg-site-surface/90 p-4 shadow-xl backdrop-blur sm:right-auto"
          >
            <span className="grid size-10 shrink-0 place-items-center rounded-full bg-site-alt text-site-ink">
              <IconCheck className="size-5" />
            </span>
            <span className="text-sm font-medium">{c.hero.badge}</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
