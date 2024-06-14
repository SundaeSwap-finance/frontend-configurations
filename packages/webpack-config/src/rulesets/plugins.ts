import {
  CleanWebpackPlugin,
  Options as CleanWebpackPluginOptions,
} from "clean-webpack-plugin";
import CopyPlugin from "copy-webpack-plugin";
import ESLintWebpackPlugin, {
  Options as ESLintWebpackPluginOptions,
} from "eslint-webpack-plugin";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";

type TPlugins =
  | CleanWebpackPlugin
  | HtmlWebpackPlugin
  | ForkTsCheckerWebpackPlugin
  | ESLintWebpackPlugin
  | MiniCssExtractPlugin
  | CopyPlugin
  | ReactRefreshWebpackPlugin;

export type TPluginOptions = {
  staticFolderName?: "string";
  clean?: CleanWebpackPluginOptions;
  copy?: CopyPlugin.PluginOptions;
  html?: HtmlWebpackPlugin.Options;
  css?: MiniCssExtractPlugin.PluginOptions;
  eslint?: ESLintWebpackPluginOptions;
  hmr?: ReactRefreshWebpackPlugin["options"];
};

export const getPlugins = (
  production: boolean,
  {
    staticFolderName,
    clean,
    copy,
    html,
    css,
    eslint,
    hmr,
  }: TPluginOptions = {},
  withHMR?: boolean,
): TPlugins[] => {
  const plugins: TPlugins[] = [
    new CleanWebpackPlugin(clean),
    new HtmlWebpackPlugin(
      html ?? {
        template: "./src/index.html",
      },
    ),
    new ForkTsCheckerWebpackPlugin(),
    new ESLintWebpackPlugin(
      eslint ?? {
        extensions: [".tsx", ".ts"],
        exclude: "node_modules",
      },
    ),
    new MiniCssExtractPlugin(
      css ?? {
        filename: "[name].[contenthash].css",
      },
    ),
  ];

  let copyPatterns: CopyPlugin.Pattern[] = [];
  if (typeof staticFolderName === "string") {
    copyPatterns.push({ from: staticFolderName, to: "static" });
  }
  if (copy?.patterns?.length > 0) {
    copyPatterns = copyPatterns.concat(copy.patterns);
  }

  if (copyPatterns.length) {
    plugins.push(
      new CopyPlugin({
        ...copy,
        patterns: copyPatterns,
      }),
    );
  }

  if (withHMR && !production) {
    plugins.push(new ReactRefreshWebpackPlugin(hmr));
  }

  return plugins;
};
