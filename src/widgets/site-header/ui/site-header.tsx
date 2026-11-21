import Link from "next/link";
import { LocaleSwitcher } from "@/features/locale-switcher";
import { localePath, type Locale } from "@/shared/i18n";
import { AraweareLogo } from "@/shared/ui/brand";

/** Шапка главной araweare: логотип и переключатель языка */
export function SiteHeader({ locale }: { locale: Locale }) {
  return (
    <header className="flex items-center justify-between">
      <Link href={localePath(locale)} aria-label="araweare">
        <AraweareLogo />
      </Link>
      <LocaleSwitcher />
    </header>
  );
}
