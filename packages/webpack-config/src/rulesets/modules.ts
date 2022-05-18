import MiniCssExtractPlugin from "mini-css-extract-plugin";

export const getScssRules = (sourcemap: boolean = true) => {
  return [
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
};
