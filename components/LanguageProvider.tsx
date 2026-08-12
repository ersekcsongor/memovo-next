"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { DICTIONARIES, type Lang, type TranslationKey } from "@/data/i18n";

type LanguageContextValue = { lang: Lang; setLang: (lang: Lang) => void };

const LanguageContext = createContext<LanguageContextValue>({ lang: "en", setLang: () => {} });

const STORAGE_KEY = "memovo-lang";

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");

  // Read the stored choice after mount so the prerendered HTML stays stable.
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "en" || stored === "hu" || stored === "ro") setLang(stored);
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, lang);
    document.documentElement.lang = lang;
  }, [lang]);

  return <LanguageContext.Provider value={{ lang, setLang }}>{children}</LanguageContext.Provider>;
}

export function useLang() {
  return useContext(LanguageContext);
}

/** Returns a lookup that falls back to English for any key a translation is missing. */
export function useT() {
  const { lang } = useLang();
  return useCallback(
    (key: TranslationKey) => DICTIONARIES[lang][key] ?? DICTIONARIES.en[key] ?? key,
    [lang],
  );
}
