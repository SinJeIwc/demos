"use client";

import { useBeauty } from "@/entities/beauty";
import { MessengerDock as Dock } from "@/shared/ui/messenger-dock";

export function MessengerDock() {
  const b = useBeauty();
  return <Dock contacts={b.contacts} waMessage={b.dock.waMessage} buttonClassName="bg-site-ink text-site-alt" pulseClassName="bg-site-alt/60" />;
}
