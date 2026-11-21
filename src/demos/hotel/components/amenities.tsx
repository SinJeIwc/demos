"use client";

import { motion } from "motion/react";
import { DrawIcon, icons } from "@/components/icons/draw-icon";
import { hotel } from "../config";

const places = ["Чолпон-Ата", "Григорьевка", "Семёновка", "Кюнгёй Ала-Тоо", "Бостери", "Тамчы", "Каракол"];

function Marquee() {
  const row = [...places, ...places];
  return (
    <div className="relative overflow-hidden border-y border-snow/10 py-6" aria-hidden>
      <motion.div
        className="flex w-max items-center gap-10 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 38, ease: "linear", repeat: Infinity }}
      >
        {row.map((p, i) => (
          <span key={i} className="flex items-center gap-10 font-display text-2xl font-light text-snow/70 sm:text-3xl">
            {p}
            <span className="felt-diamond" />
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export function Amenities() {
  return (
    <section id="amenities" className="grain bg-ink text-snow">
      <Marquee />
      <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
        <h2 className="display-tight max-w-3xl text-[clamp(2.2rem,5.5vw,4.5rem)] font-light">
          Всё, чтобы не выходить за ворота
        </h2>
        <ul className="mt-16 grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
          {hotel.amenities.map((a) => (
            <li key={a.title} className="group">
              <DrawIcon
                def={icons[a.icon]}
                className="size-14 text-shallow transition-transform duration-700 ease-[var(--ease-lake)] group-hover:-translate-y-1"
              />
              <h3 className="mt-5 font-display text-xl font-normal">{a.title}</h3>
              <p className="mt-2 text-mist/70">{a.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
