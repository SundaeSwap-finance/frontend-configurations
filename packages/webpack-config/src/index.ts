import path from "path";
import CssMinimizerPlugin from "css-minimizer-webpack-plugin";

import { getPlugins } from "./rulesets/plugins";
import { getScssRules } from "./rulesets/loaders";

// Export rulesets.
export { getPlugins } from "./rulesets/plugins";
export * from "./rulesets/loaders";

interface IBaseConfigArgs {
  useCSSModules: boolean;
  stringReplaceRules: Record<string, unknown> | undefined;
  verbose: boolean;
}

// Export base config.
export const getBaseConfig = ({
  useCSSModules,
  stringReplaceRules = undefined,
  verbose = false
}: IBaseConfigArgs): Record<string, unknown> => {
  const production = process.env.NODE_ENV === "production";
  const config = {
    entry: "./src/index.tsx",
    mode: production ? "production" : "development",
    devtool: "source-map",
    optimization: {
      usedExports: true,
      minimizer: [`...`, new CssMinimizerPlugin()],
    },
    output: {
      filename: "[name].[contenthash].js",
      path: path.resolve(process.cwd(), "dist"),
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: "ts-loader",
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: "asset/resource",
        },
        {
          test: /\.scss$/i,
          use: [...getScssRules(true, false)],
          exclude: /\.module\.scss$/,
        },
        useCSSModules
          ? {
              test: /\.module\.scss$/,
              exclude: /node_modules/,
              use: [...getScssRules()],
            }
          : {},
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
    plugins: getPlugins(),
    devServer: production
      ? {}
      : {
          static: path.resolve(process.cwd(), "dist"),
          devMiddleware: {
            publicPath: path.resolve(process.cwd(), "dist"),
            writeToDisk: true,
          },
        },
  };

  if (verbose) {
    console.log(`Using webpack config by @sundae:`, config);
  }

  return config;
};
