import { Locale } from "date-fns";
import { getDateFnsLocale } from "i18n/date-fns";
import { useCallback, useEffect, useState } from "react";
import * as dateFormat from "utils/helpers/formatting/date-format";

export const useDateFormat = (localeCode = "en") => {
  const [locale, setLocale] = useState<Locale | undefined>();

  useEffect(() => void getDateFnsLocale(localeCode)?.then(setLocale), [localeCode]);

  const formatDate = useCallback(
    (date: dateFormat.TDateish, style: string) => dateFormat.formatDate(date, style, locale),
    [locale]
  );

  const formatDateDistance = useCallback(
    (date: dateFormat.TDateish, dateTo: dateFormat.TDateish) =>
      dateFormat.formatDateDistance(date, dateTo, locale),
    [locale]
  );

  const formatDateDistanceToNow = useCallback(
    (date: dateFormat.TDateish) => dateFormat.formatDateDistanceToNow(date, locale),
    [locale]
  );

  return {
    formatDate,
    formatDateDistance,
    formatDateDistanceToNow,
  };
};
