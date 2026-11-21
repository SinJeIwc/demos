"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { IconClose } from "@/components/icons/ui";
import { hotel } from "../config";

export function Gallery() {
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
      if (e.key === "ArrowRight") setActive((i) => (i === null ? i : (i + 1) % hotel.gallery.length));
      if (e.key === "ArrowLeft")
        setActive((i) => (i === null ? i : (i - 1 + hotel.gallery.length) % hotel.gallery.length));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);

  return (
    <section id="gallery" className="bg-snow py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <h2 className="display-tight max-w-2xl text-[clamp(2.2rem,5.5vw,4.5rem)] font-light">Как здесь выглядит день</h2>

        <div className="mt-14 columns-1 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5">
          {hotel.gallery.map((img, i) => (
            <motion.button
              key={img.src}
              layoutId={`g-${i}`}
              onClick={() => setActive(i)}
              className={`relative block w-full break-inside-avoid overflow-hidden rounded-[26px] ${
                i % 3 === 0 ? "aspect-[3/4]" : i % 3 === 1 ? "aspect-square" : "aspect-[4/5]"
              }`}
              aria-label={`Открыть фото: ${img.alt}`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-[1200ms] ease-[var(--ease-lake)] hover:scale-105"
              />
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active !== null && (
          <motion.div
            className="fixed inset-0 z-[70] grid place-items-center bg-ink/90 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            role="dialog"
            aria-modal="true"
            aria-label={hotel.gallery[active].alt}
          >
            <motion.div
              layoutId={`g-${active}`}
              className="relative aspect-[4/3] w-full max-w-5xl overflow-hidden rounded-[28px]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image src={hotel.gallery[active].src} alt={hotel.gallery[active].alt} fill sizes="90vw" className="object-cover" />
            </motion.div>
            <button
              onClick={() => setActive(null)}
              className="absolute right-5 top-5 grid size-12 place-items-center rounded-full bg-snow/10 text-snow"
              aria-label="Закрыть"
            >
              <IconClose className="size-5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
