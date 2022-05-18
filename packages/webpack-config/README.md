# `webpack-config`

This is a utility libary for quickly creating `webpack.config.js` files in downstream projects.

## Installation
To install, run:

```
yarn add @sundae/webpack-config webpack webpack-cli -D
```

And then from your root project's `webpack.config.js` file, utilize standard base rulesets:

```js
const { getPlugins } = require("@sundae/webpack-config");

module.exports = {
  plugins: [
    ...getPlugins()
  ]
};

```