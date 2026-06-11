/**
 * SundaeSwap V4 color ramps — programmatic mirror of Layer 1 (styles/tokens.css).
 *
 * The CSS token layer is authored in OKLCH; these are the sRGB-hex equivalents.
 * Hex is required here because the JS consumers of this module — chart
 * libraries (Chart.js, Recharts), `polished`, canvas APIs — cannot parse
 * `oklch()`. Keep these in lockstep with `styles/tokens.css`.
 *
 * Ramps are exported under their true-color name (`pink`, `violet`, `mint`, ...)
 * and aliased to the legacy role name (`primary`, `secondary`, `success`, ...).
 */

/** Violet-black neutral spine. */
const ink = {
  DEFAULT: "#f4f3f7",
  50: "#faf9fc",
  100: "#f4f3f7",
  200: "#e8e7ed",
  300: "#d5d2dc",
  400: "#bfbcc7",
  500: "#a09ca9",
  600: "#827d8d",
  700: "#656071",
  800: "#4f4a5b",
  900: "#3a3447",
  1000: "#2b2538",
  1100: "#221b2d",
  1200: "#181322",
  1300: "#0e0a15",
  1400: "#050407",
  1500: "#010101",
};

/** Violet-tinted surface ladder. */
const slate = {
  DEFAULT: "#575263",
  50: "#efedf3",
  100: "#d2cfd9",
  200: "#b0abb9",
  300: "#918c9c",
  400: "#716c7c",
  500: "#575263",
  600: "#44404d",
  700: "#34313c",
  800: "#25222c",
  900: "#19171f",
  1000: "#0e0c12",
};

/** Brand primary — deep regal purple, the warm pole of the V4 iris gradient.
 *  Anchors the Unicorn morph palette (purple → cyan → mint). DEFAULT is the
 *  700 stop so chart/token surfaces read as rich purple, not pastel lavender. */
const purple = {
  DEFAULT: "#451a8b",
  50: "#f2f0fd",
  100: "#e6e0fd",
  200: "#d1c4fd",
  300: "#b199f4",
  400: "#8c6de2",
  500: "#6c42c3",
  600: "#552ba3",
  700: "#451a8b",
  800: "#350d70",
  900: "#23044e",
  950: "#0f0129",
};

/** Legacy pink ramp. Demoted from brand-primary in V4; still available for
 *  callsites that want explicit pink (legacy charts, error accents). */
const pink = {
  DEFAULT: "#f7538e",
  50: "#fff1f4",
  100: "#ffdee6",
  200: "#fec1d0",
  300: "#fe9cb8",
  400: "#fe78a2",
  500: "#f7538e",
  600: "#d83977",
  700: "#ad2458",
  800: "#80183c",
  900: "#5c1328",
  950: "#3b0b18",
};

/** Brand secondary — soft pastel lavender. */
const violet = {
  DEFAULT: "#b6aae9",
  50: "#f7f6fd",
  100: "#efecfc",
  200: "#e2ddfa",
  300: "#d3ccf6",
  400: "#c5bcef",
  500: "#b6aae9",
  600: "#9d90d3",
  700: "#8072b0",
  800: "#615388",
  900: "#463b61",
  950: "#2e2641",
};

/** Periwinkle. Info / links. */
const indigo = {
  DEFAULT: "#8b9bff",
  50: "#f3f4fd",
  100: "#e3e6ff",
  200: "#cbd0fe",
  300: "#b1b7fd",
  400: "#8b9bff",
  500: "#7b7ded",
  600: "#6062db",
  700: "#464bb5",
  800: "#31398c",
  900: "#202962",
  950: "#141b41",
};

/** Sky. Closes the iris gradient. */
const cyan = {
  DEFAULT: "#5ed6ff",
  50: "#edf7fc",
  100: "#d1edfb",
  200: "#afe0f7",
  300: "#89d7f9",
  400: "#5ed6ff",
  500: "#32b3e6",
  600: "#0995c8",
  700: "#0775a1",
  800: "#04567b",
  900: "#023c59",
  950: "#01273d",
};

/** Warm honey. Warning / highlight. */
const gold = {
  DEFAULT: "#f9bb5c",
  50: "#fcf4e8",
  100: "#fee7cb",
  200: "#ffd6a3",
  300: "#feca88",
  400: "#febc66",
  500: "#f9bb5c",
  600: "#da943f",
  700: "#af702b",
  800: "#835021",
  900: "#5e381a",
  950: "#3e2412",
};

/** Spring green. Success. Hue nudged ~13° warmer toward the iris-mint pole —
 *  mirror of the oklch ramp in styles/tokens.css (kept in lockstep so the
 *  chart libs that read these hexes stay aligned with the CSS-token greens). */
const mint = {
  DEFAULT: "#5fc77d",
  50: "#edf9ef",
  100: "#d4f1d8",
  200: "#b3e7bb",
  300: "#93dca0",
  400: "#7cd591",
  500: "#5fc77d",
  600: "#44aa67",
  700: "#338451",
  800: "#23643d",
  900: "#17482c",
  950: "#0e311d",
};

/** Red. Error / destructive. */
const coral = {
  DEFAULT: "#ed3d57",
  50: "#fff2f1",
  100: "#ffdfdd",
  200: "#febebd",
  300: "#fe8f92",
  400: "#fe6270",
  500: "#ed3d57",
  600: "#d12444",
  700: "#a81032",
  800: "#7e0a21",
  900: "#590915",
  950: "#3a060c",
};

/** The Unicorn iris-morph animation's exact gradient stops (sRGB). The V4
 *  signature accent ramp — deep indigo → aubergine → lavender → sky → mint —
 *  sampled straight from `static/iris-morph.json` so flat accents match the
 *  animated CTA pixel-for-pixel. Hex (not a named ramp) because these are the
 *  precise WebGL-sampled values, and the chart/`polished` consumers can't parse
 *  oklch. Mirrored on the CSS side by the `--iris-*` stops in tokens.css. */
const iris = {
  indigo: "#350699", // 0%   — deep regal indigo (the warm pole)
  aubergine: "#2d0337", // 25%  — near-black; too dark for a fill, ramp only
  lavender: "#a26ae9", // 50%  — electric lavender
  sky: "#43d2ff", // 75%  — bright cyan
  mint: "#c7fcae", // 100% — pale spring green (the cool pole)
};

export const colors = {
  inherit: "inherit",
  current: "currentColor",
  transparent: "transparent",
  white: "#FFFFFF",
  black: "#000000",

  /* True-color ramps */
  ink,
  slate,
  purple,
  pink,
  violet,
  indigo,
  cyan,
  gold,
  mint,
  coral,
  iris,

  /* Legacy role aliases — V4 brand: purple → cyan, with mint/gold/coral as
   * status accents. Pink stays available as `pink` but no longer leads. */
  neutral: ink,
  primary: purple,
  secondary: cyan,
  highlight: gold,
  success: mint,
  error: coral,
  warning: gold,
  silent: slate,
  blue: indigo,

  /* Named accents — the cool notes now sample the iris-morph animation exactly
   * (indigo → lavender → sky → mint, the brand's hero gradient). The warm status
   * accents (`gold`, `pink`) and the info periwinkle (`indigo`) sit outside the
   * morph and keep their own identities. */
  accent: {
    purple: iris.indigo,
    violet: iris.lavender,
    cyan: iris.sky,
    mint: iris.mint,
    gold: gold[500],
    pink: pink[500],
    indigo: indigo[400],
    /* legacy accent aliases */
    salmon: coral[300],
    peach: gold[300],
  },

  /* Third-party social brand colors — not part of the palette */
  socials: {
    github: "#6e5494",
    twitter: "#1da1f2",
    discord: "#5865f2",
    telegram: "#229ed9",
    medium: "#00ab6c",
    reddit: "#ff4500",
    linkedin: "#0077b5",
    youtube: "#ff0000",
  },
};
