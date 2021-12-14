import { TNumber } from "model/shared";
import { useCallback } from "react";
import {
  formatNumberToLocale,
  formatNumberToPercentage,
  formatNumberToCompact,
  formatDollarValue,
  PartialNumberFormatOptions,
} from "utils/helpers/formatting";

export const useNumberFormat = (locale = "en") => {
  const formatNumber = useCallback(
    (value: number | bigint) => formatNumberToLocale(locale, {}, value),
    [locale]
  );
  const formatNumberPercentage = useCallback(
    (value: TNumber) => formatNumberToPercentage(value, locale),
    [locale]
  );
  const formatNumberCompact = useCallback(
    (value: TNumber) => formatNumberToCompact(value, locale),
    [locale]
  );
  const formatNumberUSD = useCallback(
    (value: TNumber) => formatDollarValue(value, locale),
    [locale]
  );
  const formatNumberUSDCompact = useCallback(
    (value: TNumber, formatOpts?: Partial<Intl.NumberFormatOptions>) => {
      try {
        return formatDollarValue(value, locale, {
          ...formatOpts,
          ...PartialNumberFormatOptions.compact,
        });
      } catch (e) {
        // ... unfortunately, some old versions of Safari doesn't support it, so we need a fallback
        return formatDollarValue(value, locale, {
          ...formatOpts,
          ...PartialNumberFormatOptions.standard,
        });
      }
    },
    [locale]
  );

  return {
    formatNumber,
    formatNumberCompact,
    formatNumberPercentage,
    formatNumberUSD,
    formatNumberUSDCompact,
  };
};
