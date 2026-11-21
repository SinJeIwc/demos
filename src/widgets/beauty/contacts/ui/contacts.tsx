"use client";

import Link from "next/link";
import { FaInstagram, FaTelegram, FaWhatsapp } from "react-icons/fa6";
import { BeautyMark, useBeauty } from "@/entities/beauty";
import { localePath, useI18n } from "@/shared/i18n";
import { instagramLink, telegramLink, whatsappLink } from "@/shared/lib/messengers";
import { AraweareLogo } from "@/shared/ui/brand";

export function Contacts() {
  const { t, locale } = useI18n();
  const b = useBeauty();
  const channels = [
    { label: "WhatsApp", value: b.contacts.phoneDisplay, href: whatsappLink(b.contacts.whatsapp), Icon: FaWhatsapp },
    { label: "Telegram", value: `@${b.contacts.telegram}`, href: telegramLink(b.contacts.telegram), Icon: FaTelegram },
    { label: "Instagram", value: `@${b.contacts.instagram}`, href: instagramLink(b.contacts.instagram), Icon: FaInstagram },
  ];

  return (
    <footer id="contacts" className="pt-24">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <h2 className="font-site text-[clamp(2.6rem,6vw,5rem)] leading-none">{b.location.title}</h2>
          <p className="mt-6 text-lg">{b.address}</p>
          <p className="mt-2 text-site-muted">{b.hours}</p>
          <ul className="mt-8 space-y-3">
            {channels.map(({ label, value, href, Icon }) => (
              <li key={label}>
                <a href={href} target="_blank" rel="noreferrer" className="group flex items-center gap-4 rounded-full border border-site-line py-2 pl-2 pr-6 transition-colors hover:bg-site-surface">
                  <span className="grid size-11 place-items-center rounded-full bg-site-accent text-site-accent-ink transition-colors group-hover:bg-site-alt group-hover:text-site-ink">
                    <Icon className="size-5" />
                  </span>
                  <span className="font-medium">{value}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="relative min-h-[380px] overflow-hidden rounded-t-[200px] rounded-b-[32px] lg:col-span-7">
          <iframe
            title={b.location.map}
            src={`https://www.google.com/maps?q=${encodeURIComponent(b.mapQuery)}&z=15&hl=${locale}&output=embed`}
            className="absolute inset-0 h-full w-full border-0 grayscale-[40%]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>

      <div className="mx-auto mt-20 flex max-w-7xl flex-col gap-3 border-t border-site-line px-5 py-8 text-sm text-site-muted sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <span className="flex items-center gap-3">
          <BeautyMark className="size-5" />
          {b.footer.disclaimer}
        </span>
        <Link href={localePath(locale)} className="flex items-center gap-2 hover:text-site-ink">
          {t.common.madeBy} <AraweareLogo className="[&>span:last-child]:text-base [&_svg]:size-6" />
        </Link>
      </div>
    </footer>
  );
}
