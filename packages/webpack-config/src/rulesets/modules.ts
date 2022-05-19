import MiniCssExtractPlugin from "mini-css-extract-plugin";
import getCSSModuleLocalIdent from "react-dev-utils/getCSSModuleLocalIdent";

export const getScssRules = (sourcemap: boolean = true) => [
  MiniCssExtractPlugin.loader,
  {
    loader: "css-loader",
    options: {
      importLoaders: 2,
      sourceMap: sourcemap,
    },
  },
  "postcss-loader",
  "sass-loader",
];

export const getCSSModulesRules = (sourcemap: boolean = true) => [
  MiniCssExtractPlugin.loader,
  "@teamsupercell/typings-for-css-modules-loader",
  {
    loader: "css-loader",
    options: {
      importLoaders: 2,
      sourceMap: sourcemap,
      modules: {
        mode: "local",
        namedExport: true,
        getLocalIdent: getCSSModuleLocalIdent,
      },
    },
  },
  "postcss-loader",
  "sass-loader",
];
