import path from "path";
import glob from "glob";
import purgecss from "@fullhuman/postcss-purgecss";
import normalize from "postcss-normalize";

type TPurgecssOptions = Parameters<typeof purgecss>[0];

export type TPostCSSConfigFactoryProps = {
  useScss?: boolean;
  purgeCssOpts?:
    | TPurgecssOptions
    // eslint-disable-next-line
    | ((opts?: TPurgecssOptions) => TPurgecssOptions);
};

export const getConfig = ({
  useScss = true,
  purgeCssOpts,
}: TPostCSSConfigFactoryProps = {}) => {
  const purgeDefaults: TPurgecssOptions = {
    defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
    content: [
      path.join(process.cwd(), "./dist/index.html"), //to match index.html
      ...glob.sync(
        `${path.join(process.cwd(), "src")}/**/*.tsx`, //to match React JSX files in src/components/*.jsx
        { nodir: true }
      ),
    ],
  };

  return {
    ident: "postcss",
    syntax: useScss ? "postcss-scss" : "postcss-safe-parser",
    plugins: [
      "postcss-preset-env",
      normalize(),
      require("tailwindcss"),
      process.env.NODE_ENV === "production"
        ? purgecss(
            typeof purgeCssOpts === "function"
              ? purgeCssOpts(purgeDefaults)
              : { ...purgeDefaults, ...purgeCssOpts }
          )
        : null,
    ],
  };
};
