import type { SVGProps } from "react";
import { cn } from "@/lib/cn";

/**
 * Знак araweare: два пересекающихся круга — «мы» из двух человек,
 * а их общая часть залита абрикосовым цветом. Это то, что получается вместе.
 */
export function AraweareMark({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden className={cn("size-8", className)} {...props}>
      <circle cx="23" cy="32" r="14" fill="none" stroke="currentColor" strokeWidth="3.5" />
      <circle cx="41" cy="32" r="14" fill="none" stroke="currentColor" strokeWidth="3.5" />
      <path d="M32 21.28A14 14 0 0 1 32 42.72A14 14 0 0 1 32 21.28Z" fill="var(--color-dusk)" />
    </svg>
  );
}

export function AraweareLogo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <AraweareMark className="size-9" />
      <span className="font-display text-xl font-medium tracking-[-0.04em]">araweare</span>
    </span>
  );
}
