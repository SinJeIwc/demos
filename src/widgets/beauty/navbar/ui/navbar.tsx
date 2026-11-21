"use client";

import { BeautyMark, useBeauty } from "@/entities/beauty";
import { useAppointment } from "@/features/appointment";
import { LocaleSwitcher } from "@/features/locale-switcher";
import { DemoNavbar } from "@/shared/ui/demo-navbar";

export function Navbar() {
  const b = useBeauty();
  const { scrollTo, openAppointment } = useAppointment();
  return (
    <DemoNavbar
      brand={
        <>
          <BeautyMark />
          <span className="font-site text-2xl">{b.name}</span>
        </>
      }
      links={[
        { href: "#services", label: b.nav.services },
        { href: "#masters", label: b.nav.masters },
        { href: "#works", label: b.nav.works },
        { href: "#contacts", label: b.nav.contacts },
      ]}
      ctaLabel={b.cta}
      onNavigate={scrollTo}
      onCta={() => openAppointment()}
      actions={<LocaleSwitcher tone="site" />}
    />
  );
}
