"use client";

import { useMemo } from "react";
import { useI18n } from "@/shared/i18n";
import { getClinic } from "../config/ak-tish";

export function useClinic() {
  const { locale } = useI18n();
  return useMemo(() => getClinic(locale), [locale]);
}
