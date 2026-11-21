"use client";

import { useMemo } from "react";
import { useI18n } from "@/shared/i18n";
import { getHotel } from "../config/tengiz";

/** Контент отеля на текущем языке страницы */
export function useHotel() {
  const { locale } = useI18n();
  return useMemo(() => getHotel(locale), [locale]);
}
