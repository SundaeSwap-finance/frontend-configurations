import type { Options } from "@swc/core";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

export const getScssRules = (sourcemap: boolean = true) => [
  MiniCssExtractPlugin.loader,
  {
    loader: "css-loader",
    options: {
      importLoaders: 2,
      sourceMap: sourcemap,
      modules: {
        auto: true,
      },
    },
  },
  "postcss-loader",
  "sass-loader",
];

export const getTypescriptRules = (production: boolean, withHMR?: boolean) => {
  const swcOptions: Options = {
    jsc: {
      target: "es2020",
      transform: {
        react: {
          runtime: "automatic",
        },
      },
      parser: {
        syntax: "typescript",
        tsx: true,
        dynamicImport: true,
      },
    },
    sourceMaps: process.env.NODE_ENV === "development",
  };

  if (withHMR) {
    swcOptions.jsc.transform.react.development = !production;
    swcOptions.jsc.transform.react.refresh = !production;
  }

  return {
    test: /\.(m?js|ts)x?$/,
    exclude: /node_modules/,
    use: {
      loader: "swc-loader",
      options: swcOptions,
    },
  };
};
