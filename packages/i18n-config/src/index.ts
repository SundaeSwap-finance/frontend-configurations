import i18nextPackage, { InitOptions } from "i18next";
import { initReactI18next } from "react-i18next";

type TSupportedLocale = {
  locale: string;
  localeString: string;
};

// default languages based on current dex v1
const DEFAULT_LANGUAGES: TSupportedLocale[] = [
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
    locale: "it",
    localeString: "Italiano",
  },
  {
    locale: "ja",
    localeString: "日本語",
  },
  {
    locale: "nl",
    localeString: "Nederlands",
  },
  {
    locale: "pt",
    localeString: "Português",
  },
  {
    locale: "ru",
    localeString: "Русский",
  },
  {
    locale: "th",
    localeString: "ภาษาไทย",
  },
];

const getSupportedLngs = (supportedLngs?: TSupportedLocale[]) => {
  const langs = supportedLngs ?? DEFAULT_LANGUAGES;

  return langs.map((lang) => lang.locale);
};

const i18nDefaultOptions = (
  supportedLngs?: TSupportedLocale[]
): InitOptions => ({
  interpolation: { escapeValue: false },
  fallbackLng: "en",
  supportedLngs: getSupportedLngs(supportedLngs),
  nonExplicitSupportedLngs: true,
});

const i18next = i18nextPackage.use(initReactI18next);

module.exports = { i18next, i18nDefaultOptions };
