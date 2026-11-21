import type { Metadata } from "next";
import { HotelPage } from "@/demos/hotel/hotel-page";
import { hotel } from "@/demos/hotel/config";

// Страница собирается один раз при сборке и раздаётся с CDN
export const dynamic = "force-static";

export const metadata: Metadata = {
  title: `${hotel.fullName} — отель на Иссык-Куле`,
  description: hotel.hero.lead,
  openGraph: {
    title: hotel.fullName,
    description: hotel.hero.lead,
    images: [`${hotel.hero.image}?auto=format&fit=crop&w=1200&q=80`],
  },
};

export default function Page() {
  return <HotelPage />;
}
