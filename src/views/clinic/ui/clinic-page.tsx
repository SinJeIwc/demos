"use client";

import { AppointmentProvider } from "@/features/appointment";
import { Appointment } from "@/widgets/clinic/appointment";
import { Contacts } from "@/widgets/clinic/contacts";
import { Doctors } from "@/widgets/clinic/doctors";
import { Hero } from "@/widgets/clinic/hero";
import { MessengerDock } from "@/widgets/clinic/messenger-dock";
import { Navbar } from "@/widgets/clinic/navbar";
import { Results } from "@/widgets/clinic/results";
import { Services } from "@/widgets/clinic/services";
import { Steps } from "@/widgets/clinic/steps";

/** Демо-сайт стоматологии */
export function ClinicPage() {
  return (
    <AppointmentProvider>
      <div className="theme-clinic font-site min-h-dvh bg-site-bg text-site-ink">
        <Navbar />
        <main>
          <Hero />
          <Services />
          <Results />
          <Steps />
          <Doctors />
          <Appointment />
        </main>
        <Contacts />
        <MessengerDock />
      </div>
    </AppointmentProvider>
  );
}
