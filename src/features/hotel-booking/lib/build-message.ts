import type { Dictionary } from "@/shared/i18n";

type Input = {
  t: Dictionary["booking"];
  hotelName: string;
  roomName: string;
  dates?: string;
  nights: number;
  adults: number;
  kids: number;
  name: string;
  phone: string;
  note: string;
  total?: string;
};

/** Текст заявки, который уходит администратору в мессенджер */
export function buildBookingMessage(i: Input) {
  const m = i.t.message;
  return [
    m.hello(i.hotelName),
    `${m.room}: ${i.roomName}`,
    i.dates ? `${m.dates}: ${i.dates} (${i.t.nights(i.nights)})` : "",
    `${m.guestsLabel}: ${m.guests(i.adults, i.kids)}`,
    `${m.name}: ${i.name.trim()}`,
    `${m.phone}: ${i.phone.trim()}`,
    i.note.trim() ? `${m.note}: ${i.note.trim()}` : "",
    i.total ? `${m.total}: ${i.total}` : "",
  ]
    .filter(Boolean)
    .join("\n");
}
