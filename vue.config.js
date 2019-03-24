module.exports = {
    publicPath: "/",
    productionSourceMap: true,
    devServer: {
        host: "192.168.123.22",
        port: 8080,
        // 不再使用代理,在chrome中安装跨域插件
        proxy: {
            "/credentials": {
                target: "https://api.cnblogs.com",
                changeOrigin: true,
                secure: true,
                pathRewrite: {
                    "^/credentials": "" //这里理解成用‘/api’代替target里面的地址，后面组件中我们掉接口时直接用api代替 比如我要调用'http://40.00.100.100:3002/user/add'，直接写‘/api/user/add’即可
                }
            },
            "/api": {
                target: "https://api.cnblogs.com/api",
                changeOrigin: true,
                secure: true,
                pathRewrite: {
                    "^/api": "" //这里理解成用‘/api’代替target里面的地址，后面组件中我们掉接口时直接用api代替 比如我要调用'http://40.00.100.100:3002/user/add'，直接写‘/api/user/add’即可
                }
            },
            "/oauth": {
                target: "https://oauth.cnblogs.com",
                changeOrigin: true,
                secure: false
            }
        }
    },
    lintOnSave: false
};
