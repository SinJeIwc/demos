"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { DrawIcon, icons } from "@/components/icons/draw-icon";
import { hotel } from "../config";

/** Карусель, которую можно тянуть мышью или пальцем */
export function Experiences() {
  const track = useRef<HTMLDivElement>(null);
  const viewport = useRef<HTMLDivElement>(null);
  const [limit, setLimit] = useState(0);

  useEffect(() => {
    const measure = () => {
      if (!track.current || !viewport.current) return;
      setLimit(Math.max(0, track.current.scrollWidth - viewport.current.offsetWidth));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  return (
    <section id="experiences" className="overflow-hidden bg-mist py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <h2 className="display-tight max-w-2xl text-[clamp(2.2rem,5.5vw,4.5rem)] font-light">
            Чем заняться на Иссык-Куле
          </h2>
          <p className="text-stone">Потяните карточки в сторону</p>
        </div>
      </div>

      <div ref={viewport} className="mx-auto mt-14 max-w-7xl px-5 sm:px-8">
        <motion.div
          ref={track}
          drag="x"
          dragConstraints={{ left: -limit, right: 0 }}
          dragElastic={0.08}
          className="flex w-max cursor-grab gap-5 active:cursor-grabbing"
        >
          {hotel.experiences.map((e) => (
            <article
              key={e.title}
              className="group relative h-[460px] w-[300px] shrink-0 select-none overflow-hidden rounded-[30px] bg-ink text-snow sm:w-[360px]"
            >
              <Image
                src={e.image}
                alt=""
                fill
                draggable={false}
                sizes="360px"
                className="pointer-events-none object-cover opacity-80 transition-transform duration-[1400ms] ease-[var(--ease-lake)] group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-7">
                <DrawIcon def={icons[e.icon]} className="size-11 text-dusk" />
                <h3 className="mt-4 font-display text-2xl font-normal">{e.title}</h3>
                <p className="mt-2 text-mist/80">{e.text}</p>
              </div>
            </article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
