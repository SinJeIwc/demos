"use client";

import { motion } from "motion/react";
import { useClinic } from "@/entities/clinic";

/** Этапы первого визита — это последовательность, поэтому с номерами */
export function Steps() {
  const { steps } = useClinic();
  return (
    <section id="visit" className="py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <h2 className="max-w-2xl font-site text-[clamp(2.2rem,5vw,3.75rem)] font-semibold leading-none tracking-[-0.03em]">{steps.title}</h2>
        <ol className="relative mt-14 grid gap-10 md:grid-cols-4 md:gap-6">
          {/* Линия, которая прорисовывается при появлении */}
          <motion.span
            aria-hidden
            className="absolute left-0 right-0 top-6 hidden h-px origin-left bg-site-ink/20 md:block"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-20% 0px" }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          />
          {steps.items.map((step, i) => (
            <motion.li
              key={step.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20% 0px" }}
              transition={{ delay: 0.25 + i * 0.15, duration: 0.7 }}
              className="relative"
            >
              <span className="relative grid size-12 place-items-center rounded-full bg-site-alt font-site text-lg font-semibold text-site-ink">
                {i + 1}
              </span>
              <h3 className="mt-6 font-site text-xl font-semibold">{step.title}</h3>
              <p className="mt-2 text-site-muted">{step.text}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
