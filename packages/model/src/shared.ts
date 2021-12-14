import type { Fraction } from "./fraction";

export type BigIntish = string | number | bigint;

export type TNumber = Fraction | number | bigint;

export type TFormatOptions = {
  decimalSeparator: string;
  groupSeparator: string;
};

export const getLocaleFormatOptions = (locales?: string): TFormatOptions => {
  const formatted = new Intl.NumberFormat(locales).format(1_000.1);
  // TODO only works with groupSize 3
  if (formatted.length !== 7) throw new Error("Unsupported locale");
  const decimalSeparator = formatted[5];
  const groupSeparator = formatted[1];
  return { decimalSeparator, groupSeparator };
};

export const getDecimalSeparator = (locale?: string): string =>
  Intl.NumberFormat(locale).format(0.1)[1];
