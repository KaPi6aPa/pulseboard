import { createContext, useState, useEffect, ReactNode } from "react";
import { en } from "./dictionaries/en";
import { uk } from "./dictionaries/uk";
import { ru } from "./dictionaries/ru";

type Dictionary = typeof en;
type SupportedLang = "en" | "uk" | "ru";

const dictionaries: Record<SupportedLang, Dictionary> = {
  en,
  uk,
  ru,
};

type Params = Record<string, string | number | boolean | null | undefined>;

interface I18nContextProps {
  lang: SupportedLang;
  setLang: (lang: SupportedLang) => void;
  t: (key: string, params?: Params) => string;
}

export const I18nContext = createContext<I18nContextProps | undefined>(undefined);

function interpolate(template: string, params?: Params): string {
  if (!params) return template;

  // Replace {key} with params[key]
  return template.replace(/\{(\w+)\}/g, (_, key: string) => {
    const v = params[key];
    if (v === undefined || v === null) return `{${key}}`;
    return String(v);
  });
}

export const I18nProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLangState] = useState<SupportedLang>("en");

  useEffect(() => {
    const saved = localStorage.getItem("pb_lang") as SupportedLang;
    if (saved && dictionaries[saved]) {
      setLangState(saved);
    }
  }, []);

  const setLang = (newLang: SupportedLang) => {
    setLangState(newLang);
    localStorage.setItem("pb_lang", newLang);
  };

  const t = (path: string, params?: Params): string => {
    const keys = path.split(".");
    let current: any = dictionaries[lang];
    let fallback: any = dictionaries["en"];

    for (const k of keys) {
      current = current && current[k] !== undefined ? current[k] : undefined;
      fallback = fallback && fallback[k] !== undefined ? fallback[k] : undefined;
    }

    const result =
      typeof current === "string"
        ? current
        : typeof fallback === "string"
        ? fallback
        : path;

    return interpolate(result, params);
  };

  return <I18nContext.Provider value={{ lang, setLang, t }}>{children}</I18nContext.Provider>;
};
