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
            filename: "css/styles.[hash].css",
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