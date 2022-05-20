import MiniCssExtractPlugin from "mini-css-extract-plugin";

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
