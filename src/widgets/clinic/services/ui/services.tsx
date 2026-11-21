"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { useClinic } from "@/entities/clinic";
import { useAppointment } from "@/features/appointment";
import { useI18n } from "@/shared/i18n";
import { cn } from "@/shared/lib/cn";
import { formatMoney } from "@/shared/lib/format";
import { IconArrow } from "@/shared/ui/icons";

/** Прайс с фильтром по направлениям; «Записаться» сразу выбирает услугу в форме */
export function Services() {
  const { locale } = useI18n();
  const c = useClinic();
  const s = c.services;
  const { openAppointment } = useAppointment();
  const [group, setGroup] = useState<string | null>(null);
  const items = group ? s.items.filter((i) => i.group === group) : s.items;

  const tab = (on: boolean) =>
    cn(
      "rounded-full px-4 py-2 text-sm transition-colors",
      on ? "bg-site-ink text-site-bg" : "bg-site-surface text-site-ink hover:bg-site-line/60",
    );

  return (
    <section id="services" className="py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <h2 className="font-site text-[clamp(2.2rem,5vw,3.75rem)] font-semibold leading-none tracking-[-0.03em] lg:col-span-7">{s.title}</h2>
          <p className="text-site-muted lg:col-span-5">{s.lead}</p>
        </div>

        <div className="mt-10 flex flex-wrap gap-2" role="tablist">
          <button role="tab" aria-selected={!group} onClick={() => setGroup(null)} className={tab(!group)}>
            {s.all}
          </button>
          {s.groups.map((g) => (
            <button key={g.id} role="tab" aria-selected={group === g.id} onClick={() => setGroup(g.id)} className={tab(group === g.id)}>
              {g.name}
            </button>
          ))}
        </div>

        <motion.ul layout className="mt-8 divide-y divide-site-line overflow-hidden rounded-[28px] border border-site-line bg-site-surface">
          <AnimatePresence initial={false}>
            {items.map((item) => (
              <motion.li
                layout
                key={item.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="group flex flex-col gap-3 px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8"
              >
                <div>
                  <p className="text-lg font-medium">{item.name}</p>
                  <p className="text-sm text-site-muted">{item.duration}</p>
                </div>
                <div className="flex items-center gap-5">
                  <p className="font-site text-xl font-semibold tabular-nums">
                    <span className="mr-1 text-sm font-normal text-site-muted">{s.from}</span>
                    {formatMoney(item.price, locale)} {c.currency}
                  </p>
                  <button
                    onClick={() => openAppointment({ serviceId: item.id })}
                    className="inline-flex items-center gap-2 rounded-full border border-site-line px-4 py-2 text-sm transition-colors group-hover:border-site-ink group-hover:bg-site-ink group-hover:text-site-bg"
                  >
                    {s.book}
                    <IconArrow className="size-4" />
                  </button>
                </div>
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      </div>
    </section>
  );
}
