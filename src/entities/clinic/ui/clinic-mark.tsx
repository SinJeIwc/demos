import type { SVGProps } from "react";
import { cn } from "@/shared/lib/cn";

/** Знак «Ак Тиш»: контур зуба с мятной искрой — чистота после визита */
export function ClinicMark({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden className={cn("size-7", className)} {...props}>
      <path
        d="M10.5 4.5c-4 0-6.5 2.8-6.5 7 0 3.7 1.4 5.6 2 9.4.6 3.6 1.3 6.6 3.3 6.6 1.8 0 2.3-3.4 3.2-5.8.4-1.1 1-1.7 1.9-1.7h1.2c.9 0 1.5.6 1.9 1.7.9 2.4 1.4 5.8 3.2 5.8 2 0 2.7-3 3.3-6.6.6-3.8 2-5.7 2-9.4 0-4.2-2.5-7-6.5-7-2.2 0-3.4 1-5.5 1s-3.3-1-5.5-1Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M24.5 2.5v4M22.5 4.5h4" stroke="var(--site-alt, #8fd9c4)" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
