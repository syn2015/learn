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
6. **BundleServer和HMR Runtime通常是websocket链接**



文件指纹：打包后输入的文件名的后缀（生成模式下使用，不能与HotModuleReplacementPlugin一起使用）

1. Hash：**和整个项⽬的构建相关**，只要**项⽬⽂件有修改**，整个项⽬构建的 hash 值就会更改
2. Chunkhash**：和 webpack 打包的 chunk 有关**，不同的 entry 会⽣成不同的 chunkhash 值
3. Contenthash：**根据⽂件内容来定义 hash** ，⽂件内容不变，则 contenthash 不变  

```json
//JS文件:设置output的filename,使用[chunkhash]
output: {
    + filename: '[name]_[chunkhash:8].js',
    path: __dirname + '/dist'
}

//MiniCssExtractPlugin(写作：MiniCssExtractPlugin.loader)不能实style-loader一起使用

//CSS文件：设置 MiniCssExtractPlugin (抽离CSS单文件)的 filename，使⽤ [contenthash]
plugins: [
    + new MiniCssExtractPlugin({
   		 + filename: `[name]_[contenthash:8].css`
    + });
]



//图片文件：设置 file-loader 的 name，使⽤ [hash]
rules: [
    {
        test: /\.(png|svg|jpg|gif)$/,
        use: [{
        loader: 'file-loader’,
        + options: {
        	+ name: 'img/[name]_[hash:8].[ext] '
        + }
        }]
    }
]
```

![](占位符示意.png)

代码压缩：

```json
//JS压缩：webpack4内置uglifyjs-webpack-plugin

//CSS压缩：使⽤ optimize-css-assets-webpack-plugin
//同时使⽤ cssnano
//npm install optimize-css-assets-webpack-plugin cssnano -D 
plugins: [
    + new OptimizeCSSAssetsPlugin({
        + assetNameRegExp: /\.css$/g,
        + cssProcessor: require('cssnano’ )
    + })
]
//html ⽂件的压缩:  修改 html-webpack-plugin， 设置压缩参数
// npm i html-webpack-plugin -D 
plugins: [
+ new HtmlWebpackPlugin({
    + template: path.join(__dirname, 'src/search.html’ ),
    + filename: 'search.html’ ,
    + chunks: ['search’ ],
    + inject: true,//自动注入js,css
    + minify: {
        + html5: true,
        + collapseWhitespace: true,
        + preserveLineBreaks: false,
        + minifyCSS: true,
        + minifyJS: true,
        + removeComments: false
    + }
+ })
]
```

# chapter3

清理构建目录

```shell
rm -rf ./dist && webpack
rimraf ./dist && webpack
```

```json
//npm install clean-webpack-plugin -D
plugins: [
	+ new CleanWebpackPlugin()
]
```

PostCSS 插件 autoprefixer ⾃动补⻬ CSS3 前缀  

```json
//npm install postcss-loader autoprefixer -D 

rules: [
{
    test: /\.less$/,
    use: [
    'style-loader',
    'css-loader',
    'less-loader',
    + {
        + loader: 'postcss-loader',
        + options: {
            + plugins: () => [
                + require('autoprefixer')({
                    + browsers: ["last 2 version", "> 1%", "iOS 7"]
                + })
            + ]
		 }
    + }
+ }
]

```

移动端 CSS px ⾃动转换成 rem  

使用px2rem-loader

```json
//npm i px2rem-loader -D
//npm i lib-flexible -S  生产依赖
rules: [
{
    test: /\.less$/,
    use: [
    'style-loader',
    'css-loader',
    'less-loader',
    + {
        + loader: "px2rem-loader",
        + options: {
            + remUnit: 75,//1rem等于75px
            + remPrecision: 8 //保留小数点
        + }
    + }
    ]
}
]	
```

flexible.js包不支持内联

```html
//index.html
<script>
    (function flexible (window, document) {
  var docEl = document.documentElement
  var dpr = window.devicePixelRatio || 1

  // adjust body font size
  function setBodyFontSize () {
    if (document.body) {
      document.body.style.fontSize = (12 * dpr) + 'px'
    }
    else {
      document.addEventListener('DOMContentLoaded', setBodyFontSize)
    }
  }
  setBodyFontSize();

  // set 1rem = viewWidth / 10
  function setRemUnit () {
    var rem = docEl.clientWidth / 10
    docEl.style.fontSize = rem + 'px'
  }

  setRemUnit()

  // reset rem unit on page resize
  window.addEventListener('resize', setRemUnit)
  window.addEventListener('pageshow', function (e) {
    if (e.persisted) {
      setRemUnit()
    }
  })

  // detect 0.5px supports
  if (dpr >= 2) {
    var fakeBody = document.createElement('body')
    var testElement = document.createElement('div')
    testElement.style.border = '.5px solid transparent'
    fakeBody.appendChild(testElement)
    docEl.appendChild(fakeBody)
    if (testElement.offsetHeight === 1) {
      docEl.classList.add('hairlines')
    }
    docEl.removeChild(fakeBody)
  }
}(window, document))
</script>
```



资源内联

1. 代码层面

   - ⻚⾯框架的初始化脚本

   - 上报相关打点

   - css 内联避免⻚⾯闪动  

2. 请求HTTP

   - 减少HTTP请求,比如⼩图⽚或者字体内联 (url-loader)  

```html
//npm i raw-loader@0.5.1 -D

//raw-loader0.5.1版本 内联 html

<script>${require(' raw-loader!babel-loader!. /meta.html')}</script>


//raw-loader0.5.1版本 内联 JS

<script>${require('raw-loader!babel-loader!../node_modules/lib-flexible')}</script>
```



```json
//方案一：style-loader


rules: [
    {
        test: /\.scss$/,
        use: [
            {
                loader: 'style-loader',
                options: {
                    insertAt: 'top', // 样式插入到 <head>
                    singleton: true, //将所有的style标签合并成一个
                }
            },
            "css-loader",
            "sass-loader"
        ],
    },
]
//方案二:html-inline-css-webpack-plugin


```

