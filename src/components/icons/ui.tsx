import type { SVGProps } from "react";

/**
 * Интерфейсные иконки проекта. Рисованы с нуля на сетке 24×24, штрих 1.6,
 * у стрелок и плюсов — скошенные концы под общий «войлочный» характер.
 */
type P = SVGProps<SVGSVGElement>;

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export const IconArrow = (p: P) => (
  <svg {...base} {...p}>
    <path d="M5 12h12.5" />
    <path d="M12.5 6.5 18 12l-5.5 5.5" />
    <path d="M18 12h1" strokeWidth={2.4} />
  </svg>
);

export const IconCalendar = (p: P) => (
  <svg {...base} {...p}>
    <rect x="3.5" y="5" width="17" height="15" rx="4" />
    <path d="M8 3v4M16 3v4M3.5 10h17" />
    <path d="m12 13.2 1.3 1.3-1.3 1.3-1.3-1.3z" fill="currentColor" />
  </svg>
);

export const IconGuests = (p: P) => (
  <svg {...base} {...p}>
    <path d="M9 11.5a3.25 3.25 0 1 0 0-6.5 3.25 3.25 0 0 0 0 6.5Z" />
    <path d="M3.5 19.5c.6-3.3 2.8-5 5.5-5s4.9 1.7 5.5 5" />
    <path d="M15.5 5.4a3 3 0 0 1 0 5.8M17.5 14.8c1.6.6 2.7 2.2 3 4.7" />
  </svg>
);

export const IconPlus = (p: P) => (
  <svg {...base} {...p}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);

export const IconMinus = (p: P) => (
  <svg {...base} {...p}>
    <path d="M5 12h14" />
  </svg>
);

export const IconClose = (p: P) => (
  <svg {...base} {...p}>
    <path d="m6 6 12 12M18 6 6 18" />
  </svg>
);

export const IconMenu = (p: P) => (
  <svg {...base} {...p}>
    <path d="M4 8h16M4 16h10" />
  </svg>
);

export const IconPin = (p: P) => (
  <svg {...base} {...p}>
    <path d="M12 21s6.5-5.6 6.5-11a6.5 6.5 0 1 0-13 0c0 5.4 6.5 11 6.5 11Z" />
    <path d="m12 7.6 2.2 2.2-2.2 2.2-2.2-2.2z" />
  </svg>
);

export const IconBed = (p: P) => (
  <svg {...base} {...p}>
    <path d="M3 18.5V7M3 13.5h18v5M21 13.5v-1.5a3 3 0 0 0-3-3h-6.5v4.5" />
    <path d="M7.25 11.25a1.75 1.75 0 1 0 0-.01" />
  </svg>
);

export const IconArea = (p: P) => (
  <svg {...base} {...p}>
    <path d="M4 9V4h5M15 4h5v5M20 15v5h-5M9 20H4v-5" />
    <path d="m12 9.5 2.5 2.5-2.5 2.5-2.5-2.5z" />
  </svg>
);

export const IconCheck = (p: P) => (
  <svg {...base} {...p}>
    <path d="m5 12.5 4.2 4.2L19 7" />
  </svg>
);

export const IconChevron = (p: P) => (
  <svg {...base} {...p}>
    <path d="m9 6 6 6-6 6" />
  </svg>
);
