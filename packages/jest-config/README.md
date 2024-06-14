# `jest-config`

This is a base shared `jest.config.js` config file to use in your downstream project.

## Installation

To install, run the following in your project root:

```
bun run add @sundaeswap/jest-config -D
```

Within your `jest.config.js` file, extend this config via:

```ts
const jestConfig = require("@sundaeswap/jest-config");

module.exports = {
  ...jestConfig,
};
```
