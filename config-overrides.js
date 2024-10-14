const path = require("path");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

module.exports = function override(config, env) {
  config.devtool = false;
  // Change the output filename to 'main.js'
  config.output.filename = "static/js/mainmerged.js";

  // Disable splitting chunks
  config.optimization.splitChunks = {
    cacheGroups: {
      default: false,
    },
  };

  // Disable the runtime chunk
  config.optimization.runtimeChunk = false;

  // config.plugins.push(new BundleAnalyzerPlugin());

  config.optimization.concatenateModules = true;

  return config;
};
