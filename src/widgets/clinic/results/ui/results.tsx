"use client";

import { useClinic } from "@/entities/clinic";
import { CompareSlider } from "@/shared/ui/compare-slider";

/** Главный эффект сайта: сравнение «до/после» отбеливания */
export function Results() {
  const { results: r } = useClinic();
  return (
    <section id="results" className="bg-site-ink py-24 text-site-bg sm:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <h2 className="font-site text-[clamp(2.2rem,4.5vw,3.5rem)] font-semibold leading-none tracking-[-0.03em]">{r.title}</h2>
          <p className="mt-6 text-lg opacity-75">{r.text}</p>
          <p className="mt-8 text-sm opacity-45">{r.note}</p>
        </div>
        <CompareSlider
          src={r.image}
          alt={r.imageAlt}
          beforeLabel={r.before}
          afterLabel={r.after}
          beforeFilter="sepia(0.55) saturate(1.5) hue-rotate(-12deg) brightness(0.93)"
          className="aspect-[4/3] rounded-[36px] lg:col-span-8"
        />
      </div>
    </section>
  );
}
