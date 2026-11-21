"use client";

import { useMemo } from "react";
import { useI18n } from "@/shared/i18n";
import { getRestaurant } from "../config/tamyr";

export function useRestaurant() {
  const { locale } = useI18n();
  return useMemo(() => getRestaurant(locale), [locale]);
}
