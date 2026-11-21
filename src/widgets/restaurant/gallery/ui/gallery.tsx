"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useRestaurant } from "@/entities/restaurant";

/** Бесконечная лента фотографий зала */
export function Gallery() {
  const { gallery } = useRestaurant();
  const row = [...gallery.images, ...gallery.images];

  return (
    <section id="gallery" className="overflow-hidden py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <h2 className="font-site text-[clamp(2.2rem,5vw,4rem)] leading-none">{gallery.title}</h2>
      </div>
      <div className="group mt-12">
        <motion.ul
          className="flex w-max gap-5"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 45, ease: "linear", repeat: Infinity }}
        >
          {row.map((img, i) => (
            <li
              key={i}
              aria-hidden={i >= gallery.images.length}
              className={`relative shrink-0 overflow-hidden rounded-[22px] ${i % 2 ? "h-72 w-56" : "h-80 w-[26rem]"}`}
            >
              <Image src={img.src} alt={i < gallery.images.length ? img.alt : ""} fill sizes="420px" className="object-cover transition-transform duration-1000 hover:scale-105" />
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
