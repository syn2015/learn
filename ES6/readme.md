# ECMAScript 6

## Babel转码器

1. 各大浏览器最新版本对于 ES6 的支持，可以参阅 [ES6](http://kangax.github.io/compat-table/es6/)

2. node --vs-options I grep harmony  

3. 查看本机对 ES6 的支持程度   

   - npm install -g es-checker  
   - es-checker  

4. .babelrc

   - ```json
     {
         "presets":[
             "latest",
             "react",
             "stage-2"
         ], //设定转码规则
         "plugins":[]  //
     }
     ```

     

   - ```javascript
     ＃最新转码规则
     $ npm install --save -dev babel-preset-latest
     # react 转码规则
     $ npm install --save-dev babel-preset-react
     ＃不同阶段语法提案的转码规则（共有 4 个阶段），选装一个
     $ npm install --save-dev babel-preset-stage-0
     $ npm install --save-dev babel-preset-stage-1
     $ npm install --save-dev babel-preset-stage-2
     $ npm install --save-dev babel-preset-stage-3
     ```

     

5. 命令行转码babel-cli

   - ```
     它的安装命令如下。
     $ npm install --global babel-cli
     基本用法如下。
     ＃转码结采输出到标准输出
     $ babel example.js
     ＃转码结果写入一个文件
     # --out-file 或 -o 参数指定输出文件
     $ babel example.js --out-file compiled.js
     ＃或者
     $ babel example.js -o compiled.js
     ＃整个目录转码
     # --out-dir 或－ d 参数指定输出目录
     $ babel src --out-dir lib
     ＃或者
     $ babel src -d lib
     # -s 参数生成 source map 文件
     $ babel src -d lib -s
     ```

   - 本地安装babel

     - ```
       npm install --save-dev babel-cli
       //改写package.json文件
       "devDependencies":{
       	"babel-cli":"^6.0.6"
       },
       "scripts":{
       	"build":"babel src -d lib"
       }
       //转码命令 npm run build
       ```

   - babel-node,提供一个支持es6的REPL环境。

     - ```
       //直接运行命令
       babel-node 
       //直接运行es6脚本
       babel-node es6.js
       //安装到项目中
       npm install --save-dev babel-cli
       //改写package.json
       "scripts":{
       	"script-name":"babel-node scripts.js"
       }
       ```

     - 使用babel-node代替node，scripts.js本省就可以不用任何转码处理了

   - babel-register,改写了require命令，加入钩子，每当使用require加载后缀为js,jsx,es和es6的文件时候，会先babel进行转码

     - ```
       $ npm install --save-dev babel - register
       使用时，必须首先加载 babel-register 。
       require (” babel - register” );
       require (” . / index . j s ”);
       这样便不需要手动对 index. j s 进行转码了 。
       ```

     - babel-register 只会对 require 命令加载的文件进行转码，而不会对当前文件进行
       转码。 另外，由于它是实时转码，所以只适合在开发环境中使用  

   - babel-core，在某些代码需要调用babel的API进行转码时要用到

     - 

   - babel-polyfill ,Babel 默认只转换新的 Java Script 句法（ syntax ），而不转换新的 API ，如 Iterator 、
     Generator 、 Set 、 Maps 、 Proxy 、 Reflect 、 Symbol 、 Promise 等全局对象，以及一些定义在全局对象上的方法（如 Object . assign ）都不会转码。  如果想让这个方法运行，必须使用 babel-polyfill 为当前环境提供一个垫片。  

     - ```
       npm install --save babel-polyfill
       然后，在脚本头部加入如下代码。
       import ’ babel - polyfill ’;
       //或者
       require ( ’ babel-polyfill ’);
       ```

     - Babel默认不转码的API。[babel -plugin-t ransformruntime 模块的 definitions .js]()

   - 浏览器环境

     - 从 Babe l 6 . 0 开始将不再直接提供浏览器版本 ， 而是
       要用构建工具构建出来。如果没有或不想使 用 构建工具 ， 可以使用 babel-standalone
       ( github.com/Daniel 15/babel-standalone ）模块提供的浏览器版本，将其插入网页。 

     - 网页实时将 ES6 代码转为 ES5 代码 ， 对性能会有影响 。 生产环境下 需加载 已转码的
       脚本 。   

     - ```
       //配合broswerify，babel打包成浏览器可以使用的脚本
       npm install --save-dev babelify babel-preset-latest
       //然后用命令转换es6脚本
       browserify script.js -o bundle.js -t [babelify --presets [latest]]
       //package.json加入一下代码
       "browserify":{
       	"transform":[["babelify",{"presets":["latest"]}]]
       }
       ```

   - [在线转换](babeljs.io/repl/)

   - 和其他工具配合

     - eslint，mocha需要babel进行前置转码

     - ```
       //.eslintrc
       npm install --save-dev eslint babel-eslint
       "parser":"babel-eslint",
       "rules":{
       	...
       }
       //配合package.json
       "name":"my-module",
       "scripts":{
       	"lint":"eslint my-files.js"
       },
       "devDependencies":{
       	"babel-eslint":"...",
       	"eslint":"..."
       }
       ```

     - ```
       //mocha测试框架
       "scripts":{
       	"test":"mocha --ui qunit --compilers js:babel-core/register"
       }
       //--compilers指定脚本的转换器，规定js结尾的文件你需要babel-core/register先进行转码
       ```

       

## traceul转码器

# Let和const

# 变量解构和赋值

# 字符串的扩展

# 正则的扩展

# 数值扩展

# 函数扩展

# 数组的扩展

# 对象的扩展

# Symbol

# Set和Map的数据结构

# Proxy

# Reflect

# Promise对象

# Iterator和for...of循环

# 第16章 Generator函数的语法

# 第17章 Generator函数的异步应用

# 第18章 async函数

# 第19章 Class的基本语法

# 第20章 Class的继承

# 第21章 修饰器

# 第22章 Module的语法

# 第23章 Module的加载实现

# 第24章 编程风格

# 第25章 读懂ECMAScript规格

# 第26章 ArrayBuffer