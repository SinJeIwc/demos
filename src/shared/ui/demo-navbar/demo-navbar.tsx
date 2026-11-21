"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useState, type ReactNode } from "react";
import { useI18n } from "@/shared/i18n";
import { cn } from "@/shared/lib/cn";
import { IconClose, IconMenu } from "@/shared/ui/icons";

type Props = {
  brand: ReactNode;
  links: { href: string; label: string }[];
  ctaLabel: string;
  onNavigate: (href: string) => void;
  onCta: () => void;
  /** Слот справа, например переключатель языка */
  actions?: ReactNode;
  /** Над тёмным фото: пока шапка прозрачная, текст белый */
  overDark?: boolean;
};

/**
 * Шапка демо-сайта на токенах темы (site-*): прозрачная наверху,
 * плотная при скролле, прячется при прокрутке вниз, на мобильных — полноэкранное меню.
 */
export function DemoNavbar({ brand, links, ctaLabel, onNavigate, onCta, actions, overDark }: Props) {
  const { t } = useI18n();
  const { scrollY } = useScroll();
  const [solid, setSolid] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setSolid(y > 40);
    setHidden(y > 400 && y > prev && !open);
  });

  const go = (href: string) => {
    setOpen(false);
    onNavigate(href);
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
            "mx-auto flex h-14 max-w-7xl items-center justify-between rounded-full pl-5 pr-2 transition-colors duration-500",
            solid
              ? "border border-site-line bg-site-surface/85 text-site-ink shadow-lg shadow-black/5 backdrop-blur-xl"
              : overDark
                ? "text-white"
                : "text-site-ink",
          )}
        >
          <button onClick={() => go("#top")} className="flex items-center gap-2.5" aria-label={t.common.toTop}>
            {brand}
          </button>

          <ul className="hidden items-center gap-1 lg:flex">
            {links.map((l) => (
              <li key={l.href}>
                <button onClick={() => go(l.href)} className="rounded-full px-4 py-2 text-sm opacity-75 transition-opacity hover:opacity-100">
                  {l.label}
                </button>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            {actions && <div className="hidden sm:block">{actions}</div>}
            <button
              onClick={onCta}
              className="rounded-full bg-site-accent px-5 py-2.5 text-sm font-medium text-site-accent-ink transition-transform hover:scale-[1.03] active:scale-95"
            >
              {ctaLabel}
            </button>
            <button
              onClick={() => setOpen(true)}
              className="grid size-10 place-items-center rounded-full bg-current/10 lg:hidden"
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
            className="fixed inset-0 z-[60] bg-site-bg text-site-ink lg:hidden"
            initial={{ clipPath: "circle(0% at 92% 6%)" }}
            animate={{ clipPath: "circle(150% at 92% 6%)" }}
            exit={{ clipPath: "circle(0% at 92% 6%)" }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex h-20 items-center justify-between px-5">
              {actions ?? <span />}
              <button
                onClick={() => setOpen(false)}
                className="grid size-11 place-items-center rounded-full border border-site-line"
                aria-label={t.common.closeMenu}
              >
                <IconClose className="size-5" />
              </button>
            </div>
            <ul className="px-7 pt-6">
              {links.map((l, i) => (
                <motion.li key={l.href} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 + i * 0.06 }}>
                  <button onClick={() => go(l.href)} className="font-site py-3 text-4xl">
                    {l.label}
                  </button>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
