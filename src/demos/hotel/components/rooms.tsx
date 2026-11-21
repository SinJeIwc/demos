"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { FaWhatsapp } from "react-icons/fa6";
import { IconArea, IconArrow, IconBed, IconGuests } from "@/components/icons/ui";
import { whatsappLink } from "@/lib/messengers";
import { cn } from "@/lib/cn";
import { hotel } from "../config";
import { formatMoney, useBooking } from "../booking-context";

const ease = [0.22, 1, 0.36, 1] as const;

export function Rooms() {
  const { openBooking } = useBooking();

  return (
    <section id="rooms" className="bg-snow py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <h2 className="display-tight max-w-2xl text-[clamp(2.2rem,5.5vw,4.5rem)] font-light">
            Три способа проснуться у воды
          </h2>
          <p className="max-w-sm text-stone">
            Цены за ночь с завтраком. Летом лучше бронировать за месяц — номеров всего двенадцать.
          </p>
        </div>

        <div className="mt-16 space-y-24 sm:mt-24 sm:space-y-32">
          {hotel.rooms.map((room, i) => {
            const flip = i % 2 === 1;
            const ask = `Здравствуйте! Подскажите, свободен ли «${room.name}» на мои даты?`;
            return (
              <article
                key={room.id}
                className={cn("grid items-center gap-8 lg:grid-cols-12 lg:gap-12", flip && "lg:[&>*:first-child]:order-2")}
              >
                <motion.div
                  className="group relative aspect-[4/3] overflow-hidden rounded-[32px] lg:col-span-7"
                  initial={{ clipPath: "inset(12% 12% 12% 12% round 32px)" }}
                  whileInView={{ clipPath: "inset(0% 0% 0% 0% round 32px)" }}
                  viewport={{ once: true, margin: "-15% 0px" }}
                  transition={{ duration: 1.3, ease }}
                >
                  <Image
                    src={room.image}
                    alt={room.name}
                    fill
                    sizes="(min-width: 1024px) 58vw, 100vw"
                    className="object-cover transition-transform duration-[1400ms] ease-[var(--ease-lake)] group-hover:scale-[1.06]"
                  />
                  <div className="absolute left-5 top-5 rounded-full bg-snow/90 px-4 py-2 text-sm backdrop-blur">
                    от <b className="font-semibold">{formatMoney(room.pricePerNight)}</b> {hotel.currency} / ночь
                  </div>
                </motion.div>

                <div className="lg:col-span-5">
                  <h3 className="font-display text-3xl font-normal tracking-tight sm:text-4xl">{room.name}</h3>
                  <p className="mt-4 text-lg text-ink/75">{room.summary}</p>

                  <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-ink/80">
                    <li className="flex items-center gap-2">
                      <IconArea className="size-5 text-lake" /> {room.area} м²
                    </li>
                    <li className="flex items-center gap-2">
                      <IconGuests className="size-5 text-lake" /> до {room.maxGuests} гостей
                    </li>
                    <li className="flex items-center gap-2">
                      <IconBed className="size-5 text-lake" /> {room.bed}
                    </li>
                  </ul>

                  <ul className="mt-6 space-y-2 border-t border-ink/10 pt-6">
                    {room.features.map((f) => (
                      <li key={f} className="flex items-center gap-3">
                        <span className="felt-diamond scale-75" aria-hidden />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-10 flex flex-wrap gap-3">
                    <button
                      onClick={() => openBooking(room.id)}
                      className="group inline-flex items-center gap-3 rounded-full bg-ink px-6 py-4 text-snow transition-colors hover:bg-ink-2"
                    >
                      Забронировать этот номер
                      <IconArrow className="size-5 transition-transform duration-500 group-hover:translate-x-1" />
                    </button>
                    <a
                      href={whatsappLink(hotel.contacts.whatsapp, ask)}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-5 py-4 transition-colors hover:border-ink/40"
                    >
                      <FaWhatsapp className="size-5 text-[#1f9d55]" /> Спросить
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
