# `webpack-config`

This is a utility libary for quickly creating `webpack.config.js` files in downstream projects.

## Installation

To install, run:

```
bun run add @sundaeswap/webpack-config webpack webpack-cli -D
```

And then from your root project's `webpack.config.js` file, utilize standard base rulesets:

```js
const { merge } = require("webpack-merge");
const { getBaseConfig } = require("@sundaeswap/webpack-config");

module.exports = merge(
  getBaseConfig({
    verbose: true,
    useCSSModules: true,
    stringReplace: {
      API_URL: "http://localhost:3000/graphql",
    },
  }),
  {
    // Overrides
  }
);
```
