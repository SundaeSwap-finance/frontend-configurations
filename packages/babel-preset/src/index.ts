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
          // The ES5 output would rewrite `a ** b` as `Math.pow(a, b)`, which
          // throws on BigInt operands. Excluding the transform keeps `**`
          // native whatever the targets are.
          [
            "@babel/env",
            {
              modules: "commonjs",
              exclude: ["@babel/plugin-transform-exponentiation-operator"],
            },
          ],
          "@babel/preset-typescript",
        ],
      },
    },
  };

  return config;
};

export default config;
