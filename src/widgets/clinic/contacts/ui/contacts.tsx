"use client";

import Link from "next/link";
import { FaInstagram, FaTelegram, FaWhatsapp } from "react-icons/fa6";
import { ClinicMark, useClinic } from "@/entities/clinic";
import { localePath, useI18n } from "@/shared/i18n";
import { instagramLink, telegramLink, whatsappLink } from "@/shared/lib/messengers";
import { AraweareLogo } from "@/shared/ui/brand";
import { IconPin } from "@/shared/ui/icons";

/** Контакты, карта и подвал стоматологии */
export function Contacts() {
  const { t, locale } = useI18n();
  const c = useClinic();
  const channels = [
    { label: "WhatsApp", value: c.contacts.phoneDisplay, href: whatsappLink(c.contacts.whatsapp), Icon: FaWhatsapp },
    { label: "Telegram", value: `@${c.contacts.telegram}`, href: telegramLink(c.contacts.telegram), Icon: FaTelegram },
    { label: "Instagram", value: `@${c.contacts.instagram}`, href: instagramLink(c.contacts.instagram), Icon: FaInstagram },
  ];

  return (
    <footer id="contacts" className="bg-site-ink pt-24 text-site-bg">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <h2 className="font-site text-[clamp(2.2rem,5vw,3.75rem)] font-semibold leading-none tracking-[-0.03em]">{c.location.title}</h2>
          <p className="mt-6 flex gap-3 text-lg">
            <IconPin className="mt-1 size-5 shrink-0 text-site-alt" />
            {c.address}
          </p>
          <p className="mt-3 opacity-70">{c.hours}</p>
          <p className="mt-1 opacity-70">{c.location.transport}</p>
          <ul className="mt-8 space-y-3">
            {channels.map(({ label, value, href, Icon }) => (
              <li key={label}>
                <a href={href} target="_blank" rel="noreferrer" className="group flex items-center gap-4 rounded-2xl border border-white/15 p-4 transition-colors hover:border-white/40">
                  <span className="grid size-11 place-items-center rounded-full bg-site-alt text-site-ink">
                    <Icon className="size-5" />
                  </span>
                  <span>
                    <span className="block text-sm opacity-60">{label}</span>
                    <span className="block font-medium">{value}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="relative min-h-[380px] overflow-hidden rounded-[32px] bg-white/5 lg:col-span-7">
          <iframe
            title={c.location.map}
            src={`https://www.google.com/maps?q=${encodeURIComponent(c.mapQuery)}&z=15&hl=${locale}&output=embed`}
            className="absolute inset-0 h-full w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>

      <div className="mx-auto mt-20 flex max-w-7xl flex-col gap-3 border-t border-white/10 px-5 py-8 text-sm opacity-60 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <span className="flex items-center gap-3">
          <ClinicMark className="size-5" />
          {c.footer.disclaimer}
        </span>
        <Link href={localePath(locale)} className="flex items-center gap-2 hover:opacity-100">
          {t.common.madeBy} <AraweareLogo className="[&>span:last-child]:text-base [&_svg]:size-6" />
        </Link>
      </div>
    </footer>
  );
}
