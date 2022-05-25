import { rules } from "./rules";
import { hasNext, hasJest, hasReact } from "./utils";

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

module.exports = {
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
