let path = require('path')
module.exports = {
    mode: "development",
    // 多入口 单入口是字符串 ‘./src/index.js’
    entry: {
        home: './src/index.js', 
        other: './src/other.js' 
    },
    output: {
        filename: 'bundle.js', // 打包后的文件名
        // filename: '[name].js', // 更改output的filename 配置，改成[name].js,打包后，就会有对应的js
        path: path.resolve(__dirname, 'dist')
    },
   
}
// devtool值的类型
// source-map：源码映射，会单独生成一个sourcemap的文件，定位能定为到行和列，代码跟源码一样。
// eval-source-map：不会单独生成sourcemap 文件，会跟打包后的文件一起；
//cheap-module-source-map：原始源代码仅限行，会生成独立的map文件
//cheap-module-eval-source-map：不会生成单独的文件，定位只能定位行。

// watch
//module.exports = {
//     watch: true, // 监控变化
//     watchOptions: {
//         poll: 1000, // 每秒监控几次
//         aggregateTimeout: 500, // 防抖，变动500毫秒后没在输入，就打包
//         ignored:/node_modules/ // 不监控的文件
//     },
// }

//cleanWebpackPlugin
// 在output.path路径下的文件都会被删除，4.0+的默认，不用写路径详细
// copyWebpackPlugin
// 复制文件/文件夹下的文件到指定到文件夹
// bannerPlugin
// webpack 内部插件无需重新安装,主要是把一句注释打包后放到所有的打包的文件中
// const { CleanWebpackPlugin }  = require('clean-webpack-plugin')
// let copyWebpackPlugin = require('copy-webpack-plugin')
// let webpack = require('webpack')

// module.exports = {
//     plugins:[
//     ...
//         new CleanWebpackPlugin(), // 默认清除output.path下的路径
//         new copyWebpackPlugin({
//             patterns: [
//                 {from: 'doc', to: './'}
//             ]
//         }),
//         new webpack.BannerPlugin('2020') // 会在所有的打包的文件前面加上2020的注释
//     ]


//跨域
// 重写的方式，把请求代理到express的服务器上，如localhost:8080 请求localhost:3000的接口module.exports = {
//     devserver: {
//         proxy: {
//             '/api': {
//                 target: 'http://localhost:3000',
//                 pathRewrite: {'/api': ''} // 统一控制api开头的请求
//             }
//         }
//     }
// }
//单纯的模拟数据,直接在webpack 的配置里模拟接口
// devServer: {
//     before(app) {
//         app.get('/api/user',() = >(req, res){
//             res.json({name: 'hui lin-before'})
//         })
//     }
// }
// 直接在服务端在服务端启动webpack,则不会存在跨域的问题
// let express = require('express')

// let app = new express()
// let webpack = require('webpack')
// let webpackDevMiddleWare = require('webpack-dev-middleware')
// let config = require('./webpack.config.js')

// let compiler = webpack(config)

// app.use(webpackDevMiddleWare(compiler))

// app.get('/api/user', (req, res)=>{
//     res.json({name: 'hui lin4545'})
// })

// app.listen(3000)

// resolve
// 解析第三方包 common
// module.exports = {
//     resolve: {
//         modules: [path.resolve('node_modulse')],
//         alias: { // 添加别名
//             boostrap: 'bootstrap/dist/css/bootstrap.css'
//         },
//         mainFields: ['style, main'], //先找包下的package.json style，找不到再去找package.json main
//         mainFiles: [], // 指定入口文件，默认是index.js
//         extensions: ['.js', '.css', '.json'] // 当你不写后缀的话，找不到js,就去找css 
//     }
// }

// 定义环境变量
// new webpack.DefinePlugin({
//     DEV: '"production"'
//     DEV2: JSON.stringify('production'), // 字符串
//     FLAG: 'true', // boolean 类型
//     EXT: '1+1' // 表达式
// })
