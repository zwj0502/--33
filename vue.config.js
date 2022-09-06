const { defineConfig } = require('@vue/cli-service')
const { resolve } = require('path')
const cpns = resolve(__dirname, 'src/comconment')
const view = resolve(__dirname, 'src/view')
module.exports = defineConfig({
  lintOnSave: false,
  transpileDependencies: true,
  configureWebpack: {
    devServer: {
      open: true,
      port: 8888,
      host: 'localhost'
    },
    resolve: {
      alias: {
        cpns,
        view
      }
    }
  }
})
