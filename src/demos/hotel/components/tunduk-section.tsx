"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { motion, useInView, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { hotel } from "../config";

// three.js тяжёлый — грузим только в браузере и только когда дошли до секции
const TundukCanvas = dynamic(() => import("./tunduk-3d"), { ssr: false });

/**
 * Главный момент страницы: озеро открывается через круг тундука по мере скролла.
 */
export function TundukSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  // 3D грузим, когда секция почти доехала до экрана, и останавливаем рендер, когда она ушла
  const near = useInView(ref, { once: true, margin: "400px 0px" });
  const visible = useInView(ref);

  const clip = useTransform(
    scrollYProgress,
    [0, 0.55],
    ["circle(17% at 50% 50%)", "circle(75% at 50% 50%)"],
  );
  const imageScale = useTransform(scrollYProgress, [0, 0.6], [1.35, 1]);
  const canvasOpacity = useTransform(scrollYProgress, [0, 0.35, 0.55], [1, 1, 0]);
  const introOpacity = useTransform(scrollYProgress, [0, 0.18], [1, 0]);
  const storyOpacity = useTransform(scrollYProgress, [0.55, 0.72], [0, 1]);
  const storyY = useTransform(scrollYProgress, [0.55, 0.72], [40, 0]);

  return (
    <section ref={ref} className="relative h-[260vh] bg-ink">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <motion.div className="absolute inset-0" style={{ clipPath: clip }}>
          <motion.div className="absolute inset-0" style={{ scale: imageScale }}>
            <Image src={hotel.story.image} alt="Озеро среди зелёных гор" fill sizes="100vw" className="object-cover" />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-r from-ink/80 via-ink/30 to-transparent" />
        </motion.div>

        <motion.div
          style={{ opacity: canvasOpacity }}
          className="pointer-events-none absolute inset-0"
          aria-hidden
        >
          {near && <TundukCanvas progress={scrollYProgress} active={visible} />}
        </motion.div>

        <motion.p
          style={{ opacity: introOpacity }}
          className="absolute inset-x-0 bottom-16 text-center text-sm text-shallow"
        >
          Листайте — посмотрим на озеро через тундук
        </motion.p>

        <motion.div
          style={{ opacity: storyOpacity, y: storyY }}
          className="absolute inset-0 mx-auto flex max-w-7xl items-center px-5 sm:px-8"
        >
          <div className="max-w-xl text-snow">
            <h2 className="display-tight text-[clamp(2.4rem,6vw,5rem)] font-light">{hotel.story.title}</h2>
            <p className="mt-6 text-lg text-mist/90">{hotel.story.text}</p>
            <dl className="mt-12 grid gap-8 sm:grid-cols-3">
              {hotel.facts.map((f) => (
                <div key={f.value} className="border-t border-snow/25 pt-4">
                  <dt className="font-display text-3xl font-light">{f.value}</dt>
                  <dd className="mt-2 text-sm text-mist/75">{f.label}</dd>
                </div>
              ))}
            </dl>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
