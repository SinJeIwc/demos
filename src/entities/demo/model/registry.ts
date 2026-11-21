import type { Locale } from "@/shared/i18n";
import { unsplash } from "@/shared/lib/messengers";

/**
 * Реестр демо-сайтов для главной. Чтобы добавить новый бизнес:
 * 1) entities/<бизнес> — контент на двух языках,
 * 2) widgets/<бизнес>-* — секции, views/<бизнес> — страница,
 * 3) роут src/app/[locale]/<slug>/page.tsx,
 * 4) запись сюда со status: "live".
 */
export type DemoEntry = {
  slug: string;
  status: "live" | "soon";
  cover: string;
  title: Record<Locale, string>;
  pitch: Record<Locale, string>;
};

export const demos: DemoEntry[] = [
  {
    slug: "hotel",
    status: "live",
    cover: unsplash("photo-1559310589-2673bfe16970"),
    title: { ru: "Отель на Иссык-Куле", en: "Hotel on Issyk-Kul" },
    pitch: {
      ru: "Бронь с выбором дат, заявка сразу в WhatsApp или Telegram",
      en: "Booking with a date picker, requests go straight to WhatsApp or Telegram",
    },
  },
  {
    slug: "clinic",
    status: "soon",
    cover: unsplash("photo-1629909613654-28e377c37b09"),
    title: { ru: "Стоматология", en: "Dental clinic" },
    pitch: { ru: "Запись к врачу и напоминания о визите", en: "Doctor appointments and visit reminders" },
  },
  {
    slug: "restaurant",
    status: "soon",
    cover: unsplash("photo-1766832255363-c9f060ade8b0"),
    title: { ru: "Ресторан", en: "Restaurant" },
    pitch: { ru: "Меню, бронь стола и доставка", en: "Menu, table booking and delivery" },
  },
  {
    slug: "beauty",
    status: "soon",
    cover: unsplash("photo-1633681926022-84c23e8cb2d6"),
    title: { ru: "Салон красоты", en: "Beauty salon" },
    pitch: { ru: "Мастера, услуги и онлайн-запись", en: "Stylists, services and online booking" },
  },
];

export const liveDemos = () => demos.filter((d) => d.status === "live");
