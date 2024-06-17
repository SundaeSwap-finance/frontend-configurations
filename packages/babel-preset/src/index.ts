import type { ConfigFunction, TransformOptions } from "@babel/core";

const config: ConfigFunction = (api) => {
  api.cache.forever();

  const config: TransformOptions = {
    plugins: ["@babel/plugin-proposal-class-properties"],
    env: {
      esmUnbundled: {
        plugins: ["@babel/plugin-transform-react-jsx"],
        presets: ["@babel/preset-typescript"],
      },
      esmBundled: {
        plugins: ["@babel/plugin-transform-react-jsx"],
        presets: [
          ["@babel/env", { targets: "> 0.25%, not dead" }],
          "@babel/preset-typescript",
        ],
      },
      cjs: {
        plugins: ["@babel/plugin-transform-react-jsx"],
        presets: [
          ["@babel/env", { modules: "commonjs" }],
          "@babel/preset-typescript",
        ],
      },
    },
  };

  return config;
};

export default config;
