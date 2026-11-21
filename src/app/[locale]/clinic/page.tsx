import type { Metadata } from "next";
import { getClinic } from "@/entities/clinic";
import { isLocale, languageAlternates } from "@/shared/i18n";
import { ClinicPage } from "@/views/clinic";

export const dynamic = "force-static";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const c = getClinic(locale);
  return {
    title: `${c.name} — ${locale === "ru" ? "стоматология в Бишкеке" : "dental clinic in Bishkek"}`,
    description: c.hero.lead,
    alternates: { canonical: `/${locale}/clinic`, languages: languageAlternates("/clinic") },
    openGraph: { title: c.fullName, description: c.hero.lead, url: `/${locale}/clinic` },
  };
}

export default function Page() {
  return <ClinicPage />;
}
