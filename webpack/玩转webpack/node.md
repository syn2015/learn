# chapter1

## webpack 查看命令

```cmd
.\node_modules\.bin/webpack -v
```

# chapter2

entry：

```json
单⼊⼝： entry 是⼀个字符串 多⼊⼝： entry 是⼀个对象
module.exports = {
	entry: './path/to/my/entry/file.js'
};
module.exports = {
    entry: {
    app: './src/app.js',
    adminApp: './src/adminApp.js'
    }
};
```

output:

```json
单入口：
module.exports = {
    entry: './path/to/my/entry/file.js'
    output: {
        filename: 'bundle.js’ ,
        path: __dirname + '/dist'
    }
};
多入口：通过占位符保证文件名称的唯一
module.exports = {
    entry: {
        app: './src/app.js',
        search: './src/search.js'
    },
    output: {
        filename: '[name].js',
        path: __dirname + '/dist'
    }
};
```

loaders: **test指定匹配规则，use指定使用loader名称**

![](loaders.png)

```json
module: {
    rules: [
    	{ test: /\.txt$/, use: 'raw-loader' }
    ]
}
```

plugins数组:

![](plugins.png)

```json
plugins: [
new HtmlWebpackPlugin({template:
'./src/index.html'})
]
```

mode:

![](mode内置函数.png)

解析 ES6  

.babelrc文件

```json
npm i @babel/core @babel/preset-env babel-loader -D

+ module: {
    + rules: [
        + {
            + test: /\.js$/,
            + use: 'babel-loader'
        + }
	+ ]
+ }


```

```json
//增加ES6的babel preset配置
{
    "presets": [
        + "@babel/preset-env”
    ],
    "plugins": [
   	 "@babel/proposal-class-properties"
    ]
}
```

解析 React JSX  

.babelrc文件

```json
npm i @babel/core @babel/preset-env babel-loader -D
npm i react-dom @babel/preset-react -D
+ module: {
    + rules: [
        + {
            + test: /\.js$/,
            + use: 'babel-loader'
        + }
	+ ]
+ }


```

```json
//增加React的babel preset配置
{
    "presets": [
        + "@babel/preset-env”,
        + "@babel/preset-react"
    ],
    "plugins": [
   	 "@babel/proposal-class-properties",
     "@babel/proposal-class-properties"
    ]
}
```

CSS解析：

```json
npm install style-loader css-loader less less-loader -D
+ module: {
    + rules: [
        + {
            + test: /\.css$/,
            + use: [
            + 'style-loader',//将样式通过 <style> 标签插⼊到 head 中
            + 'css-loader'//加载 .css ⽂件，并且转换成 commonjs 对象
            + ]
			//从后往前解析，style-loader排在第一
        + },
		  + {
            + test: /\.less$/,
            + use: [
            + 'style-loader',
            + 'css-loader',
    		  'less-loader'
            + ]
			//从后往前解析，style-loader排在第一
        + }
    + ]
+ }
```

图片解析：

```json
npm install file-loader -D
module: {
    rules: [
        + {
            + test: /\.(png|svg|jpg|gif)$/,
            + use: [
            + 'file-loader'
            + ]
        + }
    ]
}
```

字体解析：

```json
npm install file-loader -D
+ module: {
    rules: [
      {
        + test: /\.(woff|woff2|eot|ttf|otf)$/,
        + use: [
        + 'file-loader'
        + ]
    + }
    ]
+ }
```

资源解析解析：url-loader处理图片和字体，设置较小的资源自动base64

```json
npm install url-loader -D
+ module: {
    + rules: [
       {
        + test: /\.(png|svg|jpg|gif)$/,
        + use: [{
            + loader: 'url-loader’,
            + options: {
                + limit: 10240
    		+ }
        + }]
   	 + }
    + ]
+ }
```

文件监听：

​	两种方式：启动webpack时，--watch参数

​						配置webpack.config.js中设置watch:true;

   缺陷：手动刷新浏览器

```json
//package.json
"scripts": {
    "build": "webpack ",
    + "watch": "webpack --watch"
},
```

文件监听原理：轮询判断文件的最后编辑时间，然后缓存起来等aggregateTimeout

```json
module.export = {
    //默认 false，也就是不开启
    watch: true,
    //只有开启监听模式时， watchOptions才有意义
    wathcOptions: {
        //默认为空，不监听的文件或者文件夹，支持正则匹配
        ignored: /node_modules/,
        //监听到变化发生后会等300ms再去执行，默认300ms
        aggregateTimeout: 300,
        //判断文件是否发生变化是通过不停询问系统指定文件有没有变化实现的，默认每秒问1000次
        poll: 1000
    }
}
```

热更新： webpack-dev-server  搭配HotModuleReplacementPlugin插件  ,不刷新浏览器，不输出文件而是放在内存中。

```json
//webpack-dev-server在开发状态下使用
//webpack.config.js
const webpack=require('webpack');//自带HotModuleReplacementPlugin
mode:'development',
plugins:[
    new webpakc.HotModuleReplacementPlugin()
],
devServer:{
    contentBase:'./dist',
    hot:true
}



//package.json
"scripts": {
    "build": "webpack ",
   + ”dev": "webpack-dev-server --open"
},
```

热更新： 使⽤ webpack-dev-middleware  .WDM 将 webpack 输出的⽂件传输给服务器  

```json
//webpack.config.js
const express = require('express');//需要使用服务器express或koa
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-devmiddleware');

const app = express();

const config = require('./webpack.config.js');

const compiler = webpack(config);
app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath
}));
app.listen(3000, function () {
	console.log('Example app listening on port 3000!\n');
});
```

热更新的原理分析  

![](webpack-dev-middleware.png)

1. Webpack Compile: 将 JS 编译成 Bundle  
2. HMR Server: 将热更新的⽂件输出给 HMR Rumtime  
3. Bundle server（客户端）: 提供⽂件在浏览器的访问  
4. HMR Runtime（服务端）: 会被注⼊到浏览器，
   更新⽂件的变化  
5. bundle.js: 构建输出的⽂件  
6. BundleServer和HMR Runtime通常是websocket链接