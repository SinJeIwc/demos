import { getDictionary, type Locale } from "@/shared/i18n";
import { DemoShowcase } from "@/widgets/demo-showcase";
import { SiteHeader } from "@/widgets/site-header";

/** Главная araweare: кто мы и витрина демо-сайтов */
export function HomePage({ locale }: { locale: Locale }) {
  const t = getDictionary(locale).home;

  return (
    <main className="grain min-h-dvh bg-ink text-snow">
      <div className="mx-auto max-w-6xl px-5 pb-24 pt-8 sm:px-8 sm:pt-10">
        <SiteHeader locale={locale} />

        <p className="mt-16 flex items-center gap-3 text-sm text-shallow sm:mt-24">
          <span className="felt-diamond" aria-hidden />
          {t.label}
        </p>
        <h1 className="display-tight mt-6 max-w-4xl text-balance text-[clamp(2.4rem,7vw,5.5rem)] font-light">{t.title}</h1>
        <p className="mt-6 max-w-xl text-lg text-mist/80">{t.lead}</p>

        <div className="mt-16">
          <DemoShowcase locale={locale} />
        </div>
      </div>
    </main>
  );
}
