# frontend-configurations

This is a collection of generic and reusable _frontend_ configurations across the SundaeSwap cosmos. The idea is to create configuration files as independent packages that can be extended from/installed separately.

## Published packages

- ### `packages/eslint-config`

  - Install with `yarn add -D @sundae/eslint-config`
  - Extend it in every `.eslintrc.js` using:

  ```js
  module.exports = {
    extends: "sundae",
  };
  ```

- ### `packages/tailwind-config`

  - Install with `yarn add -D @sundae/tailwind-config-sundae`
  - Inside your `tailwind-config.js` root file, add:

  ```js
  {
      //...config,
      plugins: [require("tailwind-config-sundae")],
  }
  ```
