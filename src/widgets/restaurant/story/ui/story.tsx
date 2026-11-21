"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { useRestaurant } from "@/entities/restaurant";

export function Story() {
  const { story, hours } = useRestaurant();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const upper = useTransform(scrollYProgress, [0, 1], ["8%", "-8%"]);
  const lower = useTransform(scrollYProgress, [0, 1], ["-4%", "10%"]);

  return (
    <section ref={ref} id="story" className="py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-12">
        <div className="relative h-[520px] lg:col-span-6">
          <motion.div style={{ y: upper }} className="absolute left-0 top-0 h-[70%] w-[64%] overflow-hidden rounded-t-full">
            <Image src={story.images[0].src} alt={story.images[0].alt} fill sizes="(min-width: 1024px) 30vw, 60vw" className="object-cover" />
          </motion.div>
          <motion.div style={{ y: lower }} className="absolute bottom-0 right-0 h-[58%] w-[52%] overflow-hidden rounded-[24px] border-8 border-site-bg">
            <Image src={story.images[1].src} alt={story.images[1].alt} fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover" />
          </motion.div>
        </div>
        <div className="lg:col-span-6">
          <h2 className="font-site text-balance text-[clamp(2.2rem,5vw,4rem)] leading-[1.05]">{story.title}</h2>
          <p className="mt-6 max-w-xl text-lg text-site-muted">{story.text}</p>
          <dl className="mt-10 grid max-w-md grid-cols-2 gap-6">
            {story.facts.map((f) => (
              <div key={f.label} className="border-t border-site-line pt-4">
                <dt className="font-site text-4xl text-site-accent">{f.value}</dt>
                <dd className="mt-1 text-sm text-site-muted">{f.label}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-10 text-site-muted">{hours}</p>
        </div>
      </div>
    </section>
  );
}
