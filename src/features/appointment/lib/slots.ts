import { isSameDay } from "date-fns";

const pad = (n: number) => String(n).padStart(2, "0");
export const minutesToTime = (m: number) => `${pad(Math.floor(m / 60))}:${pad(m % 60)}`;

/**
 * Слоты времени на выбранный день. Если день сегодняшний,
 * прошедшее время и ближайшие 30 минут недоступны.
 */
export function buildSlots(day: Date, hours: { open: number; close: number; step: number }, now = new Date()) {
  const slots: { time: string; disabled: boolean }[] = [];
  const nowMinutes = isSameDay(day, now) ? now.getHours() * 60 + now.getMinutes() + 30 : -1;
  for (let m = hours.open; m <= hours.close - hours.step; m += hours.step) {
    slots.push({ time: minutesToTime(m), disabled: m < nowMinutes });
  }
  return slots;
}
