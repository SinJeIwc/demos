"use client";

import Image from "next/image";
import { motion, useMotionValue, useTransform } from "motion/react";
import { useRef, type CSSProperties } from "react";
import { cn } from "@/shared/lib/cn";

type Props = {
  src: string;
  alt: string;
  beforeLabel: string;
  afterLabel: string;
  /** CSS-фильтр для «до», если сравниваем одну фотографию с обработкой */
  beforeFilter?: string;
  beforeSrc?: string;
  className?: string;
};

/** Слайдер «до/после»: тянется мышью, пальцем и стрелками клавиатуры */
export function CompareSlider({ src, alt, beforeLabel, afterLabel, beforeFilter, beforeSrc, className }: Props) {
  const box = useRef<HTMLDivElement>(null);
  const pos = useMotionValue(50);
  const clip = useTransform(pos, (p) => `inset(0 ${100 - p}% 0 0)`);
  const left = useTransform(pos, (p) => `${p}%`);

  const setFromPointer = (clientX: number) => {
    const r = box.current?.getBoundingClientRect();
    if (!r) return;
    pos.set(Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100)));
  };

  return (
    <div
      ref={box}
      className={cn("relative select-none overflow-hidden touch-pan-y", className)}
      onPointerDown={(e) => {
        (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
        setFromPointer(e.clientX);
      }}
      onPointerMove={(e) => e.buttons === 1 && setFromPointer(e.clientX)}
    >
      <Image src={src} alt={alt} fill sizes="(min-width: 1024px) 60vw, 100vw" className="pointer-events-none object-cover" />
      <motion.div className="absolute inset-0" style={{ clipPath: clip }}>
        <Image
          src={beforeSrc ?? src}
          alt=""
          fill
          sizes="(min-width: 1024px) 60vw, 100vw"
          className="pointer-events-none object-cover"
          style={{ filter: beforeFilter } as CSSProperties}
        />
      </motion.div>

      <span className="absolute left-4 top-4 rounded-full bg-black/45 px-3 py-1 text-sm text-white backdrop-blur">{beforeLabel}</span>
      <span className="absolute right-4 top-4 rounded-full bg-white/80 px-3 py-1 text-sm text-black backdrop-blur">{afterLabel}</span>

      <motion.div className="absolute inset-y-0 w-0.5 -translate-x-1/2 bg-white" style={{ left }}>
        <div className="absolute left-1/2 top-1/2 grid size-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-black shadow-xl">
          <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden>
            <path d="m9 7-5 5 5 5M15 7l5 5-5 5" />
          </svg>
        </div>
      </motion.div>

      <input
        type="range"
        min={0}
        max={100}
        defaultValue={50}
        onChange={(e) => pos.set(Number(e.target.value))}
        aria-label={`${beforeLabel} / ${afterLabel}`}
        className="absolute inset-x-0 bottom-0 h-full w-full cursor-ew-resize opacity-0"
      />
    </div>
  );
}
