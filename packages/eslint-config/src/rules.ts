import { ESLint } from "eslint";
import { hasReact } from "./utils.js";

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
