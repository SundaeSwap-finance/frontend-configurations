# `tailwind-config`

This is a base shared `tailwind-config.js` which all other `tailwind-config.js`'s can require as a plugin.

## Installation
To install, run:

```
yarn add tailwindcss @sundae/tailwind-config -D
```

And then from your root project's `tailwind.config.js` file, extend the base theme like this:

```js
const { theme } = require("@sundae/tailwind-config");

module.exports = {
  theme: {
    ...theme,
    
    // Project overrides.
  },
};

```