import type { ConfigFunction, TransformOptions } from "@babel/core";

const config: ConfigFunction = (api) => {
  api.cache.forever();

  const config: TransformOptions = {
    plugins: ["@babel/plugin-proposal-class-properties"],
    env: {
      esmUnbundled: {
        presets: ["@babel/preset-typescript"],
      },
      esmBundled: {
        presets: [
          ["@babel/env", { targets: "> 0.25%, not dead" }],
          "@babel/preset-typescript",
        ],
      },
      cjs: {
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
