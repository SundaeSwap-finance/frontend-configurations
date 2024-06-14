import i18nextPackage, { InitOptions } from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import { getSupportedLngs, TSupportedLocale } from "./languages.js";
import { i18nLangDetectionConfig } from "./language-detector.js";

const i18next = i18nextPackage.use(initReactI18next).use(LanguageDetector);

const i18nDefaultOptions = (
  supportedLngs?: TSupportedLocale[],
): InitOptions => ({
  interpolation: { escapeValue: false },
  fallbackLng: "en",
  supportedLngs: getSupportedLngs(supportedLngs),
  nonExplicitSupportedLngs: true,
});

export { i18next, i18nDefaultOptions, i18nLangDetectionConfig };
