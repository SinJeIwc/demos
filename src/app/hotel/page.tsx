import type { Metadata } from "next";
import { HotelPage } from "@/demos/hotel/hotel-page";
import { hotel } from "@/demos/hotel/config";

// Страница собирается один раз при сборке и раздаётся с CDN
export const dynamic = "force-static";

export const metadata: Metadata = {
  title: `${hotel.fullName} — отель на Иссык-Куле`,
  description: hotel.hero.lead,
  alternates: { canonical: "/hotel" },
  openGraph: {
    title: hotel.fullName,
    description: hotel.hero.lead,
    url: "/hotel",
  },
};

export default function Page() {
  return <HotelPage />;
}
