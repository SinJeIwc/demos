import type { Locale } from "./config";

/** Значение на двух языках: { ru: "Номер", en: "Room" } */
export type L<T = string> = { ru: T; en: T };

/** Тип контента после выбора языка: все L<T> внутри превращаются в T */
export type Localized<T> =
  T extends L<infer U>
    ? U
    : T extends readonly (infer E)[]
      ? Localized<E>[]
      : T extends object
        ? { [K in keyof T]: Localized<T[K]> }
        : T;

const isL = (v: unknown): v is L<unknown> =>
  !!v && typeof v === "object" && !Array.isArray(v) && Object.keys(v).length === 2 && "ru" in v && "en" in v;

/** Короткая запись двуязычной строки */
export const tx = <T = string>(ru: T, en: T): L<T> => ({ ru, en });

/**
 * Проходит по контенту и в каждом { ru, en } оставляет нужный язык.
 * Так контент сайта пишется одним объектом, а не двумя копиями.
 */
export function localize<T>(value: T, locale: Locale): Localized<T> {
  if (isL(value)) return value[locale] as Localized<T>;
  if (Array.isArray(value)) return value.map((v) => localize(v, locale)) as Localized<T>;
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>).map(([k, v]) => [k, localize(v, locale)]),
    ) as Localized<T>;
  }
  return value as Localized<T>;
}
