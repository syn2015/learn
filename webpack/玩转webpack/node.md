chapter1

## webpack 查看命令

```cmd
.\node_modules\.bin/webpack -v
```

# chapter2

## entry：

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

## output:

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

## loaders: **test指定匹配规则，use指定使用loader名称**

![](loaders.png)

```json
module: {
    rules: [
    	{ test: /\.txt$/, use: 'raw-loader' }
    ]
}
```

## plugins数组:

![](plugins.png)

```json
plugins: [
new HtmlWebpackPlugin({template:
'./src/index.html'})
]
```

## mode:

![](mode内置函数.png)

## 解析 ES6  

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

## 解析 React JSX  

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

## CSS解析：

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

## 图片解析：

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

## 字体解析：

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

## 资源解析解析：

url-loader处理图片和字体，设置较小的资源自动base64

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

## 文件监听：

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

## 热更新：

 webpack-dev-server  搭配HotModuleReplacementPlugin插件  ,不刷新浏览器，不输出文件而是放在内存中。

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



## 文件指纹：

打包后输入的文件名的后缀（生成模式下使用，不能与HotModuleReplacementPlugin一起使用）

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

## 代码压缩：

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

## 清理构建目录

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

## 移动端 CSS px ⾃动转换成 rem  

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



## 资源内联

1. 代码层面

   - ⻚⾯框架的初始化脚本

   - 上报相关打点

   - css 内联避免⻚⾯闪动  

2. 请求HTTP

   - 减少HTTP请求,比如⼩图⽚或者字体内联 (url-loader)  

```html
//npm i raw-loader@0.5.1 -D

//raw-loader0.5.1版本 内联 html

<script>${require('raw-loader!babel-loader!. /meta.html')}</script>


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
$ npm install --save-dev html-webpack-plugin html-webpack-inline-source-plugin

var HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
plugins: [  
    inlineSource: '.(js|css)$' // 增加一个 inlineSource 选项来匹配 css 和 js 
    new HtmlWebpackInlineSourcePlugin()
]

```

## 多页面应用MPA

每个⻚⾯对应⼀个 entry，⼀个 html-webpack-plugin  

缺点：每次新增或删除⻚⾯需要改 webpack 配置  

```json
entry: {
    index: './src/index.js',
    search: './src/search.js ‘
}
```

多⻚⾯打包通⽤⽅案  

动态获取 entry 和设置 html-webpack-plugin 数量  

```json
//利用glob.sync
//npm i glob -D
const glob = require('glob');
const setMPA=()=>{
    const entry={};
    const htmlWebpackPlugins=[];
    const entryFiles=glob.sync(path.join(__dirname, './src/*/index.js'));
    Object.keys(entryFiles).map((index)=>{
        const entryFile=entryFiles[index];
        //获取文件名称
        const match = entryFile.match(/src\/(.*)\/index\.js/);
        /*match的内容*/
        //['src/index/index.js','index',index:27,input:'带有盘符的路径',groups:undefined]
        const pageName = match && match[1];
        entry[pageName] = entryFile;
         htmlWebpackPlugins.push(
                new HtmlWebpackPlugin({
                    template: path.join(__dirname, `src/${pageName}/index.html`),
                    filename: `${pageName}.html`,
                    chunks: [pageName],
                    inject: true,
                    minify: {
                        html5: true,
                        collapseWhitespace: true,
                        preserveLineBreaks: false,
                        minifyCSS: true,
                        minifyJS: true,
                        removeComments: false
                    }
                })
            );
    })
    return {
         entry,
         htmlWebpackPlugins
    }
}
const { entry, htmlWebpackPlugins } = setMPA();

```

## source map

1. devtool选项（mode设为none）

2. source map关键字

   - eval: 使⽤eval包裹模块代码，不产生map文件
   - source map: 产⽣.map⽂件  
   - cheap: 不包含列信息
   - inline: 将.map作为DataURI嵌⼊，不单独⽣成.map⽂件
   - module:包含loader的sourcemap  

3. source map类型

   ![](sourceMap-类型.png)

   

## 基础库分离  

使⽤ html-webpackexternals-plugin  

```json
//npm i html-webpackexternals-plugin -D
plugins: [
    new HtmlWebpackExternalsPlugin({
      externals: [
        {
          module: "react",
          entry:
            "https://cdn.bootcss.com/react/16.13.1/umd/react.development.js",
          global: "React",
        },
        {
          module: "react-dom",
          entry:
            "https://cdn.bootcss.com/react-dom/16.13.1/umd/react-dom.development.js",
          global: "ReactDOM",
        },
      ],
    }),
  ],
//同时需要在index.html写入cdn地址，这样生产打包以后可以使用线上资源
```

SplitChunksPlugin

webpack4内置，替代CommonsChunkPlugin插件

```json
//chunks 参数说明：
	//async 异步引⼊的库进⾏分离(默认)
	//initial 同步引⼊的库进⾏分离
	//all 所有引⼊的库进⾏分离(推荐)
//分离公共脚本
optimization: {
    splitChunks: {
        chunks: 'async',
        minSize: 30000,
        maxSize: 0,
        minChunks: 1,
        maxAsyncRequests: 5,
        maxInitialRequests: 3,
        automaticNameDelimiter: '~',
        name: true,
        cacheGroups: {
            vendors: {
                test: /[\\/]node_modules[\\/]/,
                priority: -10
            }
        }
    }
}
//分离基础包
//test: 匹配出需要分离的包

optimization: {
    splitChunks: {
        cacheGroups: {
            commons: {
                test: /(react|react-dom)/,
                name: 'vendors',//打包之后包含上述包的JS
                chunks: 'all'
            }
        }
    }
}
//需要在index.html中手动引入vendors包，或者是添加到在HtmlWebpackExternalsPlugin中的chunks选项中
chunks:['vendors',pageName],




//分离公共文件
//minChunks设置最小引用次数为2
//minSize:分离的包体积的大小
optimization: {
    splitChunks: {
        minSize: 0,//所有引用的包都会被打包成commons
            cacheGroups: {
                commons: {
                    name: 'commons',
                    chunks: 'all',
                    minChunks: 2
                }
            }
        }
    }
}
//需要在index.html中手动引入commons包，或者是添加到在HtmlWebpackExternalsPlugin中的chunks选项中
chunks:['commons',pageName],
```

## tree shaking(摇树优化)

**概念：** 1 个模块可能有多个⽅法，只要其中的某个⽅法使⽤到了，则整个⽂件都会被打到bundle ⾥⾯去， tree shaking 就是只把⽤到的⽅法打⼊ bundle ， 没⽤到的⽅法会在uglify 阶段被擦除掉。  

1. webpack 默认⽀持，在 .babelrc ⾥设置 modules: false 即可

2. production mode的情况下默认开启  
3. 要求：必须是 ES6 的语法， CJS 的⽅式(require)不⽀持

**DCE (Dead code elimination)**  

- 特点是代码不会被执⾏，不可到达  
- 代码执⾏的结果不会被⽤到  
- 代码只会影响死变量（只写不读）  

**tree-shaking原理**

1. 利⽤ ES6 模块的特点:
   - ·只能作为模块顶层的语句出现
   - · import 的模块名只能是字符串常量
   - · import binding 是 immutable的
   - 代码擦除： uglify 阶段删除⽆⽤代码  

## scope hoisting

**现象：构建后的代码存在⼤量闭包代码**  

⼤量作⽤域包裹代码，导致体积增⼤（模块越多越明显）  

运⾏代码时创建的函数作⽤域变多，内存开销变⼤  

**原理：** 将所有模块的代码按照引⽤顺序放在⼀个函数作⽤域⾥，然后适当的重命名⼀些变量以防⽌变量名冲突
**对⽐**: 通过 scope hoisting 可以减少函数声明代码和内存开销  

**模块转换分析**  

1. ·被 webpack 转换后的模块会带上⼀层包裹
2. ·import 会被转换成 __webpack_require  
3. 打包出来的是⼀个 IIFE (匿名闭包)  
4. modules 是⼀个数组，每⼀项是⼀个模块初始化函数  
5. __webpack_require ⽤来加载模块，返回 module.exports  
6. 通过 WEBPACK_REQUIRE_METHOD(0) 启动程序  

**scope hoisting使用**

webpack3

```json
plugins: [
+ new webpack.optimize.ModuleConcatenationPlugin()
};
```

webpack4

```json
webpack mode 为 production 默认开启
必须是 ES6 语法， CJS(require) 不⽀持
```

**代码分割**

对于⼤的 Web 应⽤来讲，将所有的代码都放在⼀个⽂件中显然是不够有效的，特别是当你的某些代码块是在某些特殊的时候才会被使⽤到。 webpack 有⼀个功能就是将你的代码库分割成chunks（语块），当代码运⾏到需要它们的时候再进⾏加载。  

**适用场景**

1. 抽离相同代码到⼀个共享块  
2. 脚本懒加载，使得初始下载的代码更⼩  

**懒加载JS脚本的方式**

1. CommonJS:require.ensure

2. ES6:动态import(目前还没有原生支持，需要babel转换)

   ```json
   //
   npm install @babel/plugin-syntax-dynamic-import --save-dev
   //.babelrc文件
   {
   	"plugins":["@babel/plugin-syntax-dynamic-import"],
   }
   ```

## ESLint

基于 eslint:recommend 配置并改进  

和CI/CD集成

![](eslint-CI-CD.png)

和webpack集成



```json
//npm install eslint-plugin-import eslint-plugin-react eslint-plugin-jsx-ally eslint-loader eslint-config-airbnb -D
//webpack.config.json
module: {
    rules: [
        {
            test: /\.js$/,
            exclude: /node_modules/,
            use: [
                "babel-loader",
                + "eslint-loader”
            ]
        }
    ]
}
//.eslintrc.js文件
module.exports = {
    "parser": "babel-eslint",//解析器
    "extends": "airbnb",//继承airbnb配置
    "env": {
        "browser": true,//环境变量
        "node": true
    },
    "rules": {
        "indent": ["error", 4]
    }
};
```

## 打包组件和库



```json
//暴露库
mode: "production",
entry: {
    "large-number": "./src/index.js",
    "large-number.min": "./src/index.js"
},
output: {
    filename: "[name].js",
    library: "largeNumber",//指定库的全局变量
    libraryExport: "default",//指定库的使用方式：default,可以不用new的方式
    libraryTarget: "umd"//库的引用方式
}
//.min的压缩，include设置只压缩min.js结尾的文件
// npm i terser-webpack-plugin -D 安装压缩库 ，webpack4内置生产环境下启用
mode:'none',//首先设置none
optimization: {
    minimize: true,
    minimizer: [
        new TerserPlugin({
        	include: /\.min\.js$/,
        }),
    ],
}
//设置入口文件：package.json的main字段为index.js
//package.json里增加钩子prepublish
"prepublish":"webpack"

//index.js文件
if (process.env.NODE_ENV === "production") {
module.exports = require("./dist/large-number.min.js");
} else {
module.exports = require("./dist/large-number.js");
}
```

`prepublish`这个钩子不仅会在`npm publish`命令之前运行，还会在`npm install`（不带任何参数）命令之前运行。这种行为很容易让用户感到困惑，所以 npm 4 引入了一个新的钩子`prepare`，行为等同于`prepublish`，而从 npm 5 开始，`prepublish`将只在`npm publish`命令之前运行。

## SSR



## ⽇志显示  



![](日志显示.png)

stats字段

```json
//mode: "production"时，直接设置stats
stats:'errors-only';
//开发环境下
devServer:{
    contentBase:'./dist',
    hot:true,
    stats:'errors-only'
}
```

使用friendly-errors-webpack-plugin  插件

```json
//npm i friendly-errors-webpack-plugin  -D
plugins: [
+ new FriendlyErrorsWebpackPlugin()
],

```

##　构建异常和中断

1. 在 CI/CD 的 pipline 或者发布系统需要知道当前构建状态  每次构建完成后输⼊ echo $? 获取错误码  
2. webpack4 之前的版本构建失败不会抛出错误码 (error code)  
3. Node.js 中的 process.exit 规范  
   - 0 表示成功完成，回调函数中， err 为 null  
   - ⾮ 0 表示执⾏失败，回调函数中， err 不为 null， err.code 就是传给 exit 的数字  

**主动捕获处理构建错误**

```json
//compiler 在每次构建结束后会触发 done 这个 hook
//process.exit 主动处理构建报错

plugins: [
    function() {
        this.hooks.done.tap('done', (stats) => {
            if (stats.compilation.errors && stats.compilation.errors.length && process.argv.indexOf('--watch') == -1)
            {
                console.log('build error');
                process.exit(1);
            }
        })
    }
]
```

