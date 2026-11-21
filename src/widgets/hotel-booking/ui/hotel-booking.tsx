"use client";

import { BookingForm } from "@/features/hotel-booking";
import { useI18n } from "@/shared/i18n";

export function HotelBooking() {
  const { t } = useI18n();
  return (
    <section id="booking" className="bg-mist py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <h2 className="display-tight max-w-2xl text-[clamp(2.2rem,5.5vw,4.5rem)] font-light">{t.booking.title}</h2>
        <p className="mt-4 max-w-lg text-stone">{t.booking.lead}</p>
        <div className="mt-14">
          <BookingForm />
        </div>
      </div>
    </section>
  );
}
