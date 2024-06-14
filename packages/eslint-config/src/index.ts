import globals from "globals";
import type { Linter } from "eslint";
import configPrettier from "eslint-plugin-prettier/recommended";
import pluginJest from "eslint-plugin-jest";
import pluginReact from "eslint-plugin-react";
import pluginReactHooks from "eslint-plugin-react-hooks";
import configTs from "typescript-eslint";

import { rules } from "./rules.js";
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
