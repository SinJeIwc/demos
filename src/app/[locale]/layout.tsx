import type { Metadata, Viewport } from "next";
import { Onest, Unbounded } from "next/font/google";
import { notFound } from "next/navigation";
import { preconnect } from "react-dom";
import { Toaster } from "sonner";
import "lenis/dist/lenis.css";
import "react-day-picker/style.css";
import "../_styles/globals.css";
import { SmoothScroll } from "../_providers/smooth-scroll";
import { SITE_NAME, SITE_URL } from "@/shared/config/site";
import { getDictionary, I18nProvider, isLocale, languageAlternates, locales } from "@/shared/i18n";

// Только те начертания, что реально используются: меньше файлов шрифтов
const unbounded = Unbounded({
  subsets: ["latin", "cyrillic"],
  variable: "--font-unbounded",
  weight: ["300", "400", "500"],
  display: "swap",
});

const onest = Onest({
  subsets: ["latin", "cyrillic"],
  variable: "--font-onest",
  display: "swap",
});

type Props = { children: React.ReactNode; params: Promise<{ locale: string }> };

// Все языки собираются заранее, неизвестный язык — 404
export const dynamicParams = false;
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Omit<Props, "children">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getDictionary(locale).home;
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: t.metaTitle, template: "%s" },
    description: t.metaDescription,
    applicationName: SITE_NAME,
    alternates: { canonical: `/${locale}`, languages: languageAlternates("/") },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      locale: locale === "ru" ? "ru_RU" : "en_US",
      alternateLocale: locale === "ru" ? ["en_US"] : ["ru_RU"],
    },
    twitter: { card: "summary_large_image" },
    formatDetection: { telephone: false },
  };
}

export const viewport: Viewport = { themeColor: "#0d2830" };

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  // Заранее открываем соединение с CDN фотографий — первая картинка приходит быстрее
  preconnect("https://images.unsplash.com");

  return (
    <html lang={locale} className={`${unbounded.variable} ${onest.variable}`}>
      <body>
        <I18nProvider locale={locale}>
          <SmoothScroll>{children}</SmoothScroll>
        </I18nProvider>
        <Toaster
          position="bottom-center"
          toastOptions={{
            style: {
              background: "#0d2830",
              color: "#f2f6f5",
              border: "1px solid rgba(159,216,211,.25)",
              fontFamily: "var(--font-onest)",
            },
          }}
        />
      </body>
    </html>
  );
}
