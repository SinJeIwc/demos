"use client";

import Link from "next/link";
import { localePath, useI18n } from "@/shared/i18n";
import { AraweareMark } from "@/shared/ui/brand";

export default function NotFound() {
  const { t, locale } = useI18n();
  return (
    <main className="grain grid min-h-dvh place-items-center bg-ink px-5 text-snow">
      <div className="max-w-md text-center">
        <AraweareMark className="mx-auto size-16" />
        <h1 className="display-tight mt-8 text-5xl font-light">{t.notFound.title}</h1>
        <p className="mt-4 text-mist/75">{t.notFound.text}</p>
        <Link
          href={localePath(locale)}
          className="mt-8 inline-flex rounded-full bg-dusk px-6 py-3 font-medium text-ink transition-transform hover:scale-[1.03]"
        >
          {t.notFound.cta}
        </Link>
      </div>
    </main>
  );
}
