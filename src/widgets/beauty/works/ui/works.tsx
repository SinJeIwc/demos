"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useBeauty } from "@/entities/beauty";

const spans = ["sm:col-span-2 sm:row-span-2", "", "", "sm:row-span-2", "", "sm:col-span-2"];

export function Works() {
  const { works } = useBeauty();
  return (
    <section id="works" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <h2 className="font-site text-[clamp(2.6rem,6vw,5rem)] leading-none">{works.title}</h2>
        <ul className="mt-12 grid auto-rows-[220px] gap-4 sm:grid-cols-4">
          {works.images.map((img, i) => (
            <motion.li
              key={img.src}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ delay: (i % 3) * 0.08, duration: 0.8 }}
              className={`group relative overflow-hidden rounded-[24px] ${spans[i] ?? ""}`}
            >
              <Image src={img.src} alt={img.alt} fill sizes="(min-width: 640px) 50vw, 100vw" className="object-cover transition-transform duration-1000 group-hover:scale-105" />
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
