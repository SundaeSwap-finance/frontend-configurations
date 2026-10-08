#!/usr/bin/env node
/**
 * ============================================================================
 * CJS BigInt gate: @sundaeswap/babel-preset.
 * ============================================================================
 *
 * Compiles a BigInt exponent through the built preset's `cjs` env, runs the
 * output, and fails (exit 1) if either:
 *
 *   (a) REWRITE — `**` was compiled to `Math.pow`, which coerces its operands
 *                 to Number and throws on BigInt. Untargeted preset-env does
 *                 exactly this, and it broke the CJS builds of
 *                 @sundaeswap/asset, fraction and bigint-math.
 *   (b) RESULT  — the compiled module throws, or computes the wrong value.
 *
 * Run after `build`; it reads dist/cjs and never writes anything.
 * ============================================================================
 */

import { transformAsync } from "@babel/core";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const PRESET = join(ROOT, "dist/cjs/index.js");

const SOURCE =
  "export const scale = (decimals: bigint): bigint => 10n ** decimals;";

const { code } = await transformAsync(SOURCE, {
  babelrc: false,
  configFile: false,
  cwd: ROOT,
  envName: "cjs",
  filename: join(ROOT, "check.ts"),
  presets: [PRESET],
});

const log = (msg) => process.stdout.write(`${msg}\n`);
let failures = 0;

if (code.includes("Math.pow")) {
  failures++;
  log("  FAIL — REWRITE: `**` was compiled to Math.pow");
} else {
  log("  PASS — `**` survives the cjs env");
}

try {
  const module = { exports: {} };
  vm.runInNewContext(code, {
    exports: module.exports,
    module,
    require: createRequire(PRESET),
  });
  const result = module.exports.scale(3n);
  if (result === 1000n) {
    log("  PASS — scale(3n) === 1000n");
  } else {
    failures++;
    log(`  FAIL — RESULT: scale(3n) returned ${String(result)}`);
  }
} catch (e) {
  failures++;
  log(`  FAIL — RESULT: compiled module threw ${e}`);
}

if (failures === 0) {
  log(" RESULT: PASS — the cjs env keeps BigInt exponents intact");
  process.exit(0);
} else {
  log(` RESULT: FAIL — ${failures} problem(s) above`);
  log(`\nCompiled output:\n${code}`);
  process.exit(1);
}
