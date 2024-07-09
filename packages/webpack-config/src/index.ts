import CssMinimizerPlugin from "css-minimizer-webpack-plugin";
import path from "path";
import webpack from "webpack";
import webpackDevServer from "webpack-dev-server";

import { getScssRules, getTypescriptRules } from "./rulesets/loaders.js";
import { getPlugins, TPluginOptions } from "./rulesets/plugins.js";

// Export rulesets.
export * from "./rulesets/loaders.js";
export { getPlugins } from "./rulesets/plugins.js";

interface IBaseConfigArgs {
  stringReplaceRules?: Record<string, unknown> | undefined;
  verbose?: boolean;
  plugins?: TPluginOptions;
  syncWasm?: boolean;
  withHMR?: boolean;
}

// Export base config.
export const getBaseConfig = ({
  stringReplaceRules = undefined,
  verbose = false,
  plugins,
  syncWasm,
  withHMR = false,
}: IBaseConfigArgs): webpack.Configuration => {
  const production = process.env.NODE_ENV === "production";
  const config: webpack.Configuration = {
    entry: "./src/index.tsx",
    mode: production ? "production" : "development",
    devtool: "source-map",
    optimization: {
      minimizer: [`...`, new CssMinimizerPlugin()],
    },
    output: {
      filename: "[name].[contenthash].js",
      path: path.resolve(process.cwd(), "dist"),
    },
    module: {
      rules: [
        getTypescriptRules(production, withHMR),
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: "asset/resource",
        },
        {
          test: /\.s[ac]ss$/i,
          use: getScssRules(true),
        },
        stringReplaceRules
          ? {
              test: /\.tsx|.ts?$/,
              exclude: /node_modules/,
              loader: "string-replace-loader",
              options: {
                ...stringReplaceRules,
              },
            }
          : {},
      ],
    },
    stats: {
      errorDetails: true,
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js", ".scss"],
    },
    plugins: getPlugins(production, plugins, withHMR),
    devServer: production
      ? undefined
      : ({
          hot: withHMR,
          static: path.resolve(process.cwd(), "dist"),
          devMiddleware: {
            publicPath: path.resolve(process.cwd(), "dist"),
            writeToDisk: true,
          },
        } as webpackDevServer.Configuration),
  };

  if (syncWasm) {
    config.experiments = {
      layers: true,
      syncWebAssembly: true,
    };
    config.output.webassemblyModuleFilename = "static/wasm/[modulehash].wasm";
  }

  if (verbose) {
    // eslint-disable-next-line no-console
    console.log(`Using webpack config by @sundae:`, config);
  }

  return config;
};
