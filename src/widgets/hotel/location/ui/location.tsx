"use client";

import { FaInstagram, FaTelegram, FaWhatsapp } from "react-icons/fa6";
import { useHotel } from "@/entities/hotel";
import { useI18n } from "@/shared/i18n";
import { instagramLink, telegramLink, whatsappLink } from "@/shared/lib/messengers";
import { IconPin } from "@/shared/ui/icons";

export function Location() {
  const { t, locale } = useI18n();
  const hotel = useHotel();
  const channels = [
    { label: "WhatsApp", value: hotel.contacts.phoneDisplay, href: whatsappLink(hotel.contacts.whatsapp), Icon: FaWhatsapp },
    { label: "Telegram", value: `@${hotel.contacts.telegram}`, href: telegramLink(hotel.contacts.telegram), Icon: FaTelegram },
    { label: "Instagram", value: `@${hotel.contacts.instagram}`, href: instagramLink(hotel.contacts.instagram), Icon: FaInstagram },
  ];

  return (
    <section id="location" className="bg-snow py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <h2 className="display-tight text-[clamp(2.2rem,5.5vw,4.5rem)] font-light">{t.hotel.location.title}</h2>
          <p className="mt-6 flex gap-3 text-ink/80">
            <IconPin className="mt-1 size-5 shrink-0 text-lake" />
            {hotel.address}
          </p>

          <ul className="mt-10 divide-y divide-ink/10 border-y border-ink/10">
            {hotel.routes.map((r) => (
              <li key={r.from} className="flex items-baseline justify-between gap-6 py-4">
                <span className="font-medium">{r.from}</span>
                <span className="text-right text-stone">{r.how}</span>
              </li>
            ))}
          </ul>

          <ul className="mt-10 space-y-3">
            {channels.map(({ label, value, href, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center gap-4 rounded-2xl border border-ink/10 p-4 transition-colors hover:border-ink/40"
                >
                  <span className="grid size-11 place-items-center rounded-full bg-ink text-snow transition-colors group-hover:bg-lake">
                    <Icon className="size-5" />
                  </span>
                  <span>
                    <span className="block text-sm text-stone">{label}</span>
                    <span className="block font-medium">{value}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative min-h-[420px] overflow-hidden rounded-[32px] bg-mist lg:col-span-7">
          <iframe
            title={t.hotel.location.map(hotel.fullName)}
            src={`https://www.google.com/maps?q=${encodeURIComponent(hotel.mapQuery)}&z=13&hl=${locale}&output=embed`}
            className="absolute inset-0 h-full w-full border-0 grayscale-[35%] contrast-[1.05]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}
