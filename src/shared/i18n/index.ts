export {
  defaultLocale,
  isLocale,
  LOCALE_COOKIE,
  localeNames,
  locales,
  localeShort,
  type Locale,
} from "./config";
export { getDictionary } from "./get-dictionary";
export type { Dictionary } from "./dictionaries/ru";
export { I18nProvider, useI18n } from "./provider";
export { languageAlternates, localePath, switchLocalePath } from "./routing";
