import i18nextPackage, { InitOptions } from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { getSupportedLngs, TSupportedLocale } from "./languages";
import { languageDetectorConfig } from "./language-detector";

const i18next = i18nextPackage
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    detection: languageDetectorConfig,
  });

const i18nDefaultOptions = (
  supportedLngs?: TSupportedLocale[]
): InitOptions => ({
  interpolation: { escapeValue: false },
  fallbackLng: "en",
  supportedLngs: getSupportedLngs(supportedLngs),
  nonExplicitSupportedLngs: true,
});

module.exports = {
  i18next,
  i18nDefaultOptions,
};
