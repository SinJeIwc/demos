/** Что можно выбрать в форме записи. Контент передаёт сам сайт. */
export type AppointmentService = { id: string; name: string; price?: number; group?: string };
export type AppointmentStaff = { id: string; name: string; role?: string };

export type AppointmentConfig = {
  businessName: string;
  currency: string;
  contacts: { whatsapp: string; telegram: string };
  services?: AppointmentService[];
  staff?: AppointmentStaff[];
  /** Ресторан: спрашиваем количество гостей вместо специалиста */
  guests?: { min: number; max: number; initial: number };
  /** Часы работы в минутах от полуночи и шаг слотов */
  hours: { open: number; close: number; step: number };
  /** Подписи, которые отличаются у сайтов, например «Врач» вместо «Специалист» */
  labels?: { service?: string; staff?: string };
};
