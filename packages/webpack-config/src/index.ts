// import path from "path";
// import MiniCssExtractPlugin from "mini-css-extract-plugin";
// import CssMinimizerPlugin from "css-minimizer-webpack-plugin";
// import getCSSModuleLocalIdent from "react-dev-utils/getCSSModuleLocalIdent";

export { getPlugins } from "./rulesets/plugins";
export * from "./rulesets/modules";

// const config = ({ production }: ConfigProps) => {
//   const config: Record<string, unknown> = {
//     entry: "./src/index.tsx",
//     mode: production ? "production" : "development",
//     devtool: "source-map",
//     optimization: {
//       usedExports: true,
//       minimizer: [`...`, new CssMinimizerPlugin()],
//     },
//     output: {
//       filename: "[name].[contenthash].js",
//       path: path.resolve(__dirname, "dist"),
//     },
//     module: {
//       rules: [
//         {
//           test: /global\.scss$/i,
//           use: [
//             MiniCssExtractPlugin.loader,
//             {
//               loader: "css-loader",
//               options: {
//                 importLoaders: 2,
//                 sourceMap: production,
//               },
//             },
//             "postcss-loader",
//             "sass-loader",
//           ],
//         },
//         {
//           test: /\.module\.(scss|sass)$/,
//           use: [
//             MiniCssExtractPlugin.loader,
//             {
//               loader: "css-loader",
//               options: {
//                 importLoaders: 2,
//                 sourceMap: production,
//                 modules: {
//                   mode: "local",
//                   namedExport: true,
//                   getLocalIdent: getCSSModuleLocalIdent,
//                 },
//               },
//             },
//             "postcss-loader",
//             "sass-loader",
//           ],
//         },
//         {
//           test: /\.tsx?$/,
//           loader: "ts-loader",
//         },
//         {
//           test: /\.tsx|.ts?$/,
//           exclude: /node_modules/,
//           loader: "string-replace-loader",
//           options: {
//             search: "API_URL",
//             replace: production ? "/graphql" : "http://localhost:3000/graphql",
//           },
//         },
//         {
//           test: /\.(png|svg|jpg|jpeg|gif)$/i,
//           type: "asset/resource",
//         },
//       ],
//     },
//     stats: {
//       errorDetails: true,
//     },
//     resolve: {
//       extensions: [".tsx", ".ts", ".js", ".scss"],
//     },
//     plugins,
//   };

//   if (!production) {
//     config.devServer = {
//       static: path.resolve(__dirname, "dist"),
//       devMiddleware: {
//         publicPath: path.resolve(__dirname, "dist"),
//         writeToDisk: true,
//       },
//     };
//   }

//   return config;
// };

// export default config;
