const { plugins, theme } = require("./dist");

module.exports = {
  theme: {
    ...theme,
    extend: {
      // Overrides
    },
  },
  plugins: [...plugins],
};
