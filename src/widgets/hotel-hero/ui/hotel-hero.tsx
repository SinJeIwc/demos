"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { useHotel } from "@/entities/hotel";
import { useBooking } from "@/features/hotel-booking";
import { useI18n } from "@/shared/i18n";
import { formatMoney } from "@/shared/lib/format";
import { IconArrow, IconCalendar, IconPin } from "@/shared/ui/icons";

const ease = [0.22, 1, 0.36, 1] as const;

export function HotelHero() {
  const { t, locale } = useI18n();
  const hotel = useHotel();
  const { openBooking } = useBooking();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.08, 1.22]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const minPrice = formatMoney(Math.min(...hotel.rooms.map((r) => r.pricePerNight)), locale);

  return (
    <section ref={ref} id="top" className="relative h-[100svh] min-h-[640px] overflow-hidden bg-ink text-snow">
      <motion.div className="absolute inset-0" style={{ y: imageY, scale: imageScale }}>
        <motion.div className="absolute inset-0" initial={{ scale: 1.15 }} animate={{ scale: 1 }} transition={{ duration: 2.2, ease }}>
          <Image src={hotel.hero.image} alt={t.hotel.hero.photoAlt} fill priority sizes="100vw" className="object-cover" />
        </motion.div>
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-ink/50 via-ink/10 to-ink/90" />

      <motion.div
        style={{ y: textY, opacity: fade }}
        className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-5 pb-36 sm:px-8 sm:pb-40"
      >
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8, ease }}
          className="mb-6 flex items-center gap-2 text-sm text-shallow"
        >
          <IconPin className="size-4" />
          {hotel.place}
        </motion.p>

        <h1 className="display-tight text-[clamp(3rem,10.5vw,9.5rem)] font-light">
          {hotel.hero.title.map((line, i) => (
            <span key={line} className="block overflow-hidden pb-[0.06em]">
              <motion.span
                className="block"
                initial={{ y: "105%" }}
                animate={{ y: "0%" }}
                transition={{ delay: 0.35 + i * 0.12, duration: 1.1, ease }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.9, ease }}
          className="mt-8 max-w-md text-lg text-mist/85"
        >
          {hotel.hero.lead}
        </motion.p>
      </motion.div>

      {/* Быстрая бронь внизу экрана */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.35, duration: 0.9, ease }}
        className="absolute inset-x-0 bottom-5 z-20 px-3 sm:bottom-8 sm:px-5"
      >
        <div className="mx-auto flex max-w-7xl flex-col gap-2 rounded-[26px] border border-snow/15 bg-ink/55 p-2 backdrop-blur-xl sm:flex-row sm:items-center">
          <button
            onClick={() => openBooking()}
            className="flex flex-1 items-center gap-3 rounded-[20px] px-4 py-3 text-left transition-colors hover:bg-snow/5"
          >
            <IconCalendar className="size-5 text-shallow" />
            <span>
              <span className="block text-xs text-snow/60">{t.hotel.hero.datesLabel}</span>
              <span className="block">{t.hotel.hero.datesValue}</span>
            </span>
          </button>
          <div className="hidden h-10 w-px bg-snow/15 sm:block" />
          <div className="flex flex-1 items-center gap-3 px-4 py-3">
            <span className="felt-diamond" aria-hidden />
            <span>
              <span className="block text-xs text-snow/60">{t.hotel.hero.roomsLabel}</span>
              <span className="block">{t.hotel.hero.fromPerNight(minPrice, hotel.currency)}</span>
            </span>
          </div>
          <button
            onClick={() => openBooking()}
            className="group flex items-center justify-center gap-3 rounded-[20px] bg-snow px-6 py-4 font-medium text-ink transition-colors hover:bg-dusk"
          >
            {t.hotel.hero.cta}
            <IconArrow className="size-5 transition-transform duration-500 group-hover:translate-x-1" />
          </button>
        </div>
      </motion.div>
    </section>
  );
}
