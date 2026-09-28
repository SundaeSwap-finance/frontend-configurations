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

/** Plum near-black neutral spine (hue 300, the website `plum` scale's hue). */
const ink = {
  DEFAULT: "#f4f1fb",
  50: "#f9f7fd",
  100: "#f4f1fb",
  200: "#e8e4f2",
  300: "#d5cfe1",
  400: "#bfb8cd",
  500: "#a098b0",
  600: "#827995",
  700: "#665c79",
  800: "#504663",
  900: "#3c3150",
  1000: "#2d2240",
  1100: "#221734",
  1200: "#190f28",
  1300: "#0e061b",
  1400: "#05020c",
  1500: "#010002",
};

/** Plum surface ladder (hue 300). */
const slate = {
  DEFAULT: "#59506b",
  50: "#f0edf6",
  100: "#d3cede",
  200: "#b1aac0",
  300: "#928aa3",
  400: "#726984",
  500: "#59506b",
  600: "#453e53",
  700: "#352f41",
  800: "#262130",
  900: "#1a1623",
  1000: "#0f0b15",
};

/** Brand primary — the muted plum ramp (hue ~300), not a neon. 300 is the
 *  lilac (#cdb8fa, == opal.lilac), 600/700/800 the website's plum gloss
 *  (#6a4e97 / #523a7d / #3b2a5c), 900/950 the website's plum-900 / plum-950
 *  (#261d38 text / #110a1f the dark page floor). DEFAULT is the 700 stop so
 *  chart/token surfaces read as rich plum, not pastel lilac. These are the
 *  sRGB renders of the oklch stops in styles/tokens.css — `bun check:tokens`
 *  gates the lockstep and the anchors. */
const purple = {
  DEFAULT: "#523a7d",
  50: "#f8f5fe",
  100: "#efe9fd",
  200: "#e2d5fd",
  300: "#cdb8fa",
  400: "#a68bd7",
  500: "#8062b2",
  600: "#6a4e97",
  700: "#523a7d",
  800: "#3b2a5c",
  900: "#261d38",
  950: "#110a1f",
};

/** The website's pale `ground` pink (hue ~321). 200 (#fceaff) is THE ground:
 *  the dark-mode primary pill + text and the light-mode page; 50–300 are the
 *  website gloss stops, 400–950 derived deeper for tints and paper text. */
const ground = {
  DEFAULT: "#fceaff",
  50: "#fffbff",
  100: "#fff6ff",
  200: "#fceaff",
  300: "#efd4f5",
  400: "#dbb5e2",
  500: "#bf92c7",
  600: "#9e6fa7",
  700: "#7b5182",
  800: "#57375d",
  900: "#38213c",
  950: "#211223",
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

/** Periwinkle lavender (hue 291), saturated. The pastel chord's lead note
 *  (glass tint, callout-info, chart-1). */
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

/** Sky (hue 230). The bright accent — action-secondary. */
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

/** Spring green (hue 147, pushed past the reference chroma).
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

/** Red (hue 17, held clear of brand pink, more saturated). Error. */
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

/** Opal — the iridescent signature: the website's holo palette (the froyo's
 *  pearl finish, `holoFinish.ts`), pink → lilac → azure → cyan → pearl →
 *  peach. Exact website hexes, shared with the WebGL `OpalFill` shader and
 *  mirrored on the CSS side by the `--opal-*` stops in tokens.css
 *  (`bun check:tokens` pins both to the same six values). */
const opal = {
  pink: "#f6a8dc",
  lilac: "#cdb8fa", // == purple[300]
  azure: "#6e9cff",
  cyan: "#8fe7f2",
  pearl: "#f3f5ff",
  peach: "#fad3c8",
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
  ground,
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
  opal,

  /* Legacy role aliases — plum brand: purple → cyan, with mint/gold/coral as
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

  /* Named accents — the cool notes sample the opal finish exactly (lilac,
   * cyan), purple is the brand plum, and mint is the dark-mode success fill
   * (theme.css `:root:not(.light)` mint-400). The warm status accents
   * (`gold`, `pink`) and the info periwinkle (`indigo`) keep their own
   * identities. */
  accent: {
    purple: purple[600],
    violet: opal.lilac,
    cyan: opal.cyan,
    mint: "#c7fcae",
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
