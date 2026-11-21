/**
 * Адрес сайта для ссылок в sitemap, превью и canonical.
 * На Vercel задайте NEXT_PUBLIC_SITE_URL, когда подключите свой домен.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000")
).replace(/\/$/, "");

export const SITE_NAME = "araweare";
export const SITE_DESCRIPTION =
  "Сайты для отелей, клиник, ресторанов и салонов с заявками в WhatsApp и Telegram. Посмотрите демо.";
