"use client";

import { useRestaurant } from "@/entities/restaurant";
import { MessengerDock as Dock } from "@/shared/ui/messenger-dock";

export function MessengerDock() {
  const r = useRestaurant();
  return <Dock contacts={r.contacts} waMessage={r.dock.waMessage} buttonClassName="bg-site-accent text-site-accent-ink" pulseClassName="bg-site-accent/50" />;
}
