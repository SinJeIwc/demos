import type { Locale } from "@/shared/i18n";

/** 14500 → «14 500» (ru) / «14,500» (en) */
export const formatMoney = (n: number, locale: Locale) =>
  new Intl.NumberFormat(locale === "ru" ? "ru-RU" : "en-US").format(n);
