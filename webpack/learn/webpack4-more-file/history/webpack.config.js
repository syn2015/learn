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
