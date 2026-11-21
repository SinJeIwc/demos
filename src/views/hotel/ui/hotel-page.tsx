"use client";

import { useHotel } from "@/entities/hotel";
import { BookingProvider } from "@/features/hotel/booking";
import { Amenities } from "@/widgets/hotel/amenities";
import { BookingSection } from "@/widgets/hotel/booking";
import { Experiences } from "@/widgets/hotel/experiences";
import { Footer } from "@/widgets/hotel/footer";
import { Gallery } from "@/widgets/hotel/gallery";
import { Hero } from "@/widgets/hotel/hero";
import { Location } from "@/widgets/hotel/location";
import { MessengerDock } from "@/widgets/hotel/messenger-dock";
import { Navbar } from "@/widgets/hotel/navbar";
import { Rooms } from "@/widgets/hotel/rooms";
import { Story } from "@/widgets/hotel/story";

/** Демо-лендинг отеля: собирает секции-виджеты в одну страницу */
export function HotelPage() {
  const hotel = useHotel();

  return (
    <BookingProvider initialRoomId={hotel.rooms[0].id}>
      <Navbar />
      <main>
        <Hero />
        <Story />
        <Rooms />
        <Amenities />
        <Experiences />
        <Gallery />
        <BookingSection />
        <Location />
      </main>
      <Footer />
      <MessengerDock />
    </BookingProvider>
  );
}
