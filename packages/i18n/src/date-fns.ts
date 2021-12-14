import { getLocaleSpecifics } from "./constants";
import { SupportedLocale } from "./types";

export const getDateFnsLocale = async (localeCode: string): Promise<any> => {
  const localeStrings = getLocaleSpecifics(SupportedLocale.LOCALE);

  if (!localeStrings.includes(localeCode)) return;

  try {
    if (localeCode === "en") return await import(`date-fns/locale/en-US/index.js`);

    return await import(`date-fns/locale/${localeCode}/index.js`);
  } catch (error) {
    console.warn("Could not load %s locale", localeCode);
    return;
  }
};
