import cssnano from "cssnano";
import { Config, ConfigPlugin } from "postcss-load-config";
import normalize from "postcss-normalize";
import tailwind from "@tailwindcss/postcss";

export const plugins: ConfigPlugin[] = [normalize(), tailwind()];

if (process.env.NODE_ENV === "production") {
  plugins.push(cssnano());
}

export const config: Config = {
  plugins,
};

export default config;
