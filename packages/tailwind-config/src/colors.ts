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
  900: "#3b3449",
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

/** Brand primary. */
const pink = {
  DEFAULT: "#f7538e",
  50: "#fff1f4",
  100: "#ffdce5",
  200: "#ffbccf",
  300: "#ff95b7",
  400: "#ff73a2",
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
  DEFAULT: "#959af7",
  50: "#f3f4fd",
  100: "#e3e6ff",
  200: "#cbd0ff",
  300: "#b1b7fd",
  400: "#959af7",
  500: "#7b7ded",
  600: "#6062db",
  700: "#464bb5",
  800: "#31398c",
  900: "#202962",
  950: "#141b41",
};

/** Sky. Closes the iris gradient. */
const cyan = {
  DEFAULT: "#63ccf8",
  50: "#edf7fc",
  100: "#d1edfb",
  200: "#afe0f7",
  300: "#89d7f9",
  400: "#63ccf8",
  500: "#32b3e6",
  600: "#0096ce",
  700: "#0076ab",
  800: "#005781",
  900: "#003d5c",
  950: "#01273d",
};

/** Warm honey. Warning / highlight. */
const gold = {
  DEFAULT: "#fdb85b",
  50: "#fcf4e8",
  100: "#fee7cb",
  200: "#ffd6a3",
  300: "#ffc981",
  400: "#febc66",
  500: "#fdb85b",
  600: "#da943f",
  700: "#af702b",
  800: "#835021",
  900: "#5e381a",
  950: "#3e2412",
};

/** Spring green. Success. */
const mint = {
  DEFAULT: "#36ca95",
  50: "#ebf9f1",
  100: "#cef2df",
  200: "#a8e9c7",
  300: "#81deb1",
  400: "#62d8a6",
  500: "#36ca95",
  600: "#00ac7c",
  700: "#008761",
  800: "#00664a",
  900: "#004935",
  950: "#023124",
};

/** Red. Error / destructive. */
const coral = {
  DEFAULT: "#ed3d57",
  50: "#fff1f0",
  100: "#ffddda",
  200: "#ffbab9",
  300: "#ff898e",
  400: "#fe6270",
  500: "#ed3d57",
  600: "#d12444",
  700: "#a81032",
  800: "#7e0a21",
  900: "#590915",
  950: "#3a060c",
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
  pink,
  violet,
  indigo,
  cyan,
  gold,
  mint,
  coral,

  /* Legacy role aliases */
  neutral: ink,
  primary: pink,
  secondary: violet,
  highlight: gold,
  success: mint,
  error: coral,
  warning: gold,
  silent: slate,
  blue: indigo,

  /* Named accents — the five-note neon chord */
  accent: {
    pink: pink[500],
    violet: violet[500],
    indigo: indigo[400],
    cyan: cyan[400],
    gold: gold[500],
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
