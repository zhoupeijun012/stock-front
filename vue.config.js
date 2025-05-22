const { defineConfig } = require("@vue/cli-service");
const { GenerateSW } = require("workbox-webpack-plugin");
const path = require("path");
module.exports = defineConfig({
  productionSourceMap: false,
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    // proxy: 'http://localhost:12345',
    proxy: "https://www.chives.asia",
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
    plugins: [
      // 使用 GenerateSW 插件自动生成 Service Worker 和预缓存清单
      new GenerateSW({
        clientsClaim: true,
        skipWaiting: true,
        include: [
          /\.js$/, 
          /\.css$/, 
          /\.html$/, 
          /\.png$/, 
          /\.jpg$/, 
          /\.svg$/,
        ],
        exclude: [/\.map$/, /manifest\.json$/],
        runtimeCaching: [
          {
            // 对带8位hash的静态资源使用 CacheFirst 策略
            urlPattern: /.*\.[a-f0-9]{8}\.(js|css|png|jpg|jpeg|svg|gif|woff|woff2|ttf|eot)/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'static-resources',
              expiration: {
                maxAgeSeconds: 30 * 24 * 60 * 60,
              },
            },
          },
          {
            // 对HTML页面使用 StaleWhileRevalidate 策略
            urlPattern: ({ request }) => request.destination === 'document',
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'html-pages',
            },
          },
          {
            // 对其他资源使用 NetworkFirst 策略
            urlPattern: ({ request }) => request.destination !== 'document',
            handler: 'NetworkFirst',
            options: {
              cacheName: 'network-first-cache',
            },
          },
        ],
      })
    ],
  },
  chainWebpack: (config) => {
    config.output.filename("[name].[contenthash:8].js").end();
    config.output.chunkFilename("[name].[contenthash:8].js").end();
  },
});
