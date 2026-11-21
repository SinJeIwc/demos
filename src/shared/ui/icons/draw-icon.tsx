"use client";

import { motion } from "motion/react";
import { cn } from "@/shared/lib/cn";

/**
 * Авторский набор иконок «Тундук»: тонкий штрих 1.5 на сетке 32×32
 * и красный ромб шырдака как подпись каждой иконки.
 * Линии прорисовываются, когда иконка попадает в экран.
 */
export type IconDef = {
  paths: string[];
  /** Координаты центра ромба-акцента */
  accent?: [number, number];
};

const diamond = ([x, y]: [number, number], r = 1.6) =>
  `M${x} ${y - r} L${x + r} ${y} L${x} ${y + r} L${x - r} ${y} Z`;

export function DrawIcon({ def, className }: { def: IconDef; className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={cn("size-10", className)}
    >
      {def.paths.map((d, i) => (
        <motion.path
          key={d}
          d={d}
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true, margin: "0px 0px -15% 0px" }}
          transition={{ duration: 1.2, delay: 0.15 + i * 0.14, ease: [0.22, 1, 0.36, 1] }}
        />
      ))}
      {def.accent && (
        <motion.path
          d={diamond(def.accent)}
          fill="var(--color-felt)"
          stroke="none"
          style={{ transformBox: "fill-box", transformOrigin: "center" }}
          initial={{ scale: 0, rotate: -90 }}
          whileInView={{ scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 260, damping: 14, delay: 0.9 }}
        />
      )}
    </svg>
  );
}

/* ——— Набор ——— */

export const icons = {
  lake: {
    paths: [
      "M3 19 11 8.5l4.5 6 4-5L29 19",
      "M3 23.5c3.25-2 6.5-2 9.75 0s6.5 2 9.75 0 4.5-1.2 6.5-.4",
      "M7 28c2.25-1.3 4.5-1.3 6.75 0s4.5 1.3 6.75 0",
    ],
    accent: [11, 5],
  },
  pool: {
    paths: [
      "M10 4v14M19 4v14M10 9h9M10 14h9",
      "M3 22c2.2-1.6 4.4-1.6 6.5 0s4.3 1.6 6.5 0 4.3-1.6 6.5 0 4.3 1.6 6.5 0",
      "M6 27c2-1.3 4-1.3 6 0s4 1.3 6 0 4-1.3 6 0",
    ],
    accent: [14.5, 1.8],
  },
  sauna: {
    paths: [
      "M4.5 27c.4-3.2 2.6-4.6 5-4.2 1.3-2.5 4.6-3.2 7-1.4 2.6-1.6 7.2-.6 8.3 2.6.9.4 1.8 1.6 2.1 3Z",
      "M11 17.5c-2-2.6 2-3.9 0-6.8",
      "M16.5 16.5c-2-2.6 2-3.9 0-6.8",
      "M22 17.5c-2-2.6 2-3.9 0-6.8",
    ],
    accent: [16.5, 5.5],
  },
  kitchen: {
    paths: [
      "M5 16h22c0 5.8-4.9 10-11 10S5 21.8 5 16Z",
      "M12.5 28.5h7",
      "M12 12c-1.5-2 1.5-3 0-5.2M16 11c-1.5-2 1.5-3 0-5.2M20 12c-1.5-2 1.5-3 0-5.2",
    ],
    accent: [16, 20.5],
  },
  wifi: {
    paths: [
      "M4.5 13.5a16 16 0 0 1 23 0",
      "M8.5 17.7a10.4 10.4 0 0 1 15 0",
      "M12.5 21.9a4.9 4.9 0 0 1 7 0",
    ],
    accent: [16, 26],
  },
  transfer: {
    paths: [
      "M4.5 22v-4l2.4-5.6A3.5 3.5 0 0 1 10.1 10h11.8a3.5 3.5 0 0 1 3.2 2.4L27.5 18v4h-3",
      "M7.5 22h-3M13 22h6M4.5 18h23",
      "M10.25 24.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5ZM21.75 24.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z",
    ],
    accent: [16, 6],
  },
  horse: {
    paths: [
      "M9 5v11a7 7 0 0 0 14 0V5",
      "M6.5 5H11M21 5h4.5",
      "M9 10h2.2M20.8 10H23M9 15h2.2M20.8 15H23",
    ],
    accent: [16, 28],
  },
  fire: {
    paths: [
      "M5.5 27.5 26.5 21M5.5 21l21 6.5",
      "M16 19.5c-4.2-1.6-4.6-6.4.2-12 .8 3.1 4.4 4.3 3.4 8.4-.5 2.2-2 3.4-3.6 3.6Z",
    ],
    accent: [16, 3],
  },
  yurt: {
    paths: [
      "M4.5 18.5C8 12 12 9 16 9s8 3 11.5 9.5",
      "M6.5 18.5V27M25.5 18.5V27M3.5 27h25",
      "M13 27v-6h6v6",
      "M14 6.5a2 2 0 1 0 4 0 2 2 0 0 0-4 0",
    ],
    accent: [16, 14.5],
  },
  trek: {
    paths: [
      "M3 27 12.5 11l5 8 4-5.5L29 27Z",
      "m12.5 11-2.6 4.4 2.6-1.3 2.6 1.3",
    ],
    accent: [24, 5],
  },
  family: {
    paths: [
      "M6.5 28 10.5 5h11l4 23",
      "M13 5v13M19 5v13M12 18h8",
    ],
    accent: [16, 24],
  },
  parking: {
    paths: [
      "M6 9a4 4 0 0 1 4-4h12a4 4 0 0 1 4 4v14a4 4 0 0 1-4 4H10a4 4 0 0 1-4-4Z",
      "M13 22V11h4.25a3.5 3.5 0 0 1 0 7H13",
    ],
    accent: [22, 23],
  },
} satisfies Record<string, IconDef>;

export type IconName = keyof typeof icons;
