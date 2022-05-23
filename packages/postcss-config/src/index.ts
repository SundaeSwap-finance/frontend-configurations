const path = require("path");
const glob = require("glob");
const purgecss = require("@fullhuman/postcss-purgecss");
const normalize = require("postcss-normalize");

export const getConfig = (useScss: boolean = true) => ({
  ident: "postcss",
  syntax: useScss ? "postcss-scss" : "postcss-safe-parser",
  plugins: [
    "postcss-preset-env",
    normalize(),
    process.env.NODE_ENV === "production"
      ? purgecss({
          content: [
            path.join(process.cwd(), "./dist/index.html"), //to match index.html
            ...glob.sync(
              `${path.join(process.cwd(), "src")}/**/*.tsx`, //to match React JSX files in src/components/*.jsx
              {
                nodir: true,
              }
            ),
          ],
        })
      : null,
    require("tailwindcss"),
  ],
});
