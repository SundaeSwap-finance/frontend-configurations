export const languageDetectorConfig = {
  // order and from where user language should be detected
  order: ["localStorage", "sessionStorage", "htmlTag", "navigator"],

  // keys or params to lookup language from
  lookupLocalStorage: "i18nextLng",
  lookupSessionStorage: "i18nextLng",

  // cache user language on
  caches: ["localStorage"],

  // optional htmlTag with lang attribute, the default is:
  htmlTag: document.documentElement,
};
