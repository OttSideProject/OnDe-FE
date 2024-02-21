const CracoAlias = require("craco-alias");

module.exports = {
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        source: "tsconfig",
        baseUrl: "./src",
        tsConfigPath: "tsconfig.paths.json",
      },
    },
  ],
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      if (env === "production") {
        webpackConfig.resolve.alias = {
          ...webpackConfig.resolve.alias,
        };
      }
      return webpackConfig;
    },
  },
};
