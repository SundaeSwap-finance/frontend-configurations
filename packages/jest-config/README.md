# `jest-config`

These are base shared `jest.config.js` configs to use in your downstream project.

## Installation

To install, run the following in your project root:

```
yarn add @sundae/jest-config -D
```

Within your `jest.config.js` file, extend this config via:

```ts
const jestConfig = require("@sundae/jest-config");

module.exports = {
  ...jestConfig,
};
```
