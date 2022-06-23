import normalize from "postcss-normalize";

export type TPostCSSConfigFactoryProps = {
  useScss?: boolean;
};

export const getConfig = ({
  useScss = true,
}: TPostCSSConfigFactoryProps = {}) => {
  return {
    ident: "postcss",
    syntax: useScss ? "postcss-scss" : "postcss-safe-parser",
    plugins: ["postcss-preset-env", normalize(), require("tailwindcss")],
  };
};
