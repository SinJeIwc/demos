"use client";

import { AppointmentProvider } from "@/features/appointment";
import { BookingSection } from "@/widgets/beauty/booking";
import { Contacts } from "@/widgets/beauty/contacts";
import { Hero } from "@/widgets/beauty/hero";
import { Masters } from "@/widgets/beauty/masters";
import { MessengerDock } from "@/widgets/beauty/messenger-dock";
import { Navbar } from "@/widgets/beauty/navbar";
import { Services } from "@/widgets/beauty/services";
import { Works } from "@/widgets/beauty/works";

/** Демо-сайт салона красоты */
export function BeautyPage() {
  return (
    <AppointmentProvider>
      <div className="theme-beauty min-h-dvh bg-site-bg text-site-ink">
        <Navbar />
        <main>
          <Hero />
          <Services />
          <Masters />
          <Works />
          <BookingSection />
        </main>
        <Contacts />
        <MessengerDock />
      </div>
    </AppointmentProvider>
  );
}
