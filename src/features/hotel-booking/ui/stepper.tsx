"use client";

import { motion } from "motion/react";
import { useI18n } from "@/shared/i18n";
import { IconMinus, IconPlus } from "@/shared/ui/icons";

type Props = {
  label: string;
  hint: string;
  value: number;
  min: number;
  max: number;
  onChange: (v: number) => void;
};

export function Stepper({ label, hint, value, min, max, onChange }: Props) {
  const { t } = useI18n();
  const btn =
    "grid size-10 place-items-center rounded-full border border-ink/15 transition-colors hover:border-ink/40 disabled:opacity-30";

  return (
    <div className="flex items-center justify-between py-3">
      <div>
        <p className="font-medium">{label}</p>
        <p className="text-sm text-stone">{hint}</p>
      </div>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => onChange(Math.max(min, value - 1))}
          disabled={value <= min}
          className={btn}
          aria-label={t.booking.decrease(label)}
        >
          <IconMinus className="size-4" />
        </button>
        <motion.span key={value} initial={{ y: -8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="w-5 text-center tabular-nums">
          {value}
        </motion.span>
        <button
          type="button"
          onClick={() => onChange(Math.min(max, value + 1))}
          disabled={value >= max}
          className={btn}
          aria-label={t.booking.increase(label)}
        >
          <IconPlus className="size-4" />
        </button>
      </div>
    </div>
  );
}
