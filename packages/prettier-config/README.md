# `prettier-config`

These are base shared `prettier.config.js` configs to use in your downstream project.

## Installation

To install, run the following in your project root:

```
yarn add prettier @sundaeswap/prettier-config -D
```

Within your `prettier.config.js` file, extend this config via:

```ts
const prettierConfig = require("@sundaeswap/prettier-config");

module.exports = {
  ...prettierConfig,
};
```
