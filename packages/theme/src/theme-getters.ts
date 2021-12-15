import { path } from 'ramda';
import { css, CSSObject, SimpleInterpolation } from 'styled-components';
import { ThemeType } from './theme';

type THEME_INDEXES = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

const getVariant = (x: THEME_INDEXES): string => `-${x}`;

export const getTheme =
  (keys: [keyof ThemeType, string]) =>
  (props): SimpleInterpolation =>
    path(['theme', ...keys], props);

/**
 * Takes in the desired animation based on the available values in our theme and returns the concatenated variable string.
 *
 * @param animation
 * @param index
 * @returns `--<animation-name>
 */
export const animation = (animationName: keyof ThemeType['animations']) => getTheme(['animations', `${animationName}`]);

/**
 * Takes in the desired color based on the available values in our theme and returns the concatenated variable string.
 *
 * @example
 * const Button = styled.div`
 *   background-color: ${color('blue', 2)};
 * `
 * --> is equal to: background-color: ${({ theme }) => theme.colors[--blue-2]};
 *
 * @param color
 * @param index
 * @returns `--<color>-<index>
 */
export const color = (color: keyof ThemeType['colors'], index: THEME_INDEXES) =>
  getTheme(['colors', `--${color}${getVariant(index)}`]);

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
  @media all and ${getTheme(['media', `${mediaQuery}`])} {
    ${styles};
  }
`;
