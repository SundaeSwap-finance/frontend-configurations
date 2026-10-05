#!/usr/bin/env node
/**
 * ============================================================================
 * Token integrity & accessibility gate — Sundae V4 design system.
 * ============================================================================
 *
 * Node ESM, zero dependencies. Fails (exit 1) on any of:
 *
 *   (a) GAMUT    — an oklch() ramp stop in src/styles/tokens.css whose chroma
 *                  exceeds the sRGB boundary at its L/H (out-of-gamut color).
 *   (b) LOCKSTEP — a ramp stop whose hex in src/colors.ts does not equal the
 *                  sRGB render of the matching oklch() in tokens.css (<=1 LSB).
 *   (c) CONTRAST — a must-pass WCAG pair, resolved live by parsing the
 *                  theme.css role->ramp mapping, drops below its floor.
 *   (d) ANCHORS  — a stop pinned to an exact website hex drifts by even one
 *                  LSB: the plum `purple` / `ground` anchors (CSS render AND
 *                  colors.ts), the six `opal` stops (tokens.css AND colors.ts),
 *                  and the two page floors theme.css resolves to.
 *   (e) SHAPE    — a ramp loses its intent: `ink`/`slate` leave the hue-300
 *                  plum spine, `purple`/`ground` leave their hue band, stop
 *                  tapering chroma toward both ends (one peak), or `purple`
 *                  climbs back toward a neon (peak chroma above the muted cap).
 *
 * The CSS/TS token files are stable, regex-parseable formats. This script only
 * reads them; it never mutates anything.
 * ============================================================================
 */

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const TOKENS_CSS = join(ROOT, "src/styles/tokens.css");
const COLORS_TS = join(ROOT, "src/colors.ts");
const THEME_CSS = join(ROOT, "src/styles/theme.css");

/** Ramp families that live in tokens.css as oklch() AND in colors.ts as hex. */
const RAMP_NAMES = [
  "ink",
  "slate",
  "purple",
  "ground",
  "pink",
  "magenta",
  "violet",
  "indigo",
  "cyan",
  "aqua",
  "citron",
  "gold",
  "mint",
  "coral",
];

/** Ramp stops pinned to exact website hexes (tokens.css comments cite them). */
const RAMP_ANCHORS = [
  { ramp: "purple", stop: 300, hex: "#cdb8fa" }, // lilac — dark link / ring
  { ramp: "purple", stop: 600, hex: "#6a4e97" }, // plum gloss top — light fill
  { ramp: "purple", stop: 700, hex: "#523a7d" }, // plum gloss mid
  { ramp: "purple", stop: 800, hex: "#3b2a5c" }, // plum gloss base
  { ramp: "purple", stop: 900, hex: "#261d38" }, // website plum-900
  { ramp: "purple", stop: 950, hex: "#110a1f" }, // website plum-950
  { ramp: "ground", stop: 50, hex: "#fffbff" },
  { ramp: "ground", stop: 100, hex: "#fff6ff" },
  { ramp: "ground", stop: 200, hex: "#fceaff" }, // THE ground
  { ramp: "ground", stop: 300, hex: "#efd4f5" },
];

/** The opal finish — the website holo palette, exact. */
const OPAL = {
  pink: "#f6a8dc",
  lilac: "#cdb8fa",
  azure: "#6e9cff",
  cyan: "#8fe7f2",
  pearl: "#f3f5ff",
  peach: "#fad3c8",
};

/** Page floors theme.css must resolve to, per mode. */
const PAGE_ANCHORS = [
  { scope: "dark", role: "surface-page", hex: "#110a1f" }, // plum-950
  { scope: "light", role: "surface-page", hex: "#fffbff" }, // ground-50
];

/** Intent of each shaped ramp: hue band, and (purple) the muted chroma cap. */
const RAMP_SHAPES = {
  ink: { hue: [300, 300] },
  slate: { hue: [300, 300] },
  purple: { hue: [296, 301], maxChroma: 0.13, unimodal: true },
  ground: { hue: [319, 327], unimodal: true },
};

/* ============================================================================
 * Color math — OKLCH -> OKLab -> linear sRGB -> gamma sRGB.
 * Matrices are the standard Björn Ottosson OKLab <-> linear-sRGB transforms.
 * ========================================================================== */

/** OKLab -> linear sRGB. */
function oklabToLinearSrgb(L, a, b) {
  const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = L - 0.0894841775 * a - 1.291485548 * b;

  const l = l_ * l_ * l_;
  const m = m_ * m_ * m_;
  const s = s_ * s_ * s_;

  return [
    +4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
  ];
}

/** linear-light channel -> gamma-encoded sRGB (0..1). */
function linearToGamma(c) {
  if (c <= 0.0031308) return 12.92 * c;
  return 1.055 * Math.pow(c, 1 / 2.4) - 0.055;
}

/**
 * oklch(L% C H) -> { r, g, b } in 0..255 (rounded), plus the raw linear-light
 * channels (pre-clip) so the gamut check can test the boundary independently.
 */
function oklchToSrgb(Lpct, C, Hdeg) {
  const L = Lpct / 100;
  const h = (Hdeg * Math.PI) / 180;
  const a = C * Math.cos(h);
  const b = C * Math.sin(h);

  const lin = oklabToLinearSrgb(L, a, b);
  const rgb = lin.map((c) => {
    const clamped = Math.min(1, Math.max(0, c));
    return Math.round(linearToGamma(clamped) * 255);
  });
  return { r: rgb[0], g: rgb[1], b: rgb[2], lin };
}

/**
 * In-gamut test, independent of hex equality. A color is in the sRGB gamut iff
 * every linear channel sits within [0,1] (a small epsilon absorbs float noise
 * at the boundary). If any channel is meaningfully <0 or >1, the requested
 * chroma is unreachable at that L/H — the color is out of gamut.
 */
function isInGamut(lin) {
  const EPS = 1e-4;
  return lin.every((c) => c >= -EPS && c <= 1 + EPS);
}

function hexToRgb(hex) {
  const h = hex.replace("#", "");
  return {
    r: parseInt(h.slice(0, 2), 16),
    g: parseInt(h.slice(2, 4), 16),
    b: parseInt(h.slice(4, 6), 16),
  };
}

/* ============================================================================
 * WCAG relative luminance + contrast ratio (sRGB).
 * ========================================================================== */

function channelLuminance(c8) {
  const c = c8 / 255;
  return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}

function relLuminance({ r, g, b }) {
  return (
    0.2126 * channelLuminance(r) +
    0.7152 * channelLuminance(g) +
    0.0722 * channelLuminance(b)
  );
}

function contrastRatio(fg, bg) {
  const L1 = relLuminance(fg);
  const L2 = relLuminance(bg);
  const lighter = Math.max(L1, L2);
  const darker = Math.min(L1, L2);
  return (lighter + 0.05) / (darker + 0.05);
}

/* ============================================================================
 * Parsing — tokens.css ramp stops and colors.ts hex stops.
 * ========================================================================== */

/** All `--<ramp>-<stop>: oklch(L% C H);` declarations (the Layer-1 ramps). */
function parseTokensCss(src) {
  const stops = [];
  const re = new RegExp(
    `--(${RAMP_NAMES.join("|")})-(\\d+):\\s*oklch\\(\\s*([\\d.]+)%\\s+([\\d.]+)\\s+([\\d.]+)\\s*\\)`,
    "g",
  );
  let m;
  while ((m = re.exec(src)) !== null) {
    const [, ramp, stop, L, C, H] = m;
    stops.push({
      ramp,
      stop: Number(stop),
      L: Number(L),
      C: Number(C),
      H: Number(H),
    });
  }
  return stops;
}

/**
 * Parse colors.ts into { ramp -> { stop -> hex } }. The file is a set of
 * `const <ramp> = { 50: "#...", 100: "#...", ... }` object literals.
 */
function parseColorsTs(src) {
  const out = {};
  for (const ramp of RAMP_NAMES) {
    const block = new RegExp(`const ${ramp} = \\{([\\s\\S]*?)\\};`).exec(src);
    if (!block) continue;
    out[ramp] = {};
    const stopRe = /(\d+):\s*"(#[0-9a-fA-F]{6})"/g;
    let m;
    while ((m = stopRe.exec(block[1])) !== null) {
      out[ramp][Number(m[1])] = m[2];
    }
  }
  return out;
}

/** `--opal-<name>: #rrggbb;` declarations in tokens.css -> { name -> hex }. */
function parseOpalCss(src) {
  const out = {};
  const re = /--opal-([a-z]+):\s*(#[0-9a-fA-F]{6})\s*;/g;
  let m;
  while ((m = re.exec(src)) !== null) out[m[1]] = m[2].toLowerCase();
  return out;
}

/** The `const opal = { name: "#rrggbb", ... }` literal in colors.ts. */
function parseOpalTs(src) {
  const out = {};
  const block = /const opal = \{([\s\S]*?)\};/.exec(src);
  if (!block) return out;
  const re = /([a-z]+):\s*"(#[0-9a-fA-F]{6})"/g;
  let m;
  while ((m = re.exec(block[1])) !== null) out[m[1]] = m[2].toLowerCase();
  return out;
}

const toHex = ({ r, g, b }) =>
  "#" + [r, g, b].map((c) => c.toString(16).padStart(2, "0")).join("");

/* ============================================================================
 * theme.css role resolution — the live source of truth for contrast pairs.
 * ========================================================================== */

/** Resolve a `--<ramp>-<stop>` reference to its colors.ts hex, as RGB. */
function ramp(name, stop) {
  const hex = tsRamps[name]?.[stop];
  if (!hex) throw new Error(`contrast: missing ${name}-${stop} in colors.ts`);
  return hexToRgb(hex);
}

/**
 * Extract a `{ varName -> rawValue }` map for one theme.css scope block
 * (`.dark { ... }` / `.light { ... }`). theme.css is two flat, brace-free
 * custom-property blocks, so a non-greedy match to the closing brace is safe.
 */
function parseThemeScope(src, scope) {
  const block = new RegExp(`\\.${scope}\\s*\\{([\\s\\S]*?)\\n\\}`).exec(src);
  if (!block) throw new Error(`theme.css: no .${scope} block found`);
  const map = {};
  const re = /--([a-z][a-z0-9-]*):\s*([^;]+);/g;
  let m;
  while ((m = re.exec(block[1])) !== null) {
    map[m[1]] = m[2].trim();
  }
  return map;
}

/**
 * Resolve a theme.css role variable to its on-screen RGB, following the same
 * var()/oklch() chain the browser would: a `var(--<ramp>-<stop>)` ref lands in
 * colors.ts (the hex consumers see), a `var(--opal-<name>)` ref lands on its
 * exact tokens.css hex, a bare `oklch()` is rendered directly, and a
 * `var(--<other-role>)` recurses within the same scope. This is what keeps the
 * contrast table honest — it reads the LIVE role->ramp mapping rather than a
 * hand-copied table that silently drifts from theme.css.
 */
function resolveRole(scopeMap, name, seen = new Set()) {
  if (seen.has(name)) throw new Error(`theme.css: cyclic role --${name}`);
  seen.add(name);
  const raw = scopeMap[name];
  if (raw === undefined)
    throw new Error(`theme.css: role --${name} not defined in scope`);

  const ok = /^oklch\(\s*([\d.]+)%\s+([\d.]+)\s+([\d.]+)\s*\)$/.exec(raw);
  if (ok) return oklchToSrgb(Number(ok[1]), Number(ok[2]), Number(ok[3]));

  const v = /^var\(\s*--([a-z0-9-]+)\s*\)$/.exec(raw);
  if (v) {
    const ref = v[1];
    const rs = /^([a-z]+)-(\d+)$/.exec(ref);
    if (rs && tsRamps[rs[1]]) return ramp(rs[1], Number(rs[2]));
    const opal = /^opal-([a-z]+)$/.exec(ref);
    if (opal && opalCss[opal[1]]) return hexToRgb(opalCss[opal[1]]);
    return resolveRole(scopeMap, ref, seen);
  }
  throw new Error(`theme.css: cannot resolve --${name}: "${raw}"`);
}

/* ============================================================================
 * Run.
 * ========================================================================== */

const tokensSrc = readFileSync(TOKENS_CSS, "utf8");
const colorsSrc = readFileSync(COLORS_TS, "utf8");
const themeSrc = readFileSync(THEME_CSS, "utf8");

const cssStops = parseTokensCss(tokensSrc);
const tsRamps = parseColorsTs(colorsSrc);
const DARK = parseThemeScope(themeSrc, "dark");
const LIGHT = parseThemeScope(themeSrc, "light");
const SCOPES = { dark: DARK, light: LIGHT };
const opalCss = parseOpalCss(tokensSrc);
const opalTs = parseOpalTs(colorsSrc);

let failures = 0;
const log = (s = "") => process.stdout.write(s + "\n");

log("============================================================");
log(" Sundae V4 — token integrity & a11y gate");
log("============================================================");

/* ---- (a) GAMUT ---------------------------------------------------------- */
log("\n[a] GAMUT — every oklch ramp stop must fit inside sRGB");
let gamutFails = 0;
for (const s of cssStops) {
  const { lin } = oklchToSrgb(s.L, s.C, s.H);
  if (!isInGamut(lin)) {
    gamutFails++;
    failures++;
    const worst = Math.max(...lin.map((c) => Math.max(-c, c - 1))).toFixed(4);
    log(
      `  FAIL --${s.ramp}-${s.stop}: oklch(${s.L}% ${s.C} ${s.H}) out of gamut (overshoot ${worst})`,
    );
  }
}
log(
  gamutFails === 0
    ? `  PASS — ${cssStops.length} stops all in-gamut`
    : `  ${gamutFails} stop(s) out of gamut`,
);

/* ---- (b) LOCKSTEP ------------------------------------------------------- */
log(
  "\n[b] LOCKSTEP — colors.ts hex must equal sRGB render of tokens.css oklch (<=1 LSB)",
);
let lockstepFails = 0;
let lockstepChecked = 0;
for (const s of cssStops) {
  const hex = tsRamps[s.ramp]?.[s.stop];
  if (!hex) {
    // A CSS stop with no hex mirror (e.g. a stop colors.ts omits) — report it.
    lockstepFails++;
    failures++;
    log(
      `  FAIL --${s.ramp}-${s.stop}: present in tokens.css but missing in colors.ts`,
    );
    continue;
  }
  lockstepChecked++;
  const rendered = oklchToSrgb(s.L, s.C, s.H);
  const want = hexToRgb(hex);
  const dr = Math.abs(rendered.r - want.r);
  const dg = Math.abs(rendered.g - want.g);
  const db = Math.abs(rendered.b - want.b);
  if (dr > 1 || dg > 1 || db > 1) {
    lockstepFails++;
    failures++;
    const got = toHex(rendered);
    log(
      `  FAIL --${s.ramp}-${s.stop}: tokens.css renders ${got} but colors.ts has ${hex} (Δ ${dr},${dg},${db})`,
    );
  }
}
log(
  lockstepFails === 0
    ? `  PASS — ${lockstepChecked} stops in lockstep`
    : `  ${lockstepFails} stop(s) out of lockstep`,
);

/* ---- (c) CONTRAST ------------------------------------------------------- */
/**
 * Must-pass WCAG pairs. Foreground/background are resolved LIVE from the
 * theme.css `.dark` / `.light` scope blocks (see resolveRole) — never copied —
 * so the table tracks the role->ramp mapping the browser actually applies and
 * cannot silently drift from it. The only literals are component label colors
 * (a white or gold-900 label some buttons paint on an action fill); those are
 * call-site choices with no theme role to resolve.
 */
const WHITE = { r: 255, g: 255, b: 255 };

/** A theme.css role pair in one mode — fg/bg resolved live. */
const rolePair = (scope, fg, bg, floor) => ({
  name: `${scope} ${fg} on ${bg}`,
  fg: resolveRole(SCOPES[scope], fg),
  bg: resolveRole(SCOPES[scope], bg),
  floor,
});

const contrastPairs = [
  // The text ladder: scion (heading == body), secondary, tertiary are all
  // load-bearing and must clear AA on the page floor in both modes. (Subtle
  // is sub-AA by design and deliberately absent.)
  rolePair("dark", "text-body", "surface-page", 4.5),
  rolePair("dark", "text-secondary", "surface-page", 4.5),
  rolePair("dark", "text-tertiary", "surface-page", 4.5),
  rolePair("light", "text-body", "surface-page", 4.5),
  rolePair("light", "text-secondary", "surface-page", 4.5),
  rolePair("light", "text-tertiary", "surface-page", 4.5),
  // The label every primary pill paints on its fill.
  rolePair("dark", "text-on-primary", "action-primary", 4.5),
  rolePair("light", "text-on-primary", "action-primary", 4.5),
  // Links, resting and hover.
  rolePair("dark", "text-link", "surface-page", 4.5),
  rolePair("dark", "text-link-hover", "surface-page", 4.5),
  rolePair("light", "text-link", "surface-page", 4.5),
  rolePair("light", "text-link-hover", "surface-page", 4.5),
  // Focus ring — a WCAG 1.4.11 non-text boundary.
  rolePair("dark", "ring", "surface-page", 3.0),
  rolePair("light", "ring", "surface-page", 3.0),
  // Named accents paint identity glyphs, key dots and short labels — the same
  // WCAG 1.4.11 3:1 floor on the page in both modes. (Light once pinned violet
  // and cyan to their opal stops, which land 1.6:1 and 1.2:1 on paper.)
  ...["pink", "magenta", "violet", "indigo", "cyan", "gold"].flatMap((hue) => [
    rolePair("dark", `accent-${hue}`, "surface-page", 3.0),
    rolePair("light", `accent-${hue}`, "surface-page", 3.0),
  ]),
  {
    // Some consumers paint a literal white label on bg-action-primary, so the
    // light fill must clear AA against white too.
    name: "light action-primary with white label",
    fg: WHITE,
    bg: resolveRole(LIGHT, "action-primary"),
    floor: 4.5,
  },
  {
    // Button secondary paints a dark gold-900 label on the action-secondary
    // fill (light fill, dark text).
    name: "light action-secondary with gold-900 label",
    fg: ramp("gold", 900),
    bg: resolveRole(LIGHT, "action-secondary"),
    floor: 4.5,
  },
];

log("\n[c] CONTRAST — must-pass WCAG pairs (theme.css role -> ramp mapping)");
let contrastFails = 0;
for (const p of contrastPairs) {
  const ratio = contrastRatio(p.fg, p.bg);
  const ok = ratio >= p.floor;
  if (!ok) {
    contrastFails++;
    failures++;
  }
  log(
    `  ${ok ? "PASS" : "FAIL"} ${ratio.toFixed(2)}:1 (floor ${p.floor.toFixed(1)}) — ${p.name}`,
  );
}
log(
  contrastFails === 0
    ? `  PASS — ${contrastPairs.length} pairs all clear their floor`
    : `  ${contrastFails} pair(s) below floor`,
);

/* ---- (d) ANCHORS -------------------------------------------------------- */
log("\n[d] ANCHORS — website-pinned stops must render to their exact hex");
let anchorFails = 0;
const anchorFail = (msg) => {
  anchorFails++;
  failures++;
  log(`  FAIL ${msg}`);
};
for (const a of RAMP_ANCHORS) {
  const s = cssStops.find((x) => x.ramp === a.ramp && x.stop === a.stop);
  if (!s) {
    anchorFail(`--${a.ramp}-${a.stop}: missing from tokens.css`);
    continue;
  }
  const css = toHex(oklchToSrgb(s.L, s.C, s.H));
  if (css !== a.hex)
    anchorFail(`--${a.ramp}-${a.stop}: tokens.css renders ${css}, anchor is ${a.hex}`);
  const ts = tsRamps[a.ramp]?.[a.stop]?.toLowerCase();
  if (ts !== a.hex)
    anchorFail(`${a.ramp}[${a.stop}]: colors.ts has ${ts}, anchor is ${a.hex}`);
}
for (const [name, hex] of Object.entries(OPAL)) {
  if (opalCss[name] !== hex)
    anchorFail(`--opal-${name}: tokens.css has ${opalCss[name]}, anchor is ${hex}`);
  if (opalTs[name] !== hex)
    anchorFail(`opal.${name}: colors.ts has ${opalTs[name]}, anchor is ${hex}`);
}
for (const name of new Set([...Object.keys(opalCss), ...Object.keys(opalTs)])) {
  if (!(name in OPAL)) anchorFail(`opal stop "${name}" is not part of the opal finish`);
}
for (const p of PAGE_ANCHORS) {
  const got = toHex(resolveRole(SCOPES[p.scope], p.role));
  if (got !== p.hex)
    anchorFail(`${p.scope} --${p.role}: resolves to ${got}, anchor is ${p.hex}`);
}
const anchorCount =
  RAMP_ANCHORS.length + Object.keys(OPAL).length + PAGE_ANCHORS.length;
log(
  anchorFails === 0
    ? `  PASS — ${anchorCount} anchors exact`
    : `  ${anchorFails} anchor(s) drifted`,
);

/* ---- (e) SHAPE ---------------------------------------------------------- */
log("\n[e] SHAPE — spine hue, ramp hue bands, chroma taper, muted plum cap");
let shapeFails = 0;
const shapeFail = (msg) => {
  shapeFails++;
  failures++;
  log(`  FAIL ${msg}`);
};
for (const [rampName, shape] of Object.entries(RAMP_SHAPES)) {
  const stops = cssStops
    .filter((s) => s.ramp === rampName)
    .sort((a, b) => a.stop - b.stop);
  if (stops.length === 0) {
    shapeFail(`--${rampName}-*: no stops in tokens.css`);
    continue;
  }
  const [lo, hi] = shape.hue;
  for (const s of stops) {
    if (s.H < lo || s.H > hi)
      shapeFail(`--${rampName}-${s.stop}: hue ${s.H} outside ${lo}–${hi}`);
  }
  if (shape.maxChroma !== undefined) {
    const peak = Math.max(...stops.map((s) => s.C));
    if (peak > shape.maxChroma)
      shapeFail(`--${rampName}-*: peak chroma ${peak} above the ${shape.maxChroma} cap`);
  }
  if (shape.unimodal) {
    // Chroma rises to one peak and falls after it: tapered at both extremes.
    const peakAt = stops.reduce((best, s, i) => (s.C > stops[best].C ? i : best), 0);
    for (let i = 1; i < stops.length; i++) {
      const rising = i <= peakAt;
      const ok = rising ? stops[i].C >= stops[i - 1].C : stops[i].C <= stops[i - 1].C;
      if (!ok)
        shapeFail(
          `--${rampName}-${stops[i].stop}: chroma ${stops[i].C} breaks the taper (${rising ? "rising" : "falling"} side)`,
        );
    }
  }
}
log(
  shapeFails === 0
    ? `  PASS — ${Object.keys(RAMP_SHAPES).length} ramps hold their shape`
    : `  ${shapeFails} shape violation(s)`,
);

/* ---- Report ------------------------------------------------------------- */
log("\n============================================================");
if (failures === 0) {
  log(" RESULT: PASS — tokens are in-gamut, in lockstep, anchored, and accessible");
  log("============================================================");
  process.exit(0);
} else {
  log(` RESULT: FAIL — ${failures} problem(s) above`);
  log("============================================================");
  process.exit(1);
}
