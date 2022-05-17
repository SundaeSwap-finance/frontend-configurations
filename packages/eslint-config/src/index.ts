import { rules } from "./rules";

const hasNext = !!process.env["npm_package_dependencies_next"];
const hasReact = !!process.env["npm_package_dependencies_react"];
const hasJest = !!process.env["npm_package_devDependencies_jest"];

const pluginList = ["import", "@typescript-eslint", "prettier"];
const extendList = ["prettier"];

if (hasJest) {
  pluginList.push("jest");
}

if (hasNext) {
  extendList.push("next");
} else if (hasReact) {
  pluginList.push("react");
}

export = {
  parser: "@typescript-eslint/parser",
  plugins: pluginList,
  extends: extendList,
  globals: {
    JSX: true,
  },
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
  },
  rules,
};
