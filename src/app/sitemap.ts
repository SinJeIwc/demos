import type { MetadataRoute } from "next";
import { liveDemos } from "@/entities/demo";
import { SITE_URL } from "@/shared/config/site";
import { locales, localePath } from "@/shared/i18n";

/** Каждая страница на обоих языках, со ссылками друг на друга (hreflang) */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const paths = ["/", ...liveDemos().map((d) => `/${d.slug}`)];

  return paths.flatMap((path) =>
    locales.map((locale) => ({
      url: `${SITE_URL}${localePath(locale, path)}`,
      lastModified: now,
      changeFrequency: path === "/" ? ("weekly" as const) : ("monthly" as const),
      priority: path === "/" ? 1 : 0.8,
      alternates: {
        languages: Object.fromEntries(locales.map((l) => [l, `${SITE_URL}${localePath(l, path)}`])),
      },
    })),
  );
}
