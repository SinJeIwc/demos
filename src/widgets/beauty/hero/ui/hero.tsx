"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { useBeauty } from "@/entities/beauty";
import { useAppointment } from "@/features/appointment";
import { IconArrow } from "@/shared/ui/icons";

const ease = [0.22, 1, 0.36, 1] as const;

/** Главный эффект сайта: три арки-окна, которые растут снизу и расходятся при скролле */
export function Hero() {
  const b = useBeauty();
  const { openAppointment } = useAppointment();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const shifts = [
    useTransform(scrollYProgress, [0, 1], ["0%", "-18%"]),
    useTransform(scrollYProgress, [0, 1], ["0%", "-34%"]),
    useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]),
  ];
  const heights = ["h-[62%]", "h-[82%]", "h-[52%]"];

  return (
    <section ref={ref} id="top" className="relative overflow-hidden pb-20 pt-32 sm:pt-40">
      <div className="mx-auto grid max-w-7xl items-end gap-14 px-5 sm:px-8 lg:grid-cols-12">
        <div className="lg:col-span-6 lg:pb-16">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease }}
            className="font-site text-balance text-[clamp(3rem,7.5vw,6.5rem)] leading-[0.95]"
          >
            {b.hero.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease }}
            className="mt-7 max-w-md text-lg text-site-muted"
          >
            {b.hero.lead}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease }}
            className="mt-9 flex flex-wrap items-center gap-5"
          >
            <button
              onClick={() => openAppointment()}
              className="group inline-flex items-center gap-3 rounded-full bg-site-accent px-7 py-4 text-site-accent-ink transition-transform hover:scale-[1.03]"
            >
              {b.cta}
              <span className="grid size-7 place-items-center rounded-full bg-site-alt text-site-ink transition-transform group-hover:rotate-[-45deg]">
                <IconArrow className="size-4" />
              </span>
            </button>
            <p className="max-w-[16rem] text-sm text-site-muted">{b.hero.note}</p>
          </motion.div>
        </div>

        <div className="flex h-[440px] items-end gap-3 sm:h-[560px] sm:gap-5 lg:col-span-6">
          {b.hero.images.map((img, i) => (
            <motion.div
              key={img.src}
              style={{ y: shifts[i] }}
              initial={{ clipPath: "inset(100% 0 0 0 round 999px 999px 24px 24px)" }}
              animate={{ clipPath: "inset(0% 0 0 0 round 999px 999px 24px 24px)" }}
              transition={{ delay: 0.2 + i * 0.15, duration: 1.3, ease }}
              className={`relative flex-1 overflow-hidden rounded-t-full rounded-b-3xl ${heights[i]}`}
            >
              <Image src={img.src} alt={img.alt} fill priority={i === 1} sizes="(min-width: 1024px) 17vw, 33vw" className="object-cover" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
