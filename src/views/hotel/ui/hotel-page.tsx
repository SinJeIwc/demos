"use client";

import { useHotel } from "@/entities/hotel";
import { BookingProvider } from "@/features/hotel-booking";
import { HotelAmenities } from "@/widgets/hotel-amenities";
import { HotelBooking } from "@/widgets/hotel-booking";
import { HotelExperiences } from "@/widgets/hotel-experiences";
import { HotelFooter } from "@/widgets/hotel-footer";
import { HotelGallery } from "@/widgets/hotel-gallery";
import { HotelHero } from "@/widgets/hotel-hero";
import { HotelLocation } from "@/widgets/hotel-location";
import { HotelMessengerDock } from "@/widgets/hotel-messenger-dock";
import { HotelNavbar } from "@/widgets/hotel-navbar";
import { HotelRooms } from "@/widgets/hotel-rooms";
import { HotelStory } from "@/widgets/hotel-story";

/** Демо-лендинг отеля: собирает секции-виджеты в одну страницу */
export function HotelPage() {
  const hotel = useHotel();

  return (
    <BookingProvider initialRoomId={hotel.rooms[0].id}>
      <HotelNavbar />
      <main>
        <HotelHero />
        <HotelStory />
        <HotelRooms />
        <HotelAmenities />
        <HotelExperiences />
        <HotelGallery />
        <HotelBooking />
        <HotelLocation />
      </main>
      <HotelFooter />
      <HotelMessengerDock />
    </BookingProvider>
  );
}
