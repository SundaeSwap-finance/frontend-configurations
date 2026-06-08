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
  // Restrict to ramp families that have a hex mirror in colors.ts.
  const RAMP_NAMES = [
    "ink",
    "slate",
    "purple",
    "pink",
    "violet",
    "indigo",
    "cyan",
    "gold",
    "mint",
    "coral",
  ];
  const stops = [];
  const re =
    /--(ink|slate|purple|pink|violet|indigo|cyan|gold|mint|coral)-(\d+):\s*oklch\(\s*([\d.]+)%\s+([\d.]+)\s+([\d.]+)\s*\)/g;
  let m;
  while ((m = re.exec(src)) !== null) {
    const [, ramp, stop, L, C, H] = m;
    if (!RAMP_NAMES.includes(ramp)) continue;
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
  const RAMP_NAMES = [
    "ink",
    "slate",
    "purple",
    "pink",
    "violet",
    "indigo",
    "cyan",
    "gold",
    "mint",
    "coral",
  ];
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
 * colors.ts (the hex consumers see), a bare `oklch()` is rendered directly, and
 * a `var(--<other-role>)` recurses within the same scope. This is what keeps the
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
    const got =
      "#" +
      [rendered.r, rendered.g, rendered.b]
        .map((c) => c.toString(16).padStart(2, "0"))
        .join("");
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

const contrastPairs = [
  {
    // --text-tertiary: metadata, %, sub-values, denominators.
    name: "dark text-tertiary on surface-page",
    fg: resolveRole(DARK, "text-tertiary"),
    bg: resolveRole(DARK, "surface-page"),
    floor: 3.0, // WCAG 1.4.11 non-text / large-text territory
  },
  {
    // --text-heading == --text-body == --text-scion.
    name: "dark text primary (heading == body) on surface-page",
    fg: resolveRole(DARK, "text-body"),
    bg: resolveRole(DARK, "surface-page"),
    floor: 4.5,
  },
  {
    name: "light text primary (heading == body) on surface-page",
    fg: resolveRole(LIGHT, "text-body"),
    bg: resolveRole(LIGHT, "surface-page"),
    floor: 4.5,
  },
  {
    name: "dark text-secondary on surface-page",
    fg: resolveRole(DARK, "text-secondary"),
    bg: resolveRole(DARK, "surface-page"),
    floor: 4.5,
  },
  {
    // Some consumers paint a white label on bg-action-primary, so the fill
    // must clear AA against white.
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
  {
    name: "light text-link-hover on surface-page",
    fg: resolveRole(LIGHT, "text-link-hover"),
    bg: resolveRole(LIGHT, "surface-page"),
    floor: 4.5,
  },
  {
    // Dark-mode link hover — previously untested.
    name: "dark text-link-hover on surface-page",
    fg: resolveRole(DARK, "text-link-hover"),
    bg: resolveRole(DARK, "surface-page"),
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

/* ---- Report ------------------------------------------------------------- */
log("\n============================================================");
if (failures === 0) {
  log(" RESULT: PASS — tokens are in-gamut, in lockstep, and accessible");
  log("============================================================");
  process.exit(0);
} else {
  log(` RESULT: FAIL — ${failures} problem(s) above`);
  log("============================================================");
  process.exit(1);
}
