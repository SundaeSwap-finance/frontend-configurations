import fs from "fs";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import CopyPlugin from "copy-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import ESLintWebpackPlugin from "eslint-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

const hasHTMLTemplate = fs.existsSync("/src/index.html");
const hasStaticFolder = fs.existsSync("/src/static");

type TPluginOptions = CleanWebpackPlugin | HtmlWebpackPlugin | ForkTsCheckerWebpackPlugin | ESLintWebpackPlugin | MiniCssExtractPlugin | CopyPlugin;

// Explicitely setting any since class constructors are not generic.
export const plugins: TPluginOptions[] = [
  new CleanWebpackPlugin(),
  new HtmlWebpackPlugin({
    template: "./src/index.html",
  }),
  new ForkTsCheckerWebpackPlugin(),
  new ESLintWebpackPlugin({
    extensions: [".tsx", ".ts"],
    exclude: "node_modules",
  }),
  new MiniCssExtractPlugin({
    filename: "[name].[contenthash].css",
  }),
];

if (hasHTMLTemplate) {
  plugins.push(
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    })
  );
}

if (hasStaticFolder) {
  plugins.push(
    new CopyPlugin({
      patterns: [{ from: "src/static", to: "static" }],
    })
  );
}
