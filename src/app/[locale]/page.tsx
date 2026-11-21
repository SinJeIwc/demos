import { notFound } from "next/navigation";
import { isLocale } from "@/shared/i18n";
import { HomePage } from "@/views/home";

export const dynamic = "force-static";

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <HomePage locale={locale} />;
}
