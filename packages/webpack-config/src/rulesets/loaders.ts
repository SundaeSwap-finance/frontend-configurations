import MiniCssExtractPlugin from "mini-css-extract-plugin";
import getCSSModuleLocalIdent from "react-dev-utils/getCSSModuleLocalIdent";

export const getScssRules = (
  sourcemap: boolean = true,
  allowModules: boolean = true
) => [
  MiniCssExtractPlugin.loader,
  {
    loader: "css-loader",
    options: allowModules
      ? {
          importLoaders: 2,
          sourceMap: sourcemap,
          modules: {
            mode: "local",
            namedExport: true,
            getLocalIdent: getCSSModuleLocalIdent,
          },
        }
      : {
          importLoaders: 2,
          sourceMap: sourcemap,
        },
  },
  "postcss-loader",
  "sass-loader",
];
