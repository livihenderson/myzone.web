"use client";

import { createContext, useContext } from "react";
import { dictionary, type Dictionary, type Locale } from "./dictionary";

type LanguageContextValue = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: Dictionary;
};

export const LanguageContext = createContext<LanguageContextValue | null>(null);

export function useT(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    return {
      locale: "cs",
      setLocale: () => {},
      t: dictionary.cs,
    };
  }
  return ctx;
}
