# `tailwind-config`

This is a base shared `tailwind-config.js` which all other `tailwind-config.js`'s can require as a plugin.

## Installation

To install, run:

```
bun run add tailwindcss tailwindcss-animation-delay tailwindcss-radix @sundaeswap/tailwind-config -D
```

And then from your root project's `tailwind.config.js` file, extend the base theme like this:

```js
const { plugins, theme } = require("@sundaeswap/tailwind-config");

module.exports = {
  content: [
    "./src/components/**/*.tsx",

    // Make sure to include @sundaeswap/ui-toolkit if using.
    "./node_modules/@sundaeswap/ui-toolkit/**/*",
  ],
  theme: {
    ...theme,

    // Theme overrides
  },
  // add additional plugins after the spread
  plugins: [...plugins],
};
```
