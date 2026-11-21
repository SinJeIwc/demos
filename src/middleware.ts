import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, isLocale, LOCALE_COOKIE, locales, type Locale } from "@/shared/i18n/config";

/** Язык посетителя: сначала выбор из переключателя (cookie), потом язык браузера */
function pickLocale(req: NextRequest): Locale {
  const saved = req.cookies.get(LOCALE_COOKIE)?.value;
  if (isLocale(saved)) return saved;

  const header = req.headers.get("accept-language") ?? "";
  const preferred = header
    .split(",")
    .map((part) => {
      const [tag, q] = part.trim().split(";q=");
      return { lang: tag.toLowerCase().split("-")[0], q: q ? Number(q) : 1 };
    })
    .sort((a, b) => b.q - a.q);

  for (const { lang } of preferred) {
    if ((locales as readonly string[]).includes(lang)) return lang as Locale;
  }
  return defaultLocale;
}

/** Адреса без языка ("/", "/hotel") перенаправляем на "/ru/..." или "/en/..." */
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (isLocale(pathname.split("/")[1])) return NextResponse.next();

  const url = req.nextUrl.clone();
  url.pathname = `/${pickLocale(req)}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Пропускаем служебные файлы Next, иконки и всё, у чего есть расширение
  matcher: ["/((?!_next|api|apple-icon|icon|opengraph-image|.*\\..*).*)"],
};
