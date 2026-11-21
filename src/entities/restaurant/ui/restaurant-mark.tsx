import type { SVGProps } from "react";
import { cn } from "@/shared/lib/cn";

/** Знак «Тамыр»: корень, расходящийся из одной точки, над линией земли */
export function RestaurantMark({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden className={cn("size-7", className)} {...props}>
      <path d="M5 12h22" stroke="var(--site-accent, #e2a33b)" />
      <path d="M16 6v6M16 12c0 5-4 7-7 9M16 12c0 5 4 7 7 9M16 12v15M12 18c-1 3-1 5 0 8M20 18c1 3 1 5 0 8" />
    </svg>
  );
}
