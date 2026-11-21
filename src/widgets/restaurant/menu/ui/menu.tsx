"use client";

import Image from "next/image";
import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import { useState } from "react";
import { useRestaurant } from "@/entities/restaurant";
import { useI18n } from "@/shared/i18n";
import { cn } from "@/shared/lib/cn";
import { formatMoney } from "@/shared/lib/format";

/**
 * Главный эффект сайта: меню, где фото блюда плывёт за курсором.
 * На сенсорных экранах фото не показываем — там просто аккуратный список.
 */
export function Menu() {
  const { locale } = useI18n();
  const r = useRestaurant();
  const [cat, setCat] = useState(r.menu.categories[0].id);
  const [hover, setHover] = useState<string | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 24 });
  const sy = useSpring(y, { stiffness: 220, damping: 24 });
  const category = r.menu.categories.find((c) => c.id === cat) ?? r.menu.categories[0];

  return (
    <section
      id="menu"
      className="relative border-y border-site-line bg-site-surface py-24 sm:py-32"
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        x.set(e.clientX);
        y.set(e.clientY);
      }}
    >
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <h2 className="font-site text-[clamp(2.6rem,7vw,5.5rem)] leading-none">{r.menu.title}</h2>
          <p className="hidden text-sm text-site-muted md:block">{r.menu.note}</p>
        </div>

        <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 border-b border-site-line" role="tablist">
          {r.menu.categories.map((c) => (
            <button
              key={c.id}
              role="tab"
              aria-selected={c.id === cat}
              onClick={() => setCat(c.id)}
              className={cn("relative pb-4 text-lg transition-colors", c.id === cat ? "text-site-ink" : "text-site-muted hover:text-site-ink")}
            >
              {c.name}
              {c.id === cat && <motion.span layoutId="menu-tab" className="absolute inset-x-0 -bottom-px h-0.5 bg-site-accent" />}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.ul
            key={cat}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35 }}
            className="divide-y divide-site-line"
          >
            {category.items.map((item) => (
              <li
                key={item.name}
                onPointerEnter={(e) => e.pointerType === "mouse" && setHover(item.image)}
                onPointerLeave={() => setHover(null)}
                className="group grid grid-cols-[1fr_auto] items-baseline gap-x-6 py-6"
              >
                <h3 className="font-site text-2xl transition-colors group-hover:text-site-accent sm:text-3xl">{item.name}</h3>
                <p className="font-site text-xl tabular-nums sm:text-2xl">
                  {formatMoney(item.price, locale)} <span className="text-base text-site-muted">{r.currency}</span>
                </p>
                <p className="col-span-2 mt-1 text-site-muted">{item.desc}</p>
              </li>
            ))}
          </motion.ul>
        </AnimatePresence>
      </div>

      {/* Плавающее фото блюда за курсором */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-30 hidden h-56 w-44 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[20px] shadow-2xl md:block"
        style={{ x: sx, y: sy }}
        animate={{ opacity: hover ? 1 : 0, scale: hover ? 1 : 0.6, rotate: hover ? -4 : 0 }}
        transition={{ duration: 0.3 }}
      >
        {hover && <Image src={hover} alt="" fill sizes="176px" className="object-cover" />}
      </motion.div>
    </section>
  );
}
