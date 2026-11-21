"use client";

import Link from "next/link";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";
import { HotelMark, useHotel } from "@/entities/hotel";
import { useBooking } from "@/features/hotel/booking";
import { LocaleSwitcher } from "@/features/locale-switcher";
import { localePath, useI18n } from "@/shared/i18n";
import { cn } from "@/shared/lib/cn";
import { IconClose, IconMenu } from "@/shared/ui/icons";

export function Navbar() {
  const { t, locale } = useI18n();
  const hotel = useHotel();
  const { scrollY } = useScroll();
  const [solid, setSolid] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollTo, openBooking } = useBooking();

  const links = [
    { href: "#rooms", label: t.hotel.nav.rooms },
    { href: "#amenities", label: t.hotel.nav.amenities },
    { href: "#experiences", label: t.hotel.nav.experiences },
    { href: "#gallery", label: t.hotel.nav.gallery },
    { href: "#location", label: t.hotel.nav.location },
  ];

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setSolid(y > 60);
    // Прячем шапку при скролле вниз и возвращаем при скролле вверх
    setHidden(y > 400 && y > prev && !open);
  });

  const go = (href: string) => {
    setOpen(false);
    scrollTo(href);
  };

  return (
    <>
      <motion.header
        animate={{ y: hidden ? "-110%" : "0%" }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5"
      >
        <nav
          className={cn(
            "mx-auto flex h-14 max-w-7xl items-center justify-between rounded-full pl-5 pr-2 text-snow transition-colors duration-500",
            solid ? "bg-ink/80 shadow-lg shadow-ink/20 backdrop-blur-xl" : "bg-transparent",
          )}
        >
          <button onClick={() => go("#top")} className="flex items-center gap-2.5" aria-label={t.common.toTop}>
            <HotelMark className="size-7" />
            <span className="font-display text-lg font-medium tracking-tight">{hotel.name}</span>
            <span className="hidden text-xs text-shallow sm:inline">lake house</span>
          </button>

          <ul className="hidden items-center gap-1 xl:flex">
            {links.map((l) => (
              <li key={l.href}>
                <button
                  onClick={() => go(l.href)}
                  className="rounded-full px-4 py-2 text-sm text-snow/80 transition-colors hover:bg-snow/10 hover:text-snow"
                >
                  {l.label}
                </button>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <LocaleSwitcher className="hidden sm:flex" />
            <button
              onClick={() => openBooking()}
              className="rounded-full bg-dusk px-5 py-2.5 text-sm font-medium text-ink transition-transform hover:scale-[1.03] active:scale-95"
            >
              {t.common.book}
            </button>
            <button
              onClick={() => setOpen(true)}
              className="grid size-10 place-items-center rounded-full bg-snow/10 xl:hidden"
              aria-label={t.common.openMenu}
            >
              <IconMenu className="size-5" />
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[60] bg-ink text-snow xl:hidden"
            initial={{ clipPath: "circle(0% at 92% 6%)" }}
            animate={{ clipPath: "circle(150% at 92% 6%)" }}
            exit={{ clipPath: "circle(0% at 92% 6%)" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex h-20 items-center justify-between px-5">
              <LocaleSwitcher />
              <button
                onClick={() => setOpen(false)}
                className="grid size-11 place-items-center rounded-full bg-snow/10"
                aria-label={t.common.closeMenu}
              >
                <IconClose className="size-5" />
              </button>
            </div>
            <ul className="px-7 pt-6">
              {links.map((l, i) => (
                <motion.li
                  key={l.href}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.06 }}
                >
                  <button onClick={() => go(l.href)} className="display-tight py-3 text-4xl font-light">
                    {l.label}
                  </button>
                </motion.li>
              ))}
            </ul>
            <Link href={localePath(locale)} className="absolute bottom-8 left-7 text-snow/60">
              ← araweare
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
