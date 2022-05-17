import { rules } from "./rules";

const hasNext = !!process.env['npm_package_dependencies_next'];
const hasReact = !!process.env['npm_package_dependencies_react'];
const hasJest = !!process.env['npm_package_dependencies_jest'];

const pluginList = ["import", "@typescript-eslint", "prettier"];
const extendList = ["prettier"];

if (hasJest) {
  pluginList.push("jest");
}

if (hasNext) {
  extendList.push("next");
} else if (hasReact) {
  extendList.push("react");
}

export = {
  parser: "@typescript-eslint/parser",
  plugins: pluginList,
  extends: extendList,
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
  },
  rules,
};
