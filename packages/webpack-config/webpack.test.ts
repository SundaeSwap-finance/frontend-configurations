const { getBaseConfig } = require("./src");

module.exports = getBaseConfig({
  useCSSModules: true,
  stringReplace: {
    API_URL: "http://localhost:3000/graphql",
  },
});
