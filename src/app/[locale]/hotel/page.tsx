import type { Metadata } from "next";
import { getHotel } from "@/entities/hotel";
import { isLocale, languageAlternates } from "@/shared/i18n";
import { HotelPage } from "@/views/hotel";

export const dynamic = "force-static";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const hotel = getHotel(locale);
  const title = locale === "ru" ? `${hotel.fullName} — отель на Иссык-Куле` : `${hotel.fullName} — hotel on Issyk-Kul`;
  return {
    title,
    description: hotel.hero.lead,
    alternates: { canonical: `/${locale}/hotel`, languages: languageAlternates("/hotel") },
    openGraph: { title: hotel.fullName, description: hotel.hero.lead, url: `/${locale}/hotel` },
  };
}

export default function Page() {
  return <HotelPage />;
}
