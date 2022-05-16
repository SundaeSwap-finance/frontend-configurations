# `eslint-config`

These are base shared `.eslintrc.json`s from which all other `.eslintrc.json`'s inherit from.

## Installation
To install, run the following in your project root:

```
yarn add @sundae/eslint-config-sundae -D
```

Within your `.eslintrc.js` file, extend this config via:

```
module.exports = {
  extends: "@sundae/eslint-config/dist"
};
```

