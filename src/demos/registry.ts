import { unsplash } from "@/lib/messengers";

/**
 * Реестр демо-сайтов. Чтобы добавить новый бизнес:
 * 1) создать папку src/demos/<slug>/ с config.ts и компонентами,
 * 2) создать роут src/app/<slug>/page.tsx,
 * 3) добавить запись сюда со status: "live".
 */
export type DemoEntry = {
  slug: string;
  title: string;
  pitch: string;
  status: "live" | "soon";
  cover: string;
};

export const demos: DemoEntry[] = [
  {
    slug: "hotel",
    title: "Отель на Иссык-Куле",
    pitch: "Бронь с выбором дат, заявка сразу в WhatsApp или Telegram",
    status: "live",
    cover: unsplash("photo-1559310589-2673bfe16970"),
  },
  {
    slug: "clinic",
    title: "Стоматология",
    pitch: "Запись к врачу и напоминания о визите",
    status: "soon",
    cover: unsplash("photo-1629909613654-28e377c37b09"),
  },
  {
    slug: "restaurant",
    title: "Ресторан",
    pitch: "Меню, бронь стола и доставка",
    status: "soon",
    cover: unsplash("photo-1766832255363-c9f060ade8b0"),
  },
  {
    slug: "beauty",
    title: "Салон красоты",
    pitch: "Мастера, услуги и онлайн-запись",
    status: "soon",
    cover: unsplash("photo-1633681926022-84c23e8cb2d6"),
  },
];
