const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  productionSourceMap:false,
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    // proxy: 'http://localhost:12345',
    proxy: "http://www.amdyes.asia",
    client: {
      overlay: false,
    },
  }
})
