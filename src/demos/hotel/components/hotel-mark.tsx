import type { SVGProps } from "react";
import { cn } from "@/lib/cn";

/** Знак отеля «Теңиз»: тундук — обод и перекрещенные дуги купола юрты */
export function HotelMark({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      aria-hidden
      className={cn("size-7", className)}
      {...props}
    >
      <circle cx="16" cy="16" r="12" stroke="var(--color-dusk)" strokeWidth={2.2} />
      <path d="M11.5 4.9c2 3.6 2 18.6 0 22.2M20.5 4.9c-2 3.6-2 18.6 0 22.2" />
      <path d="M4.9 11.5c3.6 2 18.6 2 22.2 0M4.9 20.5c3.6-2 18.6-2 22.2 0" />
    </svg>
  );
}
