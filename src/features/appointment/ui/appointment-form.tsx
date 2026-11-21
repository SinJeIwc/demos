"use client";

import { format } from "date-fns";
import { enUS, ru as ruLocale } from "date-fns/locale";
import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";
import { DayPicker } from "react-day-picker";
import { FaTelegram, FaWhatsapp } from "react-icons/fa6";
import { toast } from "sonner";
import { useI18n } from "@/shared/i18n";
import { cn } from "@/shared/lib/cn";
import { formatMoney } from "@/shared/lib/format";
import { telegramLink, whatsappLink } from "@/shared/lib/messengers";
import { IconMinus, IconPlus } from "@/shared/ui/icons";
import { buildSlots } from "../lib/slots";
import { useAppointment } from "../model/appointment-context";
import type { AppointmentConfig } from "../model/types";

const card = "rounded-[28px] border border-site-line bg-site-surface p-5 sm:p-7";
const field =
  "w-full rounded-2xl border border-site-line bg-site-bg/60 px-4 py-3.5 text-site-ink outline-none transition-colors placeholder:text-site-muted/80 focus:border-site-ink";
const chip = (on: boolean) =>
  cn(
    "rounded-full border px-4 py-2 text-sm transition-colors",
    on ? "border-site-accent bg-site-accent text-site-accent-ink" : "border-site-line hover:border-site-ink/40",
  );

/**
 * Универсальная запись: услуга → специалист или гости → дата → время → контакты.
 * Цвета берёт из темы сайта (токены site-*), тексты — из словаря appointment.
 */
export function AppointmentForm({ config }: { config: AppointmentConfig }) {
  const { t, locale } = useI18n();
  const ta = t.appointment;
  const { serviceId, staffId, setServiceId, setStaffId } = useAppointment();
  const dateLocale = locale === "ru" ? ruLocale : enUS;

  const [day, setDay] = useState<Date | undefined>();
  const [time, setTime] = useState<string | null>(null);
  const [guests, setGuests] = useState(config.guests?.initial ?? 2);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");
  const [tried, setTried] = useState(false);

  const services = config.services ?? [];
  const staff = config.staff ?? [];
  const service = services.find((s) => s.id === serviceId);
  const person = staff.find((s) => s.id === staffId);
  const slots = useMemo(() => (day ? buildSlots(day, config.hours) : []), [day, config.hours]);
  const freeSlots = slots.filter((s) => !s.disabled);
  const whenText = day && time ? `${format(day, locale === "ru" ? "d MMMM, EEEEEE" : "EEE, MMMM d", { locale: dateLocale })}, ${time}` : "";

  const errors = {
    service: services.length && !service ? ta.errors.service : null,
    date: !day ? ta.errors.date : null,
    time: day && !time ? ta.errors.time : null,
    name: name.trim().length < 2 ? ta.errors.name : null,
    phone: phone.replace(/\D/g, "").length < 9 ? ta.errors.phone : null,
  };
  const firstError = errors.service ?? errors.date ?? errors.time ?? errors.name ?? errors.phone;

  const message = [
    ta.message.hello(config.businessName),
    service ? `${config.labels?.service ?? ta.message.service}: ${service.name}` : "",
    staff.length ? `${config.labels?.staff ?? ta.message.staff}: ${person?.name ?? ta.anyStaff}` : "",
    whenText ? `${ta.message.when}: ${whenText}` : "",
    config.guests ? `${ta.message.guests}: ${guests}` : "",
    `${ta.message.name}: ${name.trim()}`,
    `${ta.message.phone}: ${phone.trim()}`,
    note.trim() ? `${ta.message.note}: ${note.trim()}` : "",
  ]
    .filter(Boolean)
    .join("\n");

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
    window.open(whatsappLink(config.contacts.whatsapp, message), "_blank", "noopener");
    toast.success(ta.toast.whatsapp);
  };

  const sendTelegram = async () => {
    if (!guard()) return;
    try {
      await navigator.clipboard.writeText(message);
      toast.success(ta.toast.telegramCopied);
    } catch {
      toast(ta.toast.telegramFallback);
    }
    window.open(telegramLink(config.contacts.telegram), "_blank", "noopener");
  };

  const err = (e: string | null) => tried && e && <p className="mt-2 text-sm text-[#d4533b]">{e}</p>;

  return (
    <div className="grid gap-5 lg:grid-cols-12">
      <div className="flex flex-col gap-5 lg:col-span-7">
        {services.length > 0 && (
          <div className={card}>
            <h3 className="font-site text-lg">{config.labels?.service ?? ta.service}</h3>
            <div className="mt-4 flex flex-wrap gap-2" role="radiogroup" aria-label={config.labels?.service ?? ta.service}>
              {services.map((s) => (
                <button key={s.id} type="button" role="radio" aria-checked={s.id === serviceId} onClick={() => setServiceId(s.id)} className={chip(s.id === serviceId)}>
                  {s.name}
                  {s.price ? <span className="ml-2 opacity-60">{formatMoney(s.price, locale)}</span> : null}
                </button>
              ))}
            </div>
            {err(errors.service)}
          </div>
        )}

        {staff.length > 0 && (
          <div className={card}>
            <h3 className="font-site text-lg">{config.labels?.staff ?? ta.staff}</h3>
            <div className="mt-4 flex flex-wrap gap-2" role="radiogroup" aria-label={config.labels?.staff ?? ta.staff}>
              <button type="button" role="radio" aria-checked={!staffId} onClick={() => setStaffId(null)} className={chip(!staffId)}>
                {ta.anyStaff}
              </button>
              {staff.map((s) => (
                <button key={s.id} type="button" role="radio" aria-checked={s.id === staffId} onClick={() => setStaffId(s.id)} className={chip(s.id === staffId)}>
                  {s.name}
                  {s.role ? <span className="ml-2 opacity-60">{s.role}</span> : null}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className={cn(card, "grid gap-6 md:grid-cols-[auto_1fr]")}>
          <div>
            <h3 className="font-site text-lg">{ta.date}</h3>
            <DayPicker
              mode="single"
              locale={dateLocale}
              selected={day}
              onSelect={(d) => {
                setDay(d);
                setTime(null);
              }}
              disabled={{ before: new Date() }}
              weekStartsOn={1}
              className="mt-3"
            />
            {err(errors.date)}
          </div>
          <div>
            <h3 className="font-site text-lg">{ta.time}</h3>
            {!day ? (
              <p className="mt-4 text-sm text-site-muted">{ta.pickDateFirst}</p>
            ) : freeSlots.length === 0 ? (
              <p className="mt-4 text-sm text-site-muted">{ta.noSlots}</p>
            ) : (
              <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-3 xl:grid-cols-4">
                {slots.map((s) => (
                  <button
                    key={s.time}
                    type="button"
                    disabled={s.disabled}
                    onClick={() => setTime(s.time)}
                    aria-pressed={time === s.time}
                    className={cn(
                      "rounded-xl border py-2.5 text-sm tabular-nums transition-colors disabled:cursor-not-allowed disabled:opacity-30",
                      time === s.time ? "border-site-accent bg-site-accent text-site-accent-ink" : "border-site-line hover:border-site-ink/40",
                    )}
                  >
                    {s.time}
                  </button>
                ))}
              </div>
            )}
            {err(errors.time)}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-5 lg:col-span-5">
        <div className={card}>
          {config.guests && (
            <div className="mb-6 flex items-center justify-between border-b border-site-line pb-6">
              <h3 className="font-site text-lg">{ta.guests}</h3>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setGuests((g) => Math.max(config.guests!.min, g - 1))}
                  disabled={guests <= config.guests.min}
                  className="grid size-10 place-items-center rounded-full border border-site-line disabled:opacity-30"
                  aria-label={`− ${ta.guests}`}
                >
                  <IconMinus className="size-4" />
                </button>
                <span className="w-6 text-center tabular-nums">{guests}</span>
                <button
                  type="button"
                  onClick={() => setGuests((g) => Math.min(config.guests!.max, g + 1))}
                  disabled={guests >= config.guests.max}
                  className="grid size-10 place-items-center rounded-full border border-site-line disabled:opacity-30"
                  aria-label={`+ ${ta.guests}`}
                >
                  <IconPlus className="size-4" />
                </button>
              </div>
            </div>
          )}
          <h3 className="font-site text-lg">{ta.contacts}</h3>
          <div className="mt-4 space-y-3">
            <label className="block">
              <span className="sr-only">{ta.name}</span>
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder={ta.name} className={field} autoComplete="name" />
              {err(errors.name)}
            </label>
            <label className="block">
              <span className="sr-only">{ta.phone}</span>
              <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder={ta.phonePlaceholder} className={field} inputMode="tel" autoComplete="tel" />
              {err(errors.phone)}
            </label>
            <label className="block">
              <span className="sr-only">{ta.note}</span>
              <textarea value={note} onChange={(e) => setNote(e.target.value)} placeholder={ta.note} rows={2} className={cn(field, "resize-none")} />
            </label>
          </div>
        </div>

        <div className="rounded-[28px] bg-site-ink p-6 text-site-bg sm:p-7">
          <p className="text-sm opacity-60">{ta.summary}</p>
          <AnimatePresence mode="wait">
            <motion.div key={`${serviceId}-${staffId}-${whenText}-${guests}`} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
              <p className="mt-3 font-site text-2xl leading-snug">{service?.name ?? config.businessName}</p>
              <p className="mt-2 opacity-75">{whenText || ta.notSelected}</p>
              {staff.length > 0 && <p className="opacity-75">{person?.name ?? ta.anyStaff}</p>}
              {config.guests && (
                <p className="opacity-75">
                  {ta.guests}: {guests}
                </p>
              )}
              {service?.price ? (
                <p className="mt-3 font-site text-3xl">
                  {formatMoney(service.price, locale)} {config.currency}
                </p>
              ) : null}
            </motion.div>
          </AnimatePresence>
          <p className="mt-3 text-sm opacity-50">{ta.confirmNote}</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            <button type="button" onClick={sendWhatsApp} className="flex items-center justify-center gap-2 rounded-2xl bg-[#25d366] px-5 py-4 font-medium text-[#0b2a1a] transition-transform hover:scale-[1.02] active:scale-95">
              <FaWhatsapp className="size-5" /> {ta.sendWhatsApp}
            </button>
            <button type="button" onClick={sendTelegram} className="flex items-center justify-center gap-2 rounded-2xl bg-[#2aabee] px-5 py-4 font-medium text-[#062033] transition-transform hover:scale-[1.02] active:scale-95">
              <FaTelegram className="size-5" /> {ta.sendTelegram}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
