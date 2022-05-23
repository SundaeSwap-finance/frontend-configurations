# `postcss-config`

These are base shared `postcss.config.js` configs to use in your downstream project.

## Installation
To install, run the following in your project root:

```
yarn add tailwindcss @sundae/postcss-config -D
```

Within your `postcss.config.js` file, extend this config via:

```ts
const { getConfig } = require("@sundae/postcss-config");

module.exports = {
  ...getConfig()
};
```

