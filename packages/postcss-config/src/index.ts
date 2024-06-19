import { Config } from "postcss-load-config";

export const configWithScss: Config = {
  syntax: "postcss-scss",
  plugins: {
    "postcss-preset-env": {},
    "postcss-normalize": {},
    tailwindcss: {},
    autoprefixer: {},
    ...(process.env.NODE_ENV === "production" ? { cssnano: {} } : {}),
  },
};

export const config: Config = {
  plugins: {
    "postcss-preset-env": {},
    "postcss-normalize": {},
    tailwindcss: {},
    autoprefixer: {},
    ...(process.env.NODE_ENV === "production" ? { cssnano: {} } : {}),
  },
};
