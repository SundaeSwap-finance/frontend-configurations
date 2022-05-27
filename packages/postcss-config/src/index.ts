const path = require("path");
const glob = require("glob");
const purgecss = require("@fullhuman/postcss-purgecss");
const normalize = require("postcss-normalize");

export type TPostCSSConfigFactoryProps = {
  useScss?: boolean;
  purgeCssContent?: string[];
};

export const getConfig = ({
  useScss = true,
  purgeCssContent = [],
}: TPostCSSConfigFactoryProps = {}) => ({
  ident: "postcss",
  syntax: useScss ? "postcss-scss" : "postcss-safe-parser",
  plugins: [
    "postcss-preset-env",
    normalize(),
    require("tailwindcss"),
    process.env.NODE_ENV === "production"
      ? purgecss({
          defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
          content: [
            ...purgeCssContent,
            path.join(process.cwd(), "./dist/index.html"), //to match index.html
            ...glob.sync(
              `${path.join(process.cwd(), "src")}/**/*.tsx`, //to match React JSX files in src/components/*.jsx
              { nodir: true }
            ),
          ],
        })
      : null,
  ],
});
