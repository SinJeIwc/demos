"use client";

import { useClinic } from "@/entities/clinic";
import { MessengerDock as Dock } from "@/shared/ui/messenger-dock";

export function MessengerDock() {
  const c = useClinic();
  return <Dock contacts={c.contacts} waMessage={c.dock.waMessage} buttonClassName="bg-site-ink text-site-bg" pulseClassName="bg-site-alt/60" />;
}
