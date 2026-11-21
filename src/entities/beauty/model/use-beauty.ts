"use client";

import { useMemo } from "react";
import { useI18n } from "@/shared/i18n";
import { getBeauty } from "../config/kiyal";

export function useBeauty() {
  const { locale } = useI18n();
  return useMemo(() => getBeauty(locale), [locale]);
}
