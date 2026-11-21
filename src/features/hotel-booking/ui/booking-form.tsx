"use client";

import { differenceInCalendarDays, format } from "date-fns";
import { enUS, ru as ruLocale } from "date-fns/locale";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useMemo, useState } from "react";
import { DayPicker, type DateRange } from "react-day-picker";
import { FaTelegram, FaWhatsapp } from "react-icons/fa6";
import { toast } from "sonner";
import { useHotel } from "@/entities/hotel";
import { useI18n } from "@/shared/i18n";
import { cn } from "@/shared/lib/cn";
import { formatMoney } from "@/shared/lib/format";
import { telegramLink, whatsappLink } from "@/shared/lib/messengers";
import { IconCheck } from "@/shared/ui/icons";
import { buildBookingMessage } from "../lib/build-message";
import { useBooking } from "../model/booking-context";
import { Stepper } from "./stepper";

const field =
  "w-full rounded-2xl border border-ink/12 bg-white px-4 py-3.5 outline-none transition-colors placeholder:text-stone/70 focus:border-lake";

/** Форма брони: даты, номер, гости, контакты → заявка в WhatsApp или Telegram */
export function BookingForm() {
  const { t, locale } = useI18n();
  const tb = t.booking;
  const hotel = useHotel();
  const { roomId, setRoomId } = useBooking();
  const dateLocale = locale === "ru" ? ruLocale : enUS;

  const [range, setRange] = useState<DateRange | undefined>();
  const [adults, setAdults] = useState(2);
  const [kids, setKids] = useState(0);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");
  const [tried, setTried] = useState(false);
  const [months, setMonths] = useState(1);

  // Два месяца в календаре на широких экранах
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1280px)");
    const apply = () => setMonths(mq.matches ? 2 : 1);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  const room = hotel.rooms.find((r) => r.id === roomId) ?? hotel.rooms[0];
  const nights = range?.from && range?.to ? differenceInCalendarDays(range.to, range.from) : 0;
  const total = nights * room.pricePerNight;
  const totalText = total ? `${formatMoney(total, locale)} ${hotel.currency}` : "";
  const fmt = (d: Date) => format(d, locale === "ru" ? "d MMMM" : "MMMM d", { locale: dateLocale });
  const datesText = range?.from && range?.to ? `${fmt(range.from)} — ${fmt(range.to)}` : "";
  const tooMany = adults + kids > room.maxGuests;

  const errors = {
    dates: nights < 1 ? tb.errors.dates : null,
    name: name.trim().length < 2 ? tb.errors.name : null,
    phone: phone.replace(/\D/g, "").length < 9 ? tb.errors.phone : null,
  };
  const firstError = errors.dates ?? errors.name ?? errors.phone;

  const message = useMemo(
    () =>
      buildBookingMessage({
        t: tb,
        hotelName: hotel.fullName,
        roomName: room.name,
        dates: datesText,
        nights,
        adults,
        kids,
        name,
        phone,
        note,
        total: totalText,
      }),
    [tb, hotel.fullName, room.name, datesText, nights, adults, kids, name, phone, note, totalText],
  );

  const guard = () => {
    setTried(true);
    if (firstError) {
      toast.error(firstError);
      return false;
    }
    return true;
  };

  const sendWhatsApp = () => {
    if (!guard()) return;
    window.open(whatsappLink(hotel.contacts.whatsapp, message), "_blank", "noopener");
    toast.success(tb.toast.whatsapp);
  };

  const sendTelegram = async () => {
    if (!guard()) return;
    try {
      await navigator.clipboard.writeText(message);
      toast.success(tb.toast.telegramCopied);
    } catch {
      toast(tb.toast.telegramFallback);
    }
    window.open(telegramLink(hotel.contacts.telegram), "_blank", "noopener");
  };

  return (
    <div className="grid gap-6 lg:grid-cols-12">
      {/* Календарь и номер */}
      <div className="rounded-[32px] bg-white p-5 sm:p-8 lg:col-span-7">
        <h3 className="font-display text-lg font-normal">{tb.dates}</h3>
        <div className="mt-4 flex justify-center xl:justify-start">
          <DayPicker
            mode="range"
            locale={dateLocale}
            numberOfMonths={months}
            selected={range}
            onSelect={setRange}
            min={1}
            excludeDisabled
            disabled={{ before: new Date() }}
            weekStartsOn={1}
          />
        </div>
        {tried && errors.dates && <p className="mt-2 text-sm text-felt">{errors.dates}</p>}

        <h3 className="mt-10 font-display text-lg font-normal">{tb.room}</h3>
        <div className="mt-4 grid gap-3 sm:grid-cols-3" role="radiogroup" aria-label={tb.room}>
          {hotel.rooms.map((r) => {
            const on = r.id === room.id;
            return (
              <button
                key={r.id}
                type="button"
                role="radio"
                aria-checked={on}
                onClick={() => setRoomId(r.id)}
                className={cn(
                  "relative rounded-2xl border p-4 text-left transition-colors",
                  on ? "border-ink bg-ink text-snow" : "border-ink/12 hover:border-ink/40",
                )}
              >
                <span className="block pr-6 font-medium leading-snug">{r.name}</span>
                <span className={cn("mt-1 block text-sm", on ? "text-shallow" : "text-stone")}>
                  {formatMoney(r.pricePerNight, locale)} {hotel.currency}
                </span>
                {on && <IconCheck className="absolute right-3 top-3 size-5 text-dusk" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Гости, контакты и итог */}
      <div className="flex flex-col gap-6 lg:col-span-5">
        <div className="rounded-[32px] bg-white p-5 sm:p-8">
          <h3 className="font-display text-lg font-normal">{tb.guests}</h3>
          <div className="mt-2 divide-y divide-ink/10">
            <Stepper label={tb.adults} hint={tb.adultsHint} value={adults} min={1} max={8} onChange={setAdults} />
            <Stepper label={tb.kids} hint={tb.kidsHint} value={kids} min={0} max={6} onChange={setKids} />
          </div>
          {tooMany && <p className="mt-3 text-sm text-felt">{tb.tooMany(room.maxGuests)}</p>}

          <h3 className="mt-8 font-display text-lg font-normal">{tb.contacts}</h3>
          <div className="mt-4 space-y-3">
            <label className="block">
              <span className="sr-only">{tb.name}</span>
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder={tb.name} className={field} autoComplete="name" />
              {tried && errors.name && <span className="mt-1 block text-sm text-felt">{errors.name}</span>}
            </label>
            <label className="block">
              <span className="sr-only">{tb.phone}</span>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder={tb.phonePlaceholder}
                className={field}
                inputMode="tel"
                autoComplete="tel"
              />
              {tried && errors.phone && <span className="mt-1 block text-sm text-felt">{errors.phone}</span>}
            </label>
            <label className="block">
              <span className="sr-only">{tb.note}</span>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder={tb.notePlaceholder}
                rows={2}
                className={cn(field, "resize-none")}
              />
            </label>
          </div>
        </div>

        <div className="grain overflow-hidden rounded-[32px] bg-ink p-6 text-snow sm:p-8">
          <div className="flex items-baseline justify-between gap-4">
            <span className="text-mist/70">{room.name}</span>
            <AnimatePresence mode="wait">
              <motion.span
                key={nights}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className="shrink-0 text-mist/70"
              >
                {nights ? tb.nights(nights) : tb.noDates}
              </motion.span>
            </AnimatePresence>
          </div>
          {datesText && <p className="mt-1 text-sm text-shallow">{datesText}</p>}
          <AnimatePresence mode="wait">
            <motion.p
              key={total}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35 }}
              className="mt-5 font-display text-4xl font-light tabular-nums"
            >
              {totalText || "—"}
            </motion.p>
          </AnimatePresence>
          <p className="mt-1 text-sm text-mist/60">{tb.totalNote}</p>

          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={sendWhatsApp}
              className="flex items-center justify-center gap-2 rounded-2xl bg-[#25d366] px-5 py-4 font-medium text-ink transition-transform hover:scale-[1.02] active:scale-95"
            >
              <FaWhatsapp className="size-5" /> {tb.sendWhatsApp}
            </button>
            <button
              type="button"
              onClick={sendTelegram}
              className="flex items-center justify-center gap-2 rounded-2xl bg-[#2aabee] px-5 py-4 font-medium text-ink transition-transform hover:scale-[1.02] active:scale-95"
            >
              <FaTelegram className="size-5" /> {tb.sendTelegram}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
