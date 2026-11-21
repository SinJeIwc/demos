import type { Metadata } from "next";
import { getBeauty } from "@/entities/beauty";
import { isLocale, languageAlternates } from "@/shared/i18n";
import { BeautyPage } from "@/views/beauty";

export const dynamic = "force-static";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const b = getBeauty(locale);
  return {
    title: `${b.fullName} — ${locale === "ru" ? "салон красоты в Бишкеке" : "beauty salon in Bishkek"}`,
    description: b.hero.lead,
    alternates: { canonical: `/${locale}/beauty`, languages: languageAlternates("/beauty") },
    openGraph: { title: b.fullName, description: b.hero.lead, url: `/${locale}/beauty` },
  };
}

export default function Page() {
  return <BeautyPage />;
}
