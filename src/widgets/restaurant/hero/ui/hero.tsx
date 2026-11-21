"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { useRestaurant } from "@/entities/restaurant";
import { useAppointment } from "@/features/appointment";

const ease = [0.22, 1, 0.36, 1] as const;

/** Первый экран: огромное название по буквам поверх фото зала */
export function Hero() {
  const r = useRestaurant();
  const { openAppointment, scrollTo } = useAppointment();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const letterSpread = useTransform(scrollYProgress, [0, 1], ["-0.02em", "0.12em"]);

  return (
    <section ref={ref} id="top" className="relative flex h-[100svh] min-h-[620px] items-end overflow-hidden text-white">
      <motion.div className="absolute inset-0" style={{ y }}>
        <motion.div className="absolute inset-0" initial={{ scale: 1.12 }} animate={{ scale: 1 }} transition={{ duration: 2.4, ease }}>
          <Image src={r.hero.image} alt={r.hero.imageAlt} fill priority sizes="100vw" className="object-cover" />
        </motion.div>
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-site-bg via-site-bg/40 to-black/30" />

      <div className="relative mx-auto w-full max-w-7xl px-5 pb-14 sm:px-8 sm:pb-20">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 1 }}
          className="text-sm text-site-accent"
        >
          {r.tagline}
        </motion.p>
        <motion.h1 aria-label={r.name} style={{ letterSpacing: letterSpread }} className="font-site mt-2 text-[clamp(5rem,22vw,19rem)] leading-[0.85]">
          {Array.from(r.name).map((ch, i) => (
            <motion.span
              key={i}
              aria-hidden
              className="inline-block"
              initial={{ y: "60%", opacity: 0, rotate: 6 }}
              animate={{ y: "0%", opacity: 1, rotate: 0 }}
              transition={{ delay: 0.2 + i * 0.08, duration: 1.1, ease }}
            >
              {ch}
            </motion.span>
          ))}
        </motion.h1>
        <div className="mt-6 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8, ease }}
            className="max-w-md text-lg text-site-ink/85"
          >
            {r.hero.lead}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.15, duration: 0.8, ease }}
            className="flex gap-3"
          >
            <button onClick={() => openAppointment()} className="rounded-full bg-site-accent px-7 py-4 font-medium text-site-accent-ink transition-transform hover:scale-[1.03]">
              {r.cta}
            </button>
            <button onClick={() => scrollTo("#menu")} className="rounded-full border border-white/30 px-7 py-4 transition-colors hover:border-white/70">
              {r.hero.menuLink}
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
