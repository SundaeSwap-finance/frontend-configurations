export type TSupportedLocale = {
  locale: string;
  localeString: string;
};

// default languages based on current dex v1
export const DEFAULT_LANGUAGES: TSupportedLocale[] = [
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

export const getSupportedLngs = (supportedLngs?: TSupportedLocale[]) => {
  const langs = supportedLngs ?? DEFAULT_LANGUAGES;

  return langs.map((lang) => lang.locale);
};
