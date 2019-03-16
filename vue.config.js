module.exports = {
    publicPath: "/",
    productionSourceMap: true,
    devServer: {
        host:"192.168.123.22",
        port:8080
        // 不再使用代理,在chrome中安装跨域插件
        // proxy: {
        //     "/blog": {
        //         target: "http://wcf.open.cnblogs.com",
        //         changeOrigin: true,
        //         secure: false
        //     },
        //     "/news": {
        //         target: "http://wcf.open.cnblogs.com/",
        //         changeOrigin: true,
        //         secure: false
        //     },
        //     "/mvc": {
        //         target: "https://www.cnblogs.com/mvc",
        //         changeOrigin: true,
        //         secure: false
        //     },
        //     "/Comment/InsertComment": {
        //         target: " https://news.cnblogs.com",
        //         changeOrigin: true,
        //         secure: false
        //     },
        //     "/News/VoteNews": {
        //         target: " https://news.cnblogs.com",
        //         changeOrigin: true,
        //         secure: false
        //     }
        // }
    },
    lintOnSave: false
};
