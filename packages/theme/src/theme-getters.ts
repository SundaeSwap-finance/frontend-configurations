import { path } from 'ramda';
import { css, CSSObject, SimpleInterpolation } from 'styled-components';
import { ThemeType } from './theme';

/**
 * Dynamically gets the desired values from the theme declaration.
 *
 * @example
 * const Button = styled.div`
 *   background-color: ${getFromTheme("colors", "--blue-2")};
 * `
 * --> is equal to: background-color: ${({ theme }) => theme.colors["--blue-2"]};
 *
 * @param themeKey: keyof ThemeType
 * @param themeProperty keyof ThemeType[themeProperty]
 * @returns `--<themeProperty>-<index>
 */
export const getFromTheme =
  <T extends keyof ThemeType>(themeProperties: [T, keyof ThemeType[T]]) =>
  (props: ThemeType): SimpleInterpolation =>
    path(['theme', ...(themeProperties as string[])], props);

/**
 * This function lets you use your media query dynamically across the consumer application.
 *
 * @example
 * const styledSection = styled.section`
 *  ${mediaQuery("--max-screen320", css`
        height: auto;
    `)}
 * `
 *
 * @param mediaQuery
 * @param styles css`` style declaration with styled components
 * @returns
 */
export const mediaQuery = (mediaQuery: keyof ThemeType['media'], styles: CSSObject) => css`
  @media all and ${getFromTheme(['media', `${mediaQuery}`])} {
    ${styles};
  }
`;
