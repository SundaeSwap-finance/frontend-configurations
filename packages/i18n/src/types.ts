export enum SupportedLocale {
  LOCALE = "locale",
  LOCALE_STRING = "localeString",
}

export type TSupportedLocale = {
  [SupportedLocale.LOCALE]: string;
  [SupportedLocale.LOCALE_STRING]: string;
};
