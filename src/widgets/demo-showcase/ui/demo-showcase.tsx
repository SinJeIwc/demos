import Image from "next/image";
import Link from "next/link";
import { demos } from "@/entities/demo";
import { getDictionary, localePath, type Locale } from "@/shared/i18n";
import { cn } from "@/shared/lib/cn";
import { IconArrow } from "@/shared/ui/icons";

/** Сетка демо-сайтов: живые открываются, остальные помечены «Скоро» */
export function DemoShowcase({ locale }: { locale: Locale }) {
  const t = getDictionary(locale).home;

  return (
    <ul className="grid gap-5 sm:grid-cols-2">
      {demos.map((demo, i) => {
        const live = demo.status === "live";
        const title = demo.title[locale];
        const card = (
          <article
            className={cn(
              "group relative overflow-hidden rounded-[28px]",
              i === 0 ? "aspect-[4/5] sm:aspect-[5/6]" : "aspect-[4/3]",
            )}
          >
            <Image
              src={demo.cover}
              alt=""
              fill
              sizes="(min-width: 640px) 50vw, 100vw"
              priority={i === 0}
              className={cn(
                "object-cover transition-transform duration-[1200ms] ease-[var(--ease-lake)]",
                live ? "group-hover:scale-105" : "opacity-60 grayscale-[60%]",
              )}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6 sm:p-8">
              <div>
                <h2 className="font-display text-2xl font-normal tracking-tight sm:text-3xl">{title}</h2>
                <p className="mt-2 max-w-sm text-mist/80">{demo.pitch[locale]}</p>
              </div>
              {live ? (
                <span className="grid size-12 shrink-0 place-items-center rounded-full bg-dusk text-ink transition-transform duration-500 group-hover:-rotate-45">
                  <IconArrow className="size-5" />
                </span>
              ) : (
                <span className="shrink-0 rounded-full border border-mist/30 px-3 py-1 text-sm text-mist/70">{t.soon}</span>
              )}
            </div>
          </article>
        );

        return (
          <li key={demo.slug} className={i === 0 ? "sm:row-span-2" : ""}>
            {live ? (
              <Link href={localePath(locale, `/${demo.slug}`)} aria-label={`${t.openDemo}: ${title}`}>
                {card}
              </Link>
            ) : (
              card
            )}
          </li>
        );
      })}
    </ul>
  );
}
