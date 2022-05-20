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

type TPlugins =
  | CleanWebpackPlugin
  | HtmlWebpackPlugin
  | ForkTsCheckerWebpackPlugin
  | ESLintWebpackPlugin
  | MiniCssExtractPlugin
  | CopyPlugin;

export type TPluginOptions = {
  staticFolderName?: "string";
  clean?: CleanWebpackPluginOptions;
  copy?: CopyPlugin.PluginOptions;
  html?: HtmlWebpackPlugin.Options;
  css?: MiniCssExtractPlugin.PluginOptions;
  eslint?: ESLintWebpackPluginOptions;
};

export const getPlugins = (opts?: TPluginOptions): TPlugins[] => {
  // Explicitly setting any since class constructors are not generic.
  const plugins: TPlugins[] = [
    new CleanWebpackPlugin(opts?.clean),
    new HtmlWebpackPlugin(
      opts?.html ?? {
        template: "./src/index.html",
      }
    ),
    new ForkTsCheckerWebpackPlugin(),
    new ESLintWebpackPlugin(
      opts?.eslint ?? {
        extensions: [".tsx", ".ts"],
        exclude: "node_modules",
      }
    ),
    new MiniCssExtractPlugin(
      opts?.css ?? {
        filename: "[name].[contenthash].css",
      }
    ),
  ];

  if (typeof opts.staticFolderName === "string") {
    plugins.push(
      new CopyPlugin({
        patterns: [{ from: opts.staticFolderName, to: "static" }],
      })
    );
  }

  return plugins;
};
