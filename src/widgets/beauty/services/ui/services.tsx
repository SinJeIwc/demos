"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { useBeauty } from "@/entities/beauty";
import { useAppointment } from "@/features/appointment";
import { useI18n } from "@/shared/i18n";
import { formatMoney } from "@/shared/lib/format";
import { IconPlus } from "@/shared/ui/icons";

/** Услуги по категориям: аккордеон, «Записаться» сразу выбирает услугу в форме */
export function Services() {
  const { locale } = useI18n();
  const b = useBeauty();
  const s = b.services;
  const { openAppointment } = useAppointment();
  const [open, setOpen] = useState<string | null>(s.categories[0].id);

  return (
    <section id="services" className="py-24 sm:py-32">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <h2 className="font-site text-[clamp(2.6rem,6vw,5rem)] leading-none">{s.title}</h2>
        <ul className="mt-12 border-t border-site-line">
          {s.categories.map((cat) => {
            const isOpen = open === cat.id;
            return (
              <li key={cat.id} className="border-b border-site-line">
                <button
                  onClick={() => setOpen(isOpen ? null : cat.id)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between py-7 text-left"
                >
                  <span className="font-site text-3xl sm:text-4xl">{cat.name}</span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0, backgroundColor: isOpen ? "var(--site-alt)" : "transparent" }}
                    className="grid size-11 place-items-center rounded-full border border-site-line"
                  >
                    <IconPlus className="size-5" />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.ul
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      {cat.items.map((item) => (
                        <li key={item.id} className="group flex flex-col gap-2 pb-6 sm:flex-row sm:items-center sm:justify-between">
                          <div>
                            <p className="text-lg">{item.name}</p>
                            <p className="text-sm text-site-muted">{item.duration}</p>
                          </div>
                          <div className="flex items-center gap-5">
                            <p className="tabular-nums">
                              <span className="text-sm text-site-muted">{s.from} </span>
                              {formatMoney(item.price, locale)} {b.currency}
                            </p>
                            <button
                              onClick={() => openAppointment({ serviceId: item.id })}
                              className="rounded-full bg-site-surface px-4 py-2 text-sm transition-colors group-hover:bg-site-accent group-hover:text-site-accent-ink"
                            >
                              {s.book}
                            </button>
                          </div>
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
