"use client";

import { useHotel } from "@/entities/hotel";
import { useI18n } from "@/shared/i18n";
import { MessengerDock as Dock } from "@/shared/ui/messenger-dock";

/** Кнопка связи отеля: общая кнопка из shared с контактами отеля */
export function MessengerDock() {
  const { t } = useI18n();
  const { contacts } = useHotel();
  return <Dock contacts={contacts} waMessage={t.hotel.dock.waMessage} />;
}
