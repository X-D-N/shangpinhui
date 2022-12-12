const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    // 关闭校验功能
    lintOnSave: false,
    // 配置代理 解决跨域问题 服务器与服务器之间没有跨域问题 浏览器与服务器之间有跨域问题
    devServer: {
        proxy: {
            '/api': {
                target: 'http://gmall-h5-api.atguigu.cn'
            }
        }
    }
})