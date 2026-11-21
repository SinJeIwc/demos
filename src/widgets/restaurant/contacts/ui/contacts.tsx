"use client";

import Link from "next/link";
import { FaInstagram, FaTelegram, FaWhatsapp } from "react-icons/fa6";
import { RestaurantMark, useRestaurant } from "@/entities/restaurant";
import { localePath, useI18n } from "@/shared/i18n";
import { instagramLink, telegramLink, whatsappLink } from "@/shared/lib/messengers";
import { AraweareLogo } from "@/shared/ui/brand";

export function Contacts() {
  const { t, locale } = useI18n();
  const r = useRestaurant();
  const channels = [
    { label: "WhatsApp", value: r.contacts.phoneDisplay, href: whatsappLink(r.contacts.whatsapp), Icon: FaWhatsapp },
    { label: "Telegram", value: `@${r.contacts.telegram}`, href: telegramLink(r.contacts.telegram), Icon: FaTelegram },
    { label: "Instagram", value: `@${r.contacts.instagram}`, href: instagramLink(r.contacts.instagram), Icon: FaInstagram },
  ];

  return (
    <footer id="contacts" className="border-t border-site-line pt-24">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <h2 className="font-site text-[clamp(2.2rem,5vw,4rem)] leading-none">{r.location.title}</h2>
          <p className="mt-6 text-lg">{r.address}</p>
          <p className="mt-2 text-site-muted">{r.hours}</p>
          <ul className="mt-8 flex flex-wrap gap-3">
            {channels.map(({ label, value, href, Icon }) => (
              <li key={label}>
                <a href={href} target="_blank" rel="noreferrer" title={value} className="flex items-center gap-2 rounded-full border border-site-line px-4 py-2.5 transition-colors hover:border-site-accent hover:text-site-accent">
                  <Icon className="size-4" /> {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="relative min-h-[360px] overflow-hidden rounded-[28px] lg:col-span-7">
          <iframe
            title={r.location.map}
            src={`https://www.google.com/maps?q=${encodeURIComponent(r.mapQuery)}&z=15&hl=${locale}&output=embed`}
            className="absolute inset-0 h-full w-full border-0 opacity-90 invert-[0.9] hue-rotate-180"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>

      <p aria-hidden className="font-site mt-20 select-none text-center text-[clamp(5rem,26vw,24rem)] leading-[0.8] text-site-surface">
        {r.name}
      </p>

      <div className="mx-auto flex max-w-7xl flex-col gap-3 border-t border-site-line px-5 py-8 text-sm text-site-muted sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <span className="flex items-center gap-3">
          <RestaurantMark className="size-5" />
          {r.footer.disclaimer}
        </span>
        <Link href={localePath(locale)} className="flex items-center gap-2 hover:text-site-ink">
          {t.common.madeBy} <AraweareLogo className="[&>span:last-child]:text-base [&_svg]:size-6" />
        </Link>
      </div>
    </footer>
  );
}
