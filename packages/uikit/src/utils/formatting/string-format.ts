/**
 * Takes in a (usually) wallet address and truncates the string for rendering purposes.
 *
 * @example
 * const truncatedString = truncateString("addr827u812819124124124124jf021991");
 * --> output: "addr827u...91"
 * const truncatedString = truncateString("addr827u812819124124124124jf021991", 2, 2);
 * --> output: "ad...91"
 * @param address string
 * @param truncateFrom number
 * @param truncateUntil number
 * @returns string
 */
export const truncateString = (str: string, truncateFrom = 8, truncateUntil = 2): string => {
  if (!str) {
    return "";
  }

  if (str.length <= truncateFrom) return str;

  const truncated = `${str.substring(0, truncateFrom)}…${str.substring(
    str.length - truncateUntil
  )}`;

  return truncated.length >= str.length ? str : truncated;
};

/**
 * This function returns a boolean on whether a specific string should get truncated (based on max length).
 *
 * @param str string
 * @param maxLength max length of the string
 * @returns boolean
 */
export const shouldTruncateString = (str: string, maxLength = 8): boolean =>
  str.length >= maxLength;

export const withEllipsis = (str: string, maxLength: number): string => {
  if (str.length <= maxLength) return str;
  const until = Math.min(2, Math.floor(maxLength / 2));
  return truncateString(str, maxLength - until, until);
};
