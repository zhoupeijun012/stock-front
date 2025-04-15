const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  productionSourceMap: false,
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    // proxy: 'http://localhost:12345',
    proxy: "https://www.amdyes.asia",
    client: {
      overlay: false,
    },
  },
  configureWebpack: {
    optimization: {
      splitChunks: {
        cacheGroups: {
          elementUI: {
            name: "chunk-element-ui",
            test: /[\\/]node_modules[\\/]element-ui[\\/]/,
            priority: 20,
            chunks: "all",
          },
          vendors: {
            name: "chunk-vendors",
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
            chunks: "initial",
          },
        },
      },
    },
  },
});
