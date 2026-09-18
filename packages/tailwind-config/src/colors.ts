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

/** Blue-violet near-black neutral spine (cosmic-night hue 286). */
const ink = {
  DEFAULT: "#f1f1fc",
  50: "#f7f7fe",
  100: "#f1f1fc",
  200: "#e5e5f3",
  300: "#d1d1e3",
  400: "#babacf",
  500: "#9a9ab3",
  600: "#7c7b97",
  700: "#5f5e7b",
  800: "#494866",
  900: "#363453",
  1000: "#272443",
  1100: "#1c1936",
  1200: "#13112a",
  1300: "#0a071c",
  1400: "#03020e",
  1500: "#010102",
};

/** Blue-violet surface ladder. */
const slate = {
  DEFAULT: "#54526d",
  50: "#eeedf7",
  100: "#d0cfdf",
  200: "#acabc2",
  300: "#8d8ca6",
  400: "#6d6b86",
  500: "#54526d",
  600: "#414055",
  700: "#323042",
  800: "#232231",
  900: "#181624",
  1000: "#0d0c16",
};

/** Brand primary — hot purple (hue 316). Uniswap-energy neon that still
 *  reads purple on charcoal, not fuchsia. Anchors the Unicorn morph palette
 *  (purple → cyan → mint). DEFAULT is the 700 stop so chart/token surfaces
 *  read as rich purple, not pastel lavender. These are the sRGB renders of the
 *  oklch stops in styles/tokens.css — `bun check:tokens` gates the lockstep. */
const purple = {
  DEFAULT: "#750694",
  50: "#f9edfe",
  100: "#f3dafd",
  200: "#e9b9fc",
  300: "#db8bfa",
  400: "#d04efc",
  500: "#b614e4",
  600: "#950abc",
  700: "#750694",
  800: "#57026f",
  900: "#3a014b",
  950: "#1c0027",
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

/** Vivid fuchsia accent (hue 328) — sibling to pink's rose. Its pastel 300/400
 *  stops are the chart's orchid note. */
const magenta = {
  DEFAULT: "#d020d0",
  50: "#fcf1fb",
  100: "#fbe2fa",
  200: "#f8c3f5",
  300: "#f199ee",
  400: "#e263e0",
  500: "#d020d0",
  600: "#b905b6",
  700: "#960491",
  800: "#730370",
  900: "#560851",
  950: "#360633",
};

/** The cosmic-night accent, saturated — periwinkle lavender. The pastel
 *  chord's lead note (ring, glass tint, chart-1). */
const violet = {
  DEFAULT: "#ac99fe",
  50: "#f6f6ff",
  100: "#eeecff",
  200: "#e1ddfe",
  300: "#d2cbff",
  400: "#c4bafe",
  500: "#ac99fe",
  600: "#957bf1",
  700: "#7b5dd7",
  800: "#5f42ae",
  900: "#432c80",
  950: "#2b1b55",
};

/** Periwinkle (hue 272). Info / links / the chart's blue note. */
const indigo = {
  DEFAULT: "#869dfe",
  50: "#f2f5ff",
  100: "#e0e7ff",
  200: "#c5d3ff",
  300: "#a7bafe",
  400: "#869dfe",
  500: "#677ffb",
  600: "#5064e4",
  700: "#3c4abd",
  800: "#2c3893",
  900: "#1f2867",
  950: "#131a44",
};

/** Sky. Closes the iris gradient. */
const cyan = {
  DEFAULT: "#69cffd",
  50: "#ebf7fd",
  100: "#ceeefe",
  200: "#aae1fc",
  300: "#84d7fe",
  400: "#69cffd",
  500: "#11b3eb",
  600: "#0996c5",
  700: "#07769c",
  800: "#025875",
  900: "#013e54",
  950: "#012838",
};

/** Spearmint (hue 172) — the data-viz hue between mint and sky. */
const aqua = {
  DEFAULT: "#8ae6ca",
  50: "#e8faf3",
  100: "#ccf6e7",
  200: "#a8efd8",
  300: "#8ae6ca",
  400: "#70dbbc",
  500: "#4ac3a2",
  600: "#33a587",
  700: "#27836b",
  800: "#1b6350",
  900: "#124739",
  950: "#0b3026",
};

/** Pale yellow-green (hue 112) — data-viz only; the warm note that carries no
 *  status meaning (gold is warning, mint is success). */
const citron = {
  DEFAULT: "#dde37c",
  50: "#f7f9e5",
  100: "#eff3c5",
  200: "#e6ec9f",
  300: "#dde37c",
  400: "#d0d757",
  500: "#c1c736",
  600: "#a1a716",
  700: "#80840a",
  800: "#5f6308",
  900: "#444606",
  950: "#2c2e04",
};

/** Warm honey. Warning / highlight. */
const gold = {
  DEFAULT: "#fcb956",
  50: "#fef3e7",
  100: "#ffe7c9",
  200: "#fed7a3",
  300: "#ffca83",
  400: "#febd60",
  500: "#fcb956",
  600: "#d89529",
  700: "#ab7312",
  800: "#7e5409",
  900: "#5a3b09",
  950: "#3b2707",
};

/** Spring green (hue 147 — the cosmic-night "up" hue, more saturated).
 *  Success. Mirror of the oklch ramp in styles/tokens.css (kept in lockstep so
 *  the chart libs that read these hexes stay aligned with the CSS greens). */
const mint = {
  DEFAULT: "#4fc765",
  50: "#ecf9ed",
  100: "#d2f2d4",
  200: "#afe9b4",
  300: "#8dde96",
  400: "#6fd57e",
  500: "#4fc765",
  600: "#3ca851",
  700: "#2f823e",
  800: "#22622e",
  900: "#17461f",
  950: "#0e2e13",
};

/** Red (hue 17 — the cosmic-night "down" hue, more saturated). Error. */
const coral = {
  DEFAULT: "#f23156",
  50: "#fff2f2",
  100: "#ffdfdf",
  200: "#ffbebf",
  300: "#fe8f95",
  400: "#fe6273",
  500: "#f23156",
  600: "#d10e41",
  700: "#a50431",
  800: "#7a0322",
  900: "#570115",
  950: "#38020c",
};

/** The Unicorn iris-morph animation's exact gradient stops (sRGB). The V4
 *  signature accent ramp — deep indigo → aubergine → lavender → sky → mint —
 *  sampled straight from `static/iris-morph.json` so flat accents match the
 *  animated CTA pixel-for-pixel. Hex (not a named ramp) because these are the
 *  precise WebGL-sampled values, and the chart/`polished` consumers can't parse
 *  oklch. Mirrored on the CSS side by the `--iris-*` stops in tokens.css. */
const iris = {
  indigo: "#750694", // 0%   — hot purple-700 (the warm pole)
  aubergine: "#2d0337", // 25%  — near-black; too dark for a fill, ramp only
  lavender: "#d04efc", // 50%  — hot purple-400 neon
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
  magenta,
  violet,
  indigo,
  cyan,
  aqua,
  citron,
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

  /* Data-viz — the pastel chord, in series order. Mirrors --chart-1..9 in
   * styles/theme.css (dark). Hues walk the wheel so adjacent series in a
   * stacked chart are maximally separated; slot 1 is the brand lead and slot 5
   * the warm "rewards / fees" note. Light mode's deeper equivalents live in
   * theme.css only — a JS chart on paper should read the CSS vars. */
  chart: [
    violet[500], // lavender  — brand lead
    mint[300], // mint
    magenta[400], // orchid
    cyan[300], // sky
    gold[300], // honey     — rewards / fees
    indigo[400], // periwinkle
    aqua[300], // spearmint
    coral[300], // rose
    citron[300], // citron
  ],

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
