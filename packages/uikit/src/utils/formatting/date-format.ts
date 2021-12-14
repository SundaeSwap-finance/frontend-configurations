import { format, formatDistance, formatDistanceToNow, Locale } from "date-fns";

export type TDateish = Date | number | string;

export const formatDate = (date: TDateish, formatStyle: string, locale?: Locale): string => {
  return format(date instanceof Date ? date : new Date(date), formatStyle, { locale });
};

export const formatDateDistance = (
  dateFrom: TDateish,
  dateTo: TDateish,
  locale?: Locale
): string => {
  return formatDistance(
    dateFrom instanceof Date ? dateFrom : new Date(dateFrom),
    dateTo instanceof Date ? dateTo : new Date(dateTo),
    { locale, addSuffix: true }
  );
};

export const formatDateDistanceToNow = (date: TDateish, locale?: Locale): string => {
  return formatDistanceToNow(date instanceof Date ? date : new Date(date), {
    locale,
    addSuffix: true,
  });
};
