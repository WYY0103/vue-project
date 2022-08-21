const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  devServer: {
    open: true,
    host: 'localhost',
    port: 8080,
    // 代理跨域  代理服务器他会向真正的服务器请求数据  看到api就会工作
    // target中存放真正的服务器
    proxy: {
      '/api': {
        target: "http://gmall-h5-api.atguigu.cn",
      },
    }
  },
  lintOnSave: false
})

