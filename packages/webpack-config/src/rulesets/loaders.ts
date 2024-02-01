import MiniCssExtractPlugin from "mini-css-extract-plugin";
import type { Options } from "@swc/core";

export const getScssRules = (
  sourcemap: boolean = true,
  allowModules: boolean = true
) => [
  MiniCssExtractPlugin.loader,
  {
    loader: "css-loader",
    options: {
      importLoaders: 2,
      sourceMap: sourcemap,
      modules: allowModules,
    },
  },
  "postcss-loader",
  "sass-loader",
];

export const getTypescriptRules = (production: boolean, withHMR?: boolean) => {
  const swcOptions: Options = {
    jsc: {
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
  };

  if (withHMR) {
    swcOptions.jsc.transform.react.development = !production;
    swcOptions.jsc.transform.react.refresh = !production;
  }

  return {
    test: /\.(m?js|ts)x?$/,
    exclude: /(node_modules)/,
    use: {
      loader: "swc-loader",
      options: swcOptions,
    },
  };
};
