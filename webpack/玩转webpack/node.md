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

