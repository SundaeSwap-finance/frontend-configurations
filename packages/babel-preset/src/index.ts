import type { ConfigFunction, TransformOptions } from "@babel/core";

const config: ConfigFunction = (api) => {
  api.cache.forever();

  const config: TransformOptions = {
    plugins: ["@babel/plugin-proposal-class-properties"],
    env: {
      esmUnbundled: {
        presets: [
          "@babel/preset-typescript",
          "@babel/plugin-transform-react-jsx",
        ],
      },
      esmBundled: {
        presets: [
          ["@babel/env", { targets: "> 0.25%, not dead" }],
          "@babel/preset-typescript",
          "@babel/plugin-transform-react-jsx",
        ],
      },
      cjs: {
        presets: [
          ["@babel/env", { modules: "commonjs" }],
          "@babel/preset-typescript",
          "@babel/plugin-transform-react-jsx",
        ],
      },
    },
  };

  return config;
};

export default config;
