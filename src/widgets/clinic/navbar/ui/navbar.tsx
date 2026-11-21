"use client";

import { ClinicMark, useClinic } from "@/entities/clinic";
import { useAppointment } from "@/features/appointment";
import { LocaleSwitcher } from "@/features/locale-switcher";
import { DemoNavbar } from "@/shared/ui/demo-navbar";

export function Navbar() {
  const c = useClinic();
  const { scrollTo, openAppointment } = useAppointment();
  return (
    <DemoNavbar
      brand={
        <>
          <ClinicMark />
          <span className="font-site text-lg font-semibold tracking-tight">{c.name}</span>
        </>
      }
      links={[
        { href: "#services", label: c.nav.services },
        { href: "#results", label: c.nav.results },
        { href: "#doctors", label: c.nav.doctors },
        { href: "#visit", label: c.nav.visit },
        { href: "#contacts", label: c.nav.contacts },
      ]}
      ctaLabel={c.cta}
      onNavigate={scrollTo}
      onCta={() => openAppointment()}
      actions={<LocaleSwitcher tone="site" />}
    />
  );
}
