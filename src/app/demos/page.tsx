import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { demos } from "@/demos/registry";
import { IconArrow } from "@/components/icons/ui";
import { AraweareLogo } from "@/components/brand/logo";

// Страница собирается один раз при сборке и раздаётся с CDN
export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Демо-сайты — araweare",
  alternates: { canonical: "/demos" },
};

export default function DemosHub() {
  return (
    <main className="grain min-h-dvh bg-ink text-snow">
      <div className="mx-auto max-w-6xl px-5 pb-24 pt-8 sm:px-8 sm:pt-10">
        <header className="flex items-center justify-between">
          <AraweareLogo />
          <span className="text-sm text-mist/60">Демо-сайты</span>
        </header>
        <h1 className="display-tight mt-16 sm:mt-24 max-w-4xl text-balance text-[clamp(2.4rem,7vw,5.5rem)] font-light">
          Посмотрите, как может выглядеть сайт вашего бизнеса
        </h1>
        <p className="mt-6 max-w-xl text-lg text-mist/80">
          Каждый пример — готовый сайт с заявками в WhatsApp и Telegram. Выберите свою сферу и
          откройте демо.
        </p>

        <ul className="mt-16 grid gap-5 sm:grid-cols-2">
          {demos.map((demo, i) => {
            const live = demo.status === "live";
            const card = (
              <article
                className={`group relative overflow-hidden rounded-[28px] ${
                  i === 0 ? "aspect-[4/5] sm:aspect-[5/6]" : "aspect-[4/3]"
                }`}
              >
                <Image
                  src={demo.cover}
                  alt=""
                  fill
                  sizes="(min-width: 640px) 50vw, 100vw"
                  className={`object-cover transition-transform duration-[1200ms] ease-[var(--ease-lake)] ${
                    live ? "group-hover:scale-105" : "grayscale-[60%] opacity-60"
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6 sm:p-8">
                  <div>
                    <h2 className="font-display text-2xl font-normal tracking-tight sm:text-3xl">
                      {demo.title}
                    </h2>
                    <p className="mt-2 max-w-sm text-mist/80">{demo.pitch}</p>
                  </div>
                  {live ? (
                    <span className="grid size-12 shrink-0 place-items-center rounded-full bg-dusk text-ink transition-transform duration-500 group-hover:-rotate-45">
                      <IconArrow className="size-5" />
                    </span>
                  ) : (
                    <span className="shrink-0 rounded-full border border-mist/30 px-3 py-1 text-sm text-mist/70">
                      Скоро
                    </span>
                  )}
                </div>
              </article>
            );

            return (
              <li key={demo.slug} className={i === 0 ? "sm:row-span-2" : ""}>
                {live ? (
                  <Link href={`/${demo.slug}`} aria-label={`Открыть демо: ${demo.title}`}>
                    {card}
                  </Link>
                ) : (
                  card
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </main>
  );
}
