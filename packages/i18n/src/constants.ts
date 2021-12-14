import { SupportedLocale, TSupportedLocale } from "./types";

export const availableLanguages = ["ar", "de", "en", "es", "fr", "hu", "pt", "zh"];

export const SupportedLocales: TSupportedLocale[] = [
  {
    locale: "ar",
    localeString: "عربي",
  },
  {
    locale: "de",
    localeString: "Deutsch",
  },
  {
    locale: "en",
    localeString: "English",
  },
  {
    locale: "es",
    localeString: "Español",
  },
  {
    locale: "fr",
    localeString: "Français",
  },
  {
    locale: "hu",
    localeString: "magyar",
  },
  {
    locale: "pt",
    localeString: "Português",
  },
  {
    locale: "zh",
    localeString: "简体中文", // Simplified Chinese
  },
];

export const getLocaleSpecifics = (key: SupportedLocale): string[] =>
  SupportedLocales.map((lang) => lang[key]);
