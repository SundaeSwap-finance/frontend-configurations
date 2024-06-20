import autoprefixer from "autoprefixer";
import cssnano from "cssnano";
import { Config, ConfigPlugin } from "postcss-load-config";
import normalize from "postcss-normalize";
import tailwind from "tailwindcss";

export const plugins: ConfigPlugin[] = [
  normalize(),
  tailwind(),
  autoprefixer(),
];

if (process.env.NODE_ENV === "production") {
  plugins.push(cssnano());
}

export const configWithScss: Config = {
  syntax: "postcss-scss",
  plugins,
};

export const config: Config = {
  plugins,
};

export default config;
