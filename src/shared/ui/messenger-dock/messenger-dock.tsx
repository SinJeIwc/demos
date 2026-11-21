"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { FaInstagram, FaTelegram, FaWhatsapp } from "react-icons/fa6";
import { useI18n } from "@/shared/i18n";
import { cn } from "@/shared/lib/cn";
import { instagramLink, telegramLink, whatsappLink } from "@/shared/lib/messengers";
import { IconClose } from "@/shared/ui/icons";

type Props = {
  contacts: { whatsapp: string; telegram: string; instagram: string };
  /** Текст, который подставится в чат WhatsApp */
  waMessage: string;
  /** Цвета круглой кнопки под стиль сайта */
  buttonClassName?: string;
  pulseClassName?: string;
};

/** Плавающая кнопка связи: раскрывается в WhatsApp, Telegram и Instagram */
export function MessengerDock({ contacts, waMessage, buttonClassName, pulseClassName }: Props) {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const items = [
    { label: "WhatsApp", href: whatsappLink(contacts.whatsapp, waMessage), Icon: FaWhatsapp, bg: "#25d366" },
    { label: "Telegram", href: telegramLink(contacts.telegram), Icon: FaTelegram, bg: "#2aabee" },
    { label: "Instagram", href: instagramLink(contacts.instagram), Icon: FaInstagram, bg: "#e1306c" },
  ];

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3">
      <AnimatePresence>
        {open &&
          items.map(({ label, href, Icon, bg }, i) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 16, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.8 }}
              transition={{ delay: (items.length - 1 - i) * 0.05, type: "spring", stiffness: 380, damping: 26 }}
              className="flex items-center gap-3 rounded-full bg-white py-2 pl-4 pr-2 text-[#14161a] shadow-xl shadow-black/15"
            >
              <span className="text-sm font-medium">{label}</span>
              <span className="grid size-10 place-items-center rounded-full text-white" style={{ background: bg }}>
                <Icon className="size-5" />
              </span>
            </motion.a>
          ))}
      </AnimatePresence>

      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={open ? t.common.hideMessengers : t.common.writeUs}
        className={cn(
          "relative grid size-16 place-items-center rounded-full bg-ink text-snow shadow-2xl shadow-black/30 transition-transform hover:scale-105",
          buttonClassName,
        )}
      >
        {!open && (
          <span className={cn("absolute inset-0 animate-ping rounded-full bg-lake/40 [animation-duration:2.6s]", pulseClassName)} />
        )}
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <IconClose className="size-6" />
            </motion.span>
          ) : (
            <motion.span key="wa" initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.6, opacity: 0 }}>
              <FaWhatsapp className="size-7" />
            </motion.span>
          )}
        </AnimatePresence>
      </button>
    </div>
  );
}
