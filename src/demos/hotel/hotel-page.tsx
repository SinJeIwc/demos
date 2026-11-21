"use client";

import { BookingProvider } from "./booking-context";
import { hotel } from "./config";
import { Amenities } from "./components/amenities";
import { Booking } from "./components/booking";
import { Experiences } from "./components/experiences";
import { Footer } from "./components/footer";
import { Gallery } from "./components/gallery";
import { Hero } from "./components/hero";
import { Location } from "./components/location";
import { MessengerDock } from "./components/messenger-dock";
import { Navbar } from "./components/navbar";
import { Rooms } from "./components/rooms";
import { TundukSection } from "./components/tunduk-section";

export function HotelPage() {
  return (
    <BookingProvider initialRoomId={hotel.rooms[0].id}>
      <Navbar />
      <main>
        <Hero />
        <TundukSection />
        <Rooms />
        <Amenities />
        <Experiences />
        <Gallery />
        <Booking />
        <Location />
      </main>
      <Footer />
      <MessengerDock />
    </BookingProvider>
  );
}
