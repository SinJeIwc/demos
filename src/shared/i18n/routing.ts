import { isLocale, type Locale } from "./config";

/** localePath("en", "/hotel") → "/en/hotel"; localePath("ru", "/") → "/ru" */
export function localePath(locale: Locale, path = "/") {
  const clean = path.startsWith("/") ? path : `/${path}`;
  return clean === "/" ? `/${locale}` : `/${locale}${clean}`;
}

/** Тот же адрес на другом языке: "/ru/hotel" → "/en/hotel" */
export function switchLocalePath(pathname: string, to: Locale) {
  const parts = pathname.split("/");
  if (isLocale(parts[1])) parts[1] = to;
  else parts.splice(1, 0, to);
  return parts.join("/") || `/${to}`;
}

/** Ссылки hreflang для metadata.alternates.languages */
export function languageAlternates(path = "/") {
  return { ru: localePath("ru", path), en: localePath("en", path), "x-default": localePath("ru", path) };
}
