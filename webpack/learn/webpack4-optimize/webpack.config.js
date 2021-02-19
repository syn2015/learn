let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
// 抽离css
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// 压缩css optimize-css-assets-webpack-plugin 会让js默认压缩失效，需要手动插件压缩

let OptimizeCss = require('optimize-css-assets-webpack-plugin')
let UglifyWebpackPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
    //优化项
    optimization: {
        minimizer: [
            new OptimizeCSS(), //压缩css
            new UglufyjsWebapckPlugin({ //压缩js
                cache: true,
                sourceMap: true,
                parallel: true //并发
            })
        ]
    },
    devServer: {
        port: 3000, //
        progress: true,
        contentBase: './build', //
        compress: true //
    },
    mode: '', //production，development
    entry: '', //入口
    output: {
        filename: '', //打包的文件名
        path: path.resolve(__dirname, 'dist') //路径为绝对路径
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index/html',
            minify: {
                removeAttributeQuotes: true, //移除html双引号
                collapseWhitespace: true, //折叠空行
            },
            hash: true, //hash戳
        }),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: "css/styles.[hash].css",// filename: 'css/main.css', // css抽离到文件名
            chunkFilename: "[id].css"
        }),
    ],
    module: { //模块
        //loader默认从右到左，从下到上执行
      
        rules: [
            //css-loader,接续@import语法
            // style-loader,css插入head标签
            // 
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            //   { test: /\.css$/, use: [{
            //       loader:'style-loader',
            //       options:{
            //           insertAt:'top' //style标签插入的位置
            //       }
            //   },'css-loader','sass-loader'] },
            //css引入到link标签中
            // { test: /\.css$/, use: [ MiniCssExtractPlugin.loader,'css-loader','sass-loader'] },   
            // 安装postcss和autoprefix 自动添加前缀
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader']
            },
            {
                test: /\.js$/,
                use: {
                    loader: "eslint-loader",
                    options: {
                        enforce: 'pre' // 强制最先开始使用（previous ：默认；post：最后执行）
                    }
                },
                include: path.resolve(__dirname, 'src'),
                exclude: /node_modules/
            },
            
            {
                test: /\.js$/,
                use: [{
                    loader: 'babel-loader', // es6转es5
                    options: {
                        presets: ['@babel/preset-env'], // 用最新的js,打包出最小的js,且可以指定浏览器
                        // plugins: ['@babel/plugin-proposal-class-properties', {"loose":true},
                        //     '@babel/plugin-transform-runtime' // 抽离打包公共方法
                        // ], // 解析class写法
                        plugins: [
                            ['@babel/plugin-proposal-decorators', { 'legacy': true } ], // @log语法
                            ['@babel/plugin-proposal-class-properties', { "loose" : true }], // es7语法
                            ['@babel/plugin-transform-runtime' ],// 抽离打包公共方法'
                            // ['@babel/runtime'],// 生产环境需要
                        ]
                    
                    }
                }],
                include: path.resolve(__dirname, 'src'), // 避免查找所有的js
                exclude: /node-modules/  //跳过exclude
            }
        ]
    }
}
// 全局变量引入问题
// 1.expose-loader 暴露到window上
// {
//     test: require.resolve('juery'),
//     use: [
//         {
//             loader: 'expose-loader', // es6转es5
//             options: {
//                 option: '$'
//             }
//         }
//     ]
//     或者
//     use: 'expose-loader?$'
// }
// 2.providerPlugin 给每个页面提供一个$ 配置
// plugins:[
//     new webpack.ProviderPlugin({
//         $: 'jquery',
//         'jquery': 'jquery'
//     })
// ]
// 3.script标签引入不打包 externals 配置
// externals: {
//     jquery: "$"
// }
//图片处理
// file-loader
// {
//     test: /\.(png|jpe?g|gif)$/i,
//     use: {
//         loader: 'file-loader',
//     }
// },
// html-withimg-loader
// {
//     test:/\.html$/,
//     use: [
//         {
//             loader: 'html-withimg-loader'
//         }
//     ]
// }
// url-loader 打包图片base64 url-loader根据options 的 limit,如果满足就压缩成base64,如果超过limit,则使用file-loader,注释掉file-loader
// {
//     test: /\.(png|jpe?g|gif)$/i,
//     use: {
//         loader: 'url-loader',
//         options: {
//             esModule: false,
//             limit: 1// 200kb,
//             outputPath:'/img/',// 文件分类打包 打包后的路径 dist/img
//         }
//     }
// },

// webpack优化
// noParse:/jquery/,//不去解析的模块
// 
// exclude: /node_modules/,//排除模块
// include:path.resolve('src'),//包含模块
//内置 IgnorePlugin()
// new webpack.IgnorePlugin(/\.\/locale/,/moment/)
// 动态链接库 DllPlugin()
// output:{
//     library:'ab',
//     libraryTarget:'var',//commonjs var this ...
// }

//多线程打包 happypack

//webpack自带优化
//import导入在生产环境下会自动除掉没用的代码(tree-shaking),require()这种es6方式引入,需要在default对象下获取.

//抽离公共代码
// optimization: {
//     splitChunks: { 
//       chunks: "initial",         // 代码块类型 必须三选一： "initial"（初始化） | "all"(默认就是all) | "async"（动态加载） 
//       minSize: 0,                // 最小尺寸，默认0
//       minChunks: 1,              // 最小 chunk ，默认1
//       maxAsyncRequests: 1,       // 最大异步请求数， 默认1
//       maxInitialRequests: 1,     // 最大初始化请求书，默认1
//       name: () => {},            // 名称，此选项课接收 function
//       cacheGroups: {                // 缓存组会继承splitChunks的配置，但是test、priorty和reuseExistingChunk只能用于配置缓存组。
//         priority: "0",              // 缓存组优先级 false | object |
//         vendor: {                   // key 为entry中定义的 入口名称
//           chunks: "initial",        // 必须三选一： "initial"(初始化) | "all" | "async"(默认就是异步)
//           test: /react|lodash/,     // 正则规则验证，如果符合就提取 chunk
//           name: "vendor",           // 要缓存的 分隔出来的 chunk 名称
//           minSize: 0,
//           minChunks: 1,
//           enforce: true,
//           reuseExistingChunk: true   // 可设置是否重用已用chunk 不再创建新的chunk
//         }
//       }
//     }
//   }
//webpack懒加载

//热更新
// new webpack.NameModulesPlugin(),//打印更新的模块路径
// new webpack.HotModuleReplacementPlugin(), //热更新插件