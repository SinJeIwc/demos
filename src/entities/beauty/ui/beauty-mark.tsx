import type { SVGProps } from "react";
import { cn } from "@/shared/lib/cn";

/** Знак «Кыял»: арка-окно с восходящей звездой мечты */
export function BeautyMark({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden className={cn("size-7", className)} {...props}>
      <path d="M7 28V14a9 9 0 0 1 18 0v14" />
      <path d="M16 11.5l1.2 3.3 3.3 1.2-3.3 1.2L16 20.5l-1.2-3.3-3.3-1.2 3.3-1.2z" fill="var(--site-alt, #d9e66b)" stroke="none" />
    </svg>
  );
}
