# `eslint-config`

These are base shared `.eslintrc.json`s from which all other `.eslintrc.json`'s inherit from.

## Installation
To install, run the following in your project root:

```
bun run add @sundaeswap/eslint-config -D
```

Within your `.eslintrc.js` file, extend this config via:

```
module.exports = {
  extends: "@sundaeswap/eslint-config"
};
```

