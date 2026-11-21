"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LOCALE_COOKIE, localeNames, locales, localeShort, switchLocalePath, useI18n } from "@/shared/i18n";
import { cn } from "@/shared/lib/cn";

/** Переключатель RU / EN. Запоминает выбор в cookie, чтобы middleware открывал его по умолчанию. */
export function LocaleSwitcher({ className, tone = "dark" }: { className?: string; tone?: "dark" | "light" }) {
  const { locale, t } = useI18n();
  const pathname = usePathname() ?? `/${locale}`;

  const remember = (l: string) => {
    document.cookie = `${LOCALE_COOKIE}=${l}; path=/; max-age=31536000; samesite=lax`;
  };

  return (
    <nav
      aria-label={t.common.language}
      className={cn(
        "flex items-center rounded-full p-1 text-xs font-medium",
        tone === "dark" ? "bg-snow/10 text-snow" : "bg-ink/5 text-ink",
        className,
      )}
    >
      {locales.map((l) => {
        const active = l === locale;
        return (
          <Link
            key={l}
            href={switchLocalePath(pathname, l)}
            onClick={() => remember(l)}
            hrefLang={l}
            lang={l}
            aria-current={active ? "true" : undefined}
            title={localeNames[l]}
            scroll={false}
            className={cn(
              "rounded-full px-2.5 py-1.5 transition-colors",
              active
                ? tone === "dark"
                  ? "bg-snow text-ink"
                  : "bg-ink text-snow"
                : "opacity-70 hover:opacity-100",
            )}
          >
            {localeShort[l]}
          </Link>
        );
      })}
    </nav>
  );
}
