import { ESLint } from "eslint";
import { hasReact } from "./utils.js";

/**
 * SundaeSwap V4 design-system drift guards. These flag the exact patterns the
 * token/a11y audit found so the drift can't silently regenerate. They are NOT
 * part of the base `rules` — unrelated consumers of this config are unaffected.
 * Design-system apps/libs (dex-v2, ui-toolkit) opt in via the `designSystemConfig`
 * export in `index.ts`. Severity is "warn" so they never block CI.
 */
/**
 * Ramp families registered as Tailwind color utilities by tailwind-config's
 * `tailwind.theme.css` (every `--color-<family>-<stop>` declaration). Guard (a)
 * below builds its regex from this list, so it stays in lockstep with what the
 * theme actually exposes — the previous hand-written alternation had already
 * drifted, silently missing `magenta` and `purple`. When a ramp is added to the
 * theme, add its family name here (the one edit that extends the guard).
 */
const RAMP_FAMILIES = [
  // True-color ramp names.
  "ink",
  "slate",
  "pink",
  "purple",
  "magenta",
  "violet",
  "indigo",
  "cyan",
  "gold",
  "mint",
  "coral",
  "blue",
  // Legacy role-name aliases for those same ramps (@deprecated, still emitted
  // for back-compat — see the @deprecated note in tailwind.theme.css).
  "primary",
  "secondary",
  "success",
  "error",
  "warning",
  "highlight",
  "silent",
  "neutral",
];

export const designSystemRestrictedSyntax = [
  // (a) Raw color-ramp utilities bypass mode-switching — they resolve via
  // aliases but never react to .light/.dark. Reference semantic role tokens
  // (action-*, surface-*, text-*, border-*, accent-*, chart-*) instead.
  {
    selector: `JSXAttribute[name.name='className'] Literal[value=/(?<![\\w-])(?:bg|text|border|from|to|via|ring|fill|stroke)-(?:${RAMP_FAMILIES.join("|")})-\\d/]`,
    message:
      "Raw color-ramp utility in className: bypasses light/dark mode-switching. Use a semantic token (e.g. bg-surface-card, text-body, border-default, action-primary) instead of a raw ramp like bg-pink-500.",
  },
  // (b) Hardcoded white/black ignore the theme entirely.
  {
    selector:
      "JSXAttribute[name.name='className'] Literal[value=/(?<![\\w-])(?:text-white|bg-white|bg-black|text-black)(?![\\w-])/]",
    message:
      "Hardcoded text-white/bg-white/bg-black/text-black ignore theme switching. Use semantic tokens (e.g. text-on-accent, text-heading, surface-page).",
  },
  // (c) Bold weight utilities — V4 hierarchy comes from size/variant/layout,
  // never from heavy font weights.
  {
    selector:
      "JSXAttribute[name.name='className'] Literal[value=/(?<![\\w-])font-(?:bold|semibold|extrabold|black)(?![\\w-])/]",
    message:
      "Bold weight utility (font-bold/semibold/extrabold/black). V4 typography derives hierarchy from size/variant/layout, not weight. Remove it.",
  },
  // (d) The Text/Heading `weight="bold|semibold|extrabold|black"` prop — same
  // rule as (c) but at the component-prop layer.
  {
    selector:
      "JSXAttribute[name.name='weight'] > Literal[value=/^(?:bold|semibold|extrabold|black)$/]",
    message:
      'weight="bold|semibold|extrabold|black" on Text/Heading. V4 typography derives hierarchy from size/variant/layout, not weight. Drop the weight prop.',
  },
];

export const rules: ESLint.ConfigData["rules"] = {
  "array-callback-return": "warn",
  "default-case": ["warn", { commentPattern: "^no default$" }],
  "dot-location": ["warn", "property"],
  eqeqeq: ["warn", "smart"],
  "new-parens": "warn",
  "no-array-constructor": "warn",
  "no-caller": "warn",
  "no-cond-assign": ["warn", "except-parens"],
  "no-console": "warn",
  "no-const-assign": "warn",
  "no-control-regex": "warn",
  "no-delete-var": "warn",
  "no-dupe-args": "warn",
  "no-dupe-class-members": "warn",
  "no-dupe-keys": "warn",
  "no-duplicate-case": "warn",
  "no-empty-character-class": "warn",
  "no-empty-pattern": "warn",
  "no-eval": "warn",
  "no-ex-assign": "warn",
  "no-extend-native": "warn",
  "no-extra-bind": "warn",
  "no-extra-label": "warn",
  "no-fallthrough": "warn",
  "no-func-assign": "warn",
  "no-implied-eval": "warn",
  "no-invalid-regexp": "warn",
  "no-iterator": "warn",
  "no-label-var": "warn",
  "no-labels": ["warn", { allowLoop: true, allowSwitch: false }],
  "no-lone-blocks": "warn",
  "no-loop-func": "warn",
  "no-mixed-operators": [
    "warn",
    {
      groups: [
        ["&", "|", "^", "~", "<<", ">>", ">>>"],
        ["==", "!=", "===", "!==", ">", ">=", "<", "<="],
        ["&&", "||"],
        ["in", "instanceof"],
      ],
      allowSamePrecedence: false,
    },
  ],
  "no-multi-str": "warn",
  "no-native-reassign": "warn",
  "no-negated-in-lhs": "warn",
  "no-new-func": "warn",
  "no-new-object": "warn",
  "no-new-symbol": "warn",
  "no-new-wrappers": "warn",
  "no-obj-calls": "warn",
  "no-octal": "warn",
  "no-octal-escape": "warn",
  "no-redeclare": ["warn", { builtinGlobals: false }],
  "no-regex-spaces": "warn",
  "no-restricted-syntax": [
    "warn",
    "WithStatement",
    {
      message: "substr() is deprecated, use slice() or substring() instead",
      selector: "MemberExpression > Identifier[name='substr']",
    },
  ],
  "no-script-url": "warn",
  "no-self-assign": "warn",
  "no-self-compare": "warn",
  "no-sequences": "warn",
  "no-shadow-restricted-names": "warn",
  "no-sparse-arrays": "warn",
  "no-template-curly-in-string": "error",
  "no-this-before-super": "warn",
  "no-throw-literal": "warn",
  "no-undef": "error",
  "no-unexpected-multiline": "warn",
  "no-unreachable": "warn",
  "no-unused-expressions": [
    "error",
    {
      allowTernary: true,
      allowTaggedTemplates: true,
    },
  ],
  "no-unused-labels": "warn",
  "no-unused-vars": "off",
  "no-use-before-define": [
    "warn",
    {
      functions: false,
      classes: false,
      variables: false,
    },
  ],
  "no-useless-computed-key": "warn",
  "no-useless-concat": "warn",
  "no-useless-constructor": "warn",
  "no-useless-escape": "warn",
  "no-useless-rename": [
    "warn",
    {
      ignoreDestructuring: false,
      ignoreImport: false,
      ignoreExport: false,
    },
  ],
  "no-with": "warn",
  "no-whitespace-before-property": "warn",
  "require-yield": "warn",
  "rest-spread-spacing": ["warn", "never"],
  strict: ["warn", "never"],
  "unicode-bom": ["warn", "never"],
  "use-isnan": "warn",
  "valid-typeof": "warn",
  "getter-return": "warn",
  "prettier/prettier": "error",
  "@typescript-eslint/no-explicit-any": "error",
  "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
  "@typescript-eslint/naming-convention": [
    "error",
    {
      selector: "interface",
      format: ["PascalCase"],
      custom: { regex: "^I[A-Z]", match: true },
    },
    {
      selector: "typeAlias",
      format: ["PascalCase"],
      custom: { regex: "^T[A-Z]", match: true },
    },
  ],
  "prefer-arrow-callback": "error",
  "no-var": "error",
  "prefer-template": "error",
  "one-var-declaration-per-line": ["error", "always"],
  ...(hasReact && {
    "react/self-closing-comp": "error",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
  }),
};
