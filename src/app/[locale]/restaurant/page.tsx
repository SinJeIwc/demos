import type { Metadata } from "next";
import { getRestaurant } from "@/entities/restaurant";
import { isLocale, languageAlternates } from "@/shared/i18n";
import { RestaurantPage } from "@/views/restaurant";

export const dynamic = "force-static";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const r = getRestaurant(locale);
  return {
    title: `${r.fullName} — ${r.tagline}`,
    description: r.hero.lead,
    alternates: { canonical: `/${locale}/restaurant`, languages: languageAlternates("/restaurant") },
    openGraph: { title: r.fullName, description: r.hero.lead, url: `/${locale}/restaurant` },
  };
}

export default function Page() {
  return <RestaurantPage />;
}
