"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { hotel } from "../config";
import { useBooking } from "../booking-context";

export function Footer() {
  const { openBooking } = useBooking();
  return (
    <footer className="grain overflow-hidden bg-ink text-snow">
      <div className="mx-auto max-w-7xl px-5 pt-24 sm:px-8">
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <p className="max-w-md text-lg text-mist/80">
            Лето на Иссык-Куле короткое. Выберите даты сейчас — подтвердим бронь в течение 15 минут.
          </p>
          <button
            onClick={() => openBooking()}
            className="self-start rounded-full bg-dusk px-8 py-4 font-medium text-ink transition-transform hover:scale-[1.03] md:self-auto"
          >
            Забронировать
          </button>
        </div>

        <motion.p
          initial={{ y: "40%", opacity: 0 }}
          whileInView={{ y: "0%", opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="display-tight mt-20 select-none text-[clamp(5rem,24vw,22rem)] font-light leading-[0.8] text-snow/90"
          aria-hidden
        >
          {hotel.name}
        </motion.p>

        <div className="flex flex-col gap-3 border-t border-snow/10 py-8 text-sm text-mist/50 sm:flex-row sm:justify-between">
          <span>Демо-сайт. Название, цены и контакты вымышленные. Фото: Unsplash.</span>
          <Link href="/demos" className="hover:text-snow">
            Посмотреть другие демо
          </Link>
        </div>
      </div>
    </footer>
  );
}
