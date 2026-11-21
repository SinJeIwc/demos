"use client";

import { RestaurantMark, useRestaurant } from "@/entities/restaurant";
import { useAppointment } from "@/features/appointment";
import { LocaleSwitcher } from "@/features/locale-switcher";
import { DemoNavbar } from "@/shared/ui/demo-navbar";

export function Navbar() {
  const r = useRestaurant();
  const { scrollTo, openAppointment } = useAppointment();
  return (
    <DemoNavbar
      overDark
      brand={
        <>
          <RestaurantMark />
          <span className="font-site text-xl">{r.name}</span>
        </>
      }
      links={[
        { href: "#story", label: r.nav.story },
        { href: "#menu", label: r.nav.menu },
        { href: "#gallery", label: r.nav.gallery },
        { href: "#appointment", label: r.nav.reservation },
        { href: "#contacts", label: r.nav.contacts },
      ]}
      ctaLabel={r.cta}
      onNavigate={scrollTo}
      onCta={() => openAppointment()}
      actions={<LocaleSwitcher tone="site" />}
    />
  );
}
