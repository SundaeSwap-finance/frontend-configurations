import type { Linter } from "eslint";
import pluginJest from "eslint-plugin-jest";
import configPrettier from "eslint-plugin-prettier/recommended";
import pluginReact from "eslint-plugin-react";
import pluginReactHooks from "eslint-plugin-react-hooks";
import globals from "globals";
import configTs from "typescript-eslint";

import { designSystemRestrictedSyntax, rules } from "./rules.js";
import { hasJest, hasReact } from "./utils.js";

const ignoreList = ["**/.*", "**/dist/**"];
const pluginList = {};

if (hasJest) {
  pluginList["jest"] = pluginJest;
}

if (hasReact) {
  pluginList["react"] = pluginReact;
  pluginList["react-hooks"] = pluginReactHooks;
}

const config: Linter.FlatConfig = {
  ignores: ignoreList,
  languageOptions: {
    globals: {
      ...globals.browser,
      ...globals.builtin,
      exports: true,
      process: true,
    },
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
        experimentalObjectRestSpread: true,
      },
    },
  },
  rules,
};

if (Object.keys(pluginList).length === 0) {
  config.plugins = pluginList;
}

export const configs = [
  ...configTs.configs.recommended,
  config,
  configPrettier,
];

/**
 * Opt-in SundaeSwap V4 design-system drift guards. Append AFTER `configs` in a
 * consumer's flat-config array (design-system apps/libs: dex-v2, ui-toolkit).
 * Re-states the base `no-restricted-syntax` selectors so it augments rather
 * than clobbers them for the matched files.
 */
const baseRestrictedSyntax = Array.isArray(rules?.["no-restricted-syntax"])
  ? (rules["no-restricted-syntax"] as unknown[]).slice(1)
  : [];

export const designSystemConfig: Linter.FlatConfig = {
  files: ["src/**/*.{ts,tsx,jsx}"],
  rules: {
    "no-restricted-syntax": [
      "warn",
      ...baseRestrictedSyntax,
      ...designSystemRestrictedSyntax,
    ],
  },
};
