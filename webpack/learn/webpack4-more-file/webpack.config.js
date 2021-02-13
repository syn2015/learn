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
