import { Fraction, TNumber } from '@sundaeswap-toolkit/model';

export const PartialNumberFormatOptions = {
  // safari fix
  standard: {
    notation: 'standard',
  } as Partial<Intl.NumberFormatOptions>,
  compact: {
    notation: 'compact',
    compactDisplay: 'short',
  } as Partial<Intl.NumberFormatOptions>,
  percent: { style: 'percent' } as Partial<Intl.NumberFormatOptions>,
  usd: { style: 'currency', currency: 'USD' } as Partial<Intl.NumberFormatOptions>,
};

/**
 * Helper function to format any given number to the specific needs based on the locale.
 * Proper usage of the Intl.NumberFormat API can be found here:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat
 *
 * @example
 * const formattedValue = formatNumberToLocale('en-US', { maximumFractionDigits: 10 }, 12345)
 * --> output: '12,345'
 *
 * @param locale locale string
 * @param options Intl.ResolvedNumberFormatOptions
 * @param value number
 * @returns string
 */
export const formatNumberToLocale = (
  locale: string,
  options: Partial<Intl.ResolvedNumberFormatOptions>,
  value?: number | bigint
): string | number | bigint | null => {
  if (typeof value !== 'number' && typeof value !== 'bigint') {
    return null;
  }

  if (!locale) {
    return value;
  }

  return new Intl.NumberFormat(locale, options).format(value);
};

/**
 * This function takes in any number and assumes that it's a valid value that can be transformed into a percentage.
 * It will also transform the percentage to the proper locale with a default of two decimals.
 * Passing proper options (e.g. `{ maximumFractionDigits: 0 }`) can manipulate the decimal output however.
 *
 * @example
 * const percentage = formatNumberToPercentage(0.04);
 * --> output: "4.00%";
 *
 * const percentage = formatNumberToPercentage(0.4, "de-DE", { maximumFractionDigits: 0 });
 * --> output: "40%";
 *
 * const percentage = formatNumberToPercentage(42);
 * --> output: "4,200%";
 *
 * @param value number
 * @returns string / percentage
 */
export const formatNumberToPercentage = (
  value: TNumber,
  locale = 'en-US',
  options: Partial<Intl.ResolvedNumberFormatOptions> = { minimumFractionDigits: 2 }
): string | null => {
  if (value instanceof Fraction) {
    value = Number(value.toString());
  }

  if (typeof value !== 'number' && typeof value !== 'bigint') {
    return null;
  }

  return Intl.NumberFormat(locale, {
    ...options,
    ...PartialNumberFormatOptions.percent,
  }).format(value);
};

export const formatNumberToCompact = (
  value: TNumber,
  locale = 'en-US',
  options: Partial<Intl.ResolvedNumberFormatOptions> = {
    // minimumFractionDigits: 1,
    maximumFractionDigits: 4,
  }
): string | null => {
  if (value instanceof Fraction) {
    value = Number(value.toString());
  }

  if (typeof value !== 'number' && typeof value !== 'bigint') {
    return null;
  }

  try {
    return Intl.NumberFormat(locale, {
      ...options,
      ...PartialNumberFormatOptions.compact,
    }).format(value);
  } catch (e) {
    // ... unfortunately, some old versions of Safari doesn't support it, so we need a fallback
    return Intl.NumberFormat(locale, {
      ...options,
      ...PartialNumberFormatOptions.standard,
    }).format(value);
  }
};

export const formatDollarValue = (
  value: TNumber,
  locale = 'en-US',
  options?: Partial<Intl.ResolvedNumberFormatOptions>
): string | null => {
  if (value instanceof Fraction) {
    value = Number(value.toString());
  }

  if (typeof value !== 'number' && typeof value !== 'bigint') {
    return null;
  }

  return Intl.NumberFormat(locale, { ...options, ...PartialNumberFormatOptions.usd }).format(value);
};
