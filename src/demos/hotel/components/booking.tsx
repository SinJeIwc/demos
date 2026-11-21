"use client";

import { differenceInCalendarDays, format } from "date-fns";
import { ru } from "date-fns/locale";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useMemo, useState } from "react";
import { DayPicker, type DateRange } from "react-day-picker";
import { FaTelegram, FaWhatsapp } from "react-icons/fa6";
import { toast } from "sonner";
import { IconCheck, IconMinus, IconPlus } from "@/components/icons/ui";
import { cn } from "@/lib/cn";
import { telegramLink, whatsappLink } from "@/lib/messengers";
import { hotel } from "../config";
import { formatMoney, useBooking } from "../booking-context";

function Stepper({
  label,
  hint,
  value,
  min,
  max,
  onChange,
}: {
  label: string;
  hint: string;
  value: number;
  min: number;
  max: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="flex items-center justify-between py-3">
      <div>
        <p className="font-medium">{label}</p>
        <p className="text-sm text-stone">{hint}</p>
      </div>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => onChange(Math.max(min, value - 1))}
          disabled={value <= min}
          className="grid size-10 place-items-center rounded-full border border-ink/15 transition-colors hover:border-ink/40 disabled:opacity-30"
          aria-label={`Уменьшить: ${label}`}
        >
          <IconMinus className="size-4" />
        </button>
        <motion.span key={value} initial={{ y: -8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="w-5 text-center tabular-nums">
          {value}
        </motion.span>
        <button
          type="button"
          onClick={() => onChange(Math.min(max, value + 1))}
          disabled={value >= max}
          className="grid size-10 place-items-center rounded-full border border-ink/15 transition-colors hover:border-ink/40 disabled:opacity-30"
          aria-label={`Увеличить: ${label}`}
        >
          <IconPlus className="size-4" />
        </button>
      </div>
    </div>
  );
}

const fmt = (d: Date) => format(d, "d MMMM", { locale: ru });
const nightsWord = (n: number) => {
  const m10 = n % 10;
  const m100 = n % 100;
  if (m10 === 1 && m100 !== 11) return "ночь";
  if (m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14)) return "ночи";
  return "ночей";
};

export function Booking() {
  const { roomId, setRoomId } = useBooking();
  const [range, setRange] = useState<DateRange | undefined>();
  const [adults, setAdults] = useState(2);
  const [kids, setKids] = useState(0);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");
  const [tried, setTried] = useState(false);
  const [months, setMonths] = useState(1);

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
  const guests = adults + kids;
  const tooMany = guests > room.maxGuests;

  const errors = {
    dates: nights < 1 ? "Выберите дату заезда и выезда в календаре" : null,
    name: name.trim().length < 2 ? "Укажите имя" : null,
    phone: phone.replace(/\D/g, "").length < 9 ? "Укажите телефон, чтобы мы перезвонили" : null,
  };
  const valid = !errors.dates && !errors.name && !errors.phone;

  const message = useMemo(() => {
    const lines = [
      `Здравствуйте! Хочу забронировать в «${hotel.fullName}».`,
      `Номер: ${room.name}`,
      range?.from && range?.to ? `Даты: ${fmt(range.from)} — ${fmt(range.to)} (${nights} ${nightsWord(nights)})` : "",
      `Гости: ${adults} взр.${kids ? `, ${kids} дет.` : ""}`,
      `Имя: ${name.trim()}`,
      `Телефон: ${phone.trim()}`,
      note.trim() ? `Пожелания: ${note.trim()}` : "",
      total ? `Предварительно: ${formatMoney(total)} ${hotel.currency}` : "",
    ];
    return lines.filter(Boolean).join("\n");
  }, [room, range, nights, adults, kids, name, phone, note, total]);

  const guard = () => {
    setTried(true);
    if (!valid) {
      toast.error(errors.dates ?? errors.name ?? errors.phone ?? "Проверьте форму");
      return false;
    }
    return true;
  };

  const sendWhatsApp = () => {
    if (!guard()) return;
    window.open(whatsappLink(hotel.contacts.whatsapp, message), "_blank", "noopener");
    toast.success("Заявка открыта в WhatsApp — осталось нажать «Отправить»");
  };

  const sendTelegram = async () => {
    if (!guard()) return;
    try {
      await navigator.clipboard.writeText(message);
      toast.success("Текст заявки скопирован — вставьте его в чат Telegram");
    } catch {
      toast("Откроем Telegram — напишите нам даты и количество гостей");
    }
    window.open(telegramLink(hotel.contacts.telegram), "_blank", "noopener");
  };

  const field =
    "w-full rounded-2xl border border-ink/12 bg-white px-4 py-3.5 outline-none transition-colors placeholder:text-stone/70 focus:border-lake";

  return (
    <section id="booking" className="bg-mist py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <h2 className="display-tight max-w-2xl text-[clamp(2.2rem,5.5vw,4.5rem)] font-light">Бронирование</h2>
        <p className="mt-4 max-w-lg text-stone">
          Выберите даты и номер — заявка уйдёт администратору в WhatsApp или Telegram. Отвечаем в течение 15 минут
          с 8:00 до 23:00.
        </p>

        <div className="mt-14 grid gap-6 lg:grid-cols-12">
          {/* Календарь и номер */}
          <div className="rounded-[32px] bg-white p-5 sm:p-8 lg:col-span-7">
            <h3 className="font-display text-lg font-normal">Даты</h3>
            <div className="mt-4 flex justify-center xl:justify-start">
              <DayPicker
                mode="range"
                locale={ru}
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

            <h3 className="mt-10 font-display text-lg font-normal">Номер</h3>
            <div className="mt-4 grid gap-3 sm:grid-cols-3" role="radiogroup" aria-label="Номер">
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
                      {formatMoney(r.pricePerNight)} {hotel.currency}
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
              <h3 className="font-display text-lg font-normal">Гости</h3>
              <div className="mt-2 divide-y divide-ink/10">
                <Stepper label="Взрослые" hint="от 14 лет" value={adults} min={1} max={8} onChange={setAdults} />
                <Stepper label="Дети" hint="до 14 лет" value={kids} min={0} max={6} onChange={setKids} />
              </div>
              {tooMany && (
                <p className="mt-3 text-sm text-felt">
                  В этом номере до {room.maxGuests} гостей. Выберите семейный коттедж или напишите нам — подберём вариант.
                </p>
              )}

              <h3 className="mt-8 font-display text-lg font-normal">Контакты</h3>
              <div className="mt-4 space-y-3">
                <label className="block">
                  <span className="sr-only">Имя</span>
                  <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Имя" className={field} autoComplete="name" />
                  {tried && errors.name && <span className="mt-1 block text-sm text-felt">{errors.name}</span>}
                </label>
                <label className="block">
                  <span className="sr-only">Телефон</span>
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Телефон, например +996 555 123 456"
                    className={field}
                    inputMode="tel"
                    autoComplete="tel"
                  />
                  {tried && errors.phone && <span className="mt-1 block text-sm text-felt">{errors.phone}</span>}
                </label>
                <label className="block">
                  <span className="sr-only">Пожелания</span>
                  <textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Пожелания: трансфер, детская кроватка, поздний заезд"
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
                    className="text-mist/70"
                  >
                    {nights ? `${nights} ${nightsWord(nights)}` : "даты не выбраны"}
                  </motion.span>
                </AnimatePresence>
              </div>
              {range?.from && range?.to && (
                <p className="mt-1 text-sm text-shallow">
                  {fmt(range.from)} — {fmt(range.to)}
                </p>
              )}
              <AnimatePresence mode="wait">
                <motion.p
                  key={total}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35 }}
                  className="mt-5 font-display text-4xl font-light tabular-nums"
                >
                  {total ? `${formatMoney(total)} ${hotel.currency}` : "—"}
                </motion.p>
              </AnimatePresence>
              <p className="mt-1 text-sm text-mist/60">Итог подтвердит администратор, оплата при заезде</p>

              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={sendWhatsApp}
                  className="flex items-center justify-center gap-2 rounded-2xl bg-[#25d366] px-5 py-4 font-medium text-ink transition-transform hover:scale-[1.02] active:scale-95"
                >
                  <FaWhatsapp className="size-5" /> Отправить в WhatsApp
                </button>
                <button
                  type="button"
                  onClick={sendTelegram}
                  className="flex items-center justify-center gap-2 rounded-2xl bg-[#2aabee] px-5 py-4 font-medium text-ink transition-transform hover:scale-[1.02] active:scale-95"
                >
                  <FaTelegram className="size-5" /> Отправить в Telegram
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
