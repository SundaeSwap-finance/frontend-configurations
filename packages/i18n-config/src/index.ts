import i18nextPackage, { InitOptions } from "i18next";
import { initReactI18next } from "react-i18next";
import {
  DEFAULT_LANGUAGES,
  getSupportedLngs,
  TSupportedLocale,
} from "./languages";

const i18next = i18nextPackage.use(initReactI18next);

const i18nDefaultOptions = (
  supportedLngs?: TSupportedLocale[]
): InitOptions => ({
  interpolation: { escapeValue: false },
  fallbackLng: "en",
  supportedLngs: getSupportedLngs(supportedLngs),
  nonExplicitSupportedLngs: true,
});

module.exports = {
  defaultLanguages: DEFAULT_LANGUAGES,
  i18next,
  i18nDefaultOptions,
};
