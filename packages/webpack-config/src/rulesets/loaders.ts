import MiniCssExtractPlugin from "mini-css-extract-plugin";

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
          modules: true,
        }
      : {
          importLoaders: 2,
          sourceMap: sourcemap,
        },
  },
  "postcss-loader",
  "sass-loader",
];
