import rules from './rules';

export = {
  parser: "@typescript-eslint/parser",
  plugins: ["jest", "import", "@typescript-eslint", "prettier"],
  extends: ["next", "prettier"],
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
  },
  rules
};
