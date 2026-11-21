"use client";

import { AppointmentProvider } from "@/features/appointment";
import { Contacts } from "@/widgets/restaurant/contacts";
import { Gallery } from "@/widgets/restaurant/gallery";
import { Hero } from "@/widgets/restaurant/hero";
import { Menu } from "@/widgets/restaurant/menu";
import { MessengerDock } from "@/widgets/restaurant/messenger-dock";
import { Navbar } from "@/widgets/restaurant/navbar";
import { Reservation } from "@/widgets/restaurant/reservation";
import { Story } from "@/widgets/restaurant/story";

/** Демо-сайт ресторана */
export function RestaurantPage() {
  return (
    <AppointmentProvider>
      <div className="theme-restaurant min-h-dvh bg-site-bg text-site-ink">
        <Navbar />
        <main>
          <Hero />
          <Story />
          <Menu />
          <Gallery />
          <Reservation />
        </main>
        <Contacts />
        <MessengerDock />
      </div>
    </AppointmentProvider>
  );
}
