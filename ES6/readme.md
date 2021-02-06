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

traceur（Google）,必须在头部加载traceul库文件

```javascript
<script src=” https://google . github . io/traceur-compiler..」
/bin / traceur . js ” ></script>
<script src=” https : //google . github . io / traceur-compiler,_i
/bin/BrowserSystem.j s ” ></ s cript>
<script src=” https : //google . github . io/traceur-compiler,_i
/src / bootstrap.j s ” ></script>
<script type=” module ” >
import ’. / Greeter.js ’;
</script>
//第一个用来加载traceul文件，第二三个用于浏览器环境。第一个用来加载es6代码(type为module，实别ES6代码的标志)
// 也可以直接在页面中放置ES6代码
```

![](./traceul.png)

traceur的全局对象。system.import加载ES6,配置对象metadata.traceurOptions属性配置支持ES6.

experimental:true.表示除了ES6外还支持一些实验性新功能。

1. 命令行转换
   - npm i -g traceul
   - traceul --script  ES6.js --out calc.es5.js  //指定输入输出，--experimental选项支持更多新特性
2. Node环境的用法
   - ![](traceul-node.png)

# Let和const

块级作用域

```javascript

```

对象冻结，Object.freeze();

```javascript
const foo = Object.freeze({});

// 常规模式时，下面一行不起作用；
// 严格模式时，该行会报错
foo.prop = 123;
//常量foo指向一个冻结的对象，所以添加新属性不起作用，严格模式时还会报错。
```

对象的属性冻结

```javascript
var constantize = (obj) => {
  Object.freeze(obj);
  Object.keys(obj).forEach( (key, i) => {
    if ( typeof obj[key] === 'object' ) {
      constantize( obj[key] );
    }
  });
};
```

顶级对象的属性

```javascript
var a = 1;
// 如果在 Node 的 REPL 环境，可以写成 global.a
// 或者采用通用方法，写成 this.a
window.a // 1

let b = 1;
window.b // undefined
//全局变量a由var命令声明，所以它是顶层对象的属性；全局变量b由let命令声明，所以它不是顶层对象的属性，返回undefined。
```

globalThis对象

```javascript
JavaScript 语言存在一个顶层对象，它提供全局环境（即全局作用域），所有代码都是在这个环境中运行。但是，顶层对象在各种实现里面是不统一的。
//在所有情况下，都取到顶层对象
// 方法一
(typeof window !== 'undefined'
   ? window
   : (typeof process === 'object' &&
      typeof require === 'function' &&
      typeof global === 'object')
     ? global
     : this);

// 方法二
var getGlobal = function () {
  if (typeof self !== 'undefined') { return self; }
  if (typeof window !== 'undefined') { return window; }
  if (typeof global !== 'undefined') { return global; }
  throw new Error('unable to locate global object');
};
//ES2020 在语言标准的层面，引入globalThis作为顶层对象。也就是说，任何环境下，globalThis都是存在的，都可以从它拿到顶层对象，指向全局环境下的this。

垫片库global-this模拟了这个提案，可以在所有环境拿到globalThis。
```



# 变量解构和赋值

ES6 允许按照一定模式，从数组和对象中提取值，对变量进行赋值，这被称为解构（Destructuring）。

```javascript
//基本用法
let [x, y, ...z] = ['a'];
x // "a"
y // undefined
z // []

//如果解构不成功，变量的值就等于undefined。
// foo的值都会等于undefined。
let [foo] = [];
let [bar, foo] = [1];

// 不完全解构
let [x, y] = [1, 2, 3];
x // 1
y // 2

let [a, [b], d] = [1, [2, 3], 4];
a // 1
b // 2  ，这里就是拿了第一个
d // 4

//如果等号的右边不是数组（或者严格地说，不是可遍历的结构，参见《Iterator》一章），那么将会报错。
//等号右边的值，要么转为对象以后不具备 Iterator 接口（前五个表达式），要么本身就不具备 Iterator 接口（最后一个表达式）。
// 报错
let [foo] = 1;
let [foo] = false;
let [foo] = NaN;
let [foo] = undefined;
let [foo] = null;
let [foo] = {};



// Set 结构，也可以使用数组的解构赋值。
let [x, y, z] = new Set(['a', 'b', 'c']);
x // "a"

//事实上，只要某种数据结构具有 Iterator 接口，都可以采用数组形式的解构赋值。
//fibs是一个 Generator 函数（参见《Generator 函数》一章），原生具有 Iterator 接口。解构赋值会依次从这个接口获取值。
function* fibs() {
  let a = 0;
  let b = 1;
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}

let [first, second, third, fourth, fifth, sixth] = fibs();
sixth // 5
```



```javascript
//默认值
//解构赋值允许指定默认值。
//ES6 内部使用严格相等运算符（===），判断一个位置是否有值。所以，只有当一个数组成员严格等于undefined，默认值才会生效。
let [x = 1] = [undefined];
x // 1

let [x = 1] = [null];
x // null



//默认值是一个表达式，那么这个表达式是惰性求值的，即只有在用到的时候，才会求值。
function f() {
  console.log('aaa');
}

let [x = f()] = [1];
//因为x能取到值，所以函数f根本不会执行。上面的代码其实等价于下面的代码。
let x;
if ([1][0] === undefined) {
  x = f();
} else {
  x = [1][0];
}


//默认值可以引用解构赋值的其他变量，但该变量必须已经声明。
let [x = 1, y = x] = [];     // x=1; y=1
let [x = 1, y = x] = [2];    // x=2; y=2
let [x = 1, y = x] = [1, 2]; // x=1; y=2
let [x = y, y = 1] = [];     // ReferenceError: y is not defined
//最后一个表达式之所以会报错，是因为x用y做默认值时，y还没有声明。
```





```javascript
//对象的解构赋值
//对象的解构与数组有一个重要的不同。数组的元素是按次序排列的，变量的取值由它的位置决定；而对象的属性没有次序，变量必须与属性同名，才能取到正确的值。
//如果解构失败，变量的值等于undefined。

//将现有对象的方法，赋值某个变量上
let { log, sin, cos } = Math;
const { log } = console;
log('hello') // hello
// 如果变量名与属性名不一致，必须写成下面这样。
let { foo: baz } = { foo: 'aaa', bar: 'bbb' };
baz // "aaa"

let obj = { first: 'hello', last: 'world' };
let { first: f, last: l } = obj;
f // 'hello'
l // 'world'
// 原理，对象的解构赋值的内部机制，是先找到同名属性，然后再赋给对应的变量。真正被赋值的是后者，而不是前者。
let { foo: baz } = { foo: 'aaa', bar: 'bbb' };
baz // "aaa"
foo // error: foo is not defined
//foo是匹配的模式，baz才是变量。真正被赋值的是变量baz，而不是模式foo。


const node = {
  loc: {
    start: {
      line: 1,
      column: 5
    }
  }
};

let { loc, loc: { start }, loc: { start: { line }} } = node;
line // 1
loc  // Object {start: Object}
start // Object {line: 1, column: 5}

//上面代码有三次解构赋值，分别是对loc、start、line三个属性的解构赋值。注意，最后一次对line属性的解构赋值之中，只有line是变量，loc和start都是模式，不是变量。
```



# 字符串的扩展

## 字符的 Unicode 表示法

ES6以后JavaScript 共有 6 种方法可以表示一个字符。

```javascript
'\z' === 'z'  // true
'\172' === 'z' // true
'\x7A' === 'z' // true
'\u007A' === 'z' // true
'\u{7A}' === 'z' // true
```

## 字符串的遍历器接口 

```javascript
//字符串可以被for...of循环遍历。可以识别大于0xFFFF的码点，传统的for循环无法识别这样的码点。
for (let codePoint of 'foo') {
  console.log(codePoint)
}
```

## JavaScript 字符串允许直接输入字符，以及输入字符的转义形式。

```javascript
'中' === '\u4e2d' // true

//JavaScript 规定有5个字符，不能在字符串里面直接使用，只能使用转义形式。
U+005C：反斜杠（reverse solidus)
U+000D：回车（carriage return）
U+2028：行分隔符（line separator）
U+2029：段分隔符（paragraph separator）
U+000A：换行符（line feed）


// JSON 格式允许字符串里面直接使用 U+2028（行分隔符）和 U+2029（段分隔符）。
const json = '"\u2028"';
JSON.parse(json); // 可能报错

//为了消除这个报错，ES2019 允许 JavaScript 字符串直接输入 U+2028（行分隔符）和 U+2029（段分隔符）。
const PS = eval("'\u2029'"); //true


//模板字符串现在就允许直接输入这两个字符。另外，正则表达式依然不允许直接输入这两个字符，
```

## JSON-stringify-的改造

根据标准，JSON 数据必须是 UTF-8 编码.为了确保返回的是合法的 UTF-8 字符，[ES2019](https://github.com/tc39/proposal-well-formed-stringify) 改变了`JSON.stringify()`的行为。如果遇到`0xD800`到`0xDFFF`之间的单个码点，或者不存在的配对形式，它会返回转义字符串，留给应用自己决定下一步的处理。

```javascript
JSON.stringify('\u{D834}') // "\u{D834}"



JSON.stringify('\u{D834}') // ""\\uD834""
JSON.stringify('\uDF06\uD834') // ""\\udf06\\ud834""
```

## 模板字符串

在模板字符串中需要使用反引号，则前面要用反斜杠转义。

表示多行字符串，所有的空格和缩进都会被保留在输出之中.trim()可以消除换行

大括号内部可以放入任意的 JavaScript 表达式，可以进行运算，以及引用对象属性。

模板字符串之中还能调用函数。

如果大括号中的值不是字符串，将按照一般的规则转为字符串。toString()

模板字符串甚至还能嵌套。



```javascript
let greeting = `\`Yo\` World!`;
//如果需要引用模板字符串本身，在需要时执行，可以写成函数。
let func = (name) => `Hello ${name}!`;
func('Jack') // "Hello Jack!"
```

## 实例：模板编译



## 标签模板



## 模板字符串的限制



# 字符串的新增方法

## String.fromCodePoint()

ES5 提供`String.fromCharCode()`方法（**实例对象上**），用于从 Unicode 码点返回对应字符，但是这个方法不能识别码点大于`0xFFFF`的字符。

ES6 提供了`String.fromCodePoint()`方法(定义在**String对象上**)，可以识别大于`0xFFFF`的字符，弥补了`String.fromCharCode()`方法的不足。在作用上，正好与下面的`codePointAt()`方法相反。如果`String.fromCodePoint`方法有多个参数，则它们会被合并成一个字符串返回。

## String.raw()

`String.raw()`方法可以作为处理模板字符串的基本方法，它会将所有变量替换，而且对斜杠进行转义，方便下一步作为字符串来使用。

## 实例方法codePointAt()

JavaScript 内部，字符以 UTF-16 的格式储存，每个字符固定为`2`个字节。对于那些需要`4`个字节储存的字符（Unicode 码点大于`0xFFFF`的字符），JavaScript 会认为它们是两个字符。

ES6 提供了`codePointAt()`方法，能够正确处理 4 个字节储存的字符，返回一个字符的码点。

`codePointAt()`方法返回的是码点的十进制值，如果想要十六进制的值，可以使用`toString()`方法转换一下。

## 实例方法normalize()

## 实例方法includes()，startsWith(),endWith()

JavaScript 只有`indexOf`方法，用来确定一个字符串是否包含在另一个字符串中。ES6 又提供了三种新方法。

```javascript
includes()：返回布尔值，表示是否找到了参数字符串。
startsWith()：返回布尔值，表示参数字符串是否在原字符串的头部。
endsWith()：返回布尔值，表示参数字符串是否在原字符串的尾部
//这三个方法都支持第二个参数，表示开始搜索的位置。endsWith()它针对前n个字符，而其他两个方法针对从第n个位置直到字符串结束。
```



## 实例方法repeat()

`repeat`方法返回一个新字符串，表示将原字符串重复`n`次。

参数如果是小数，会被向下取整。如果`repeat`的参数是负数或者`Infinity`，会报错。

如果参数是 0 到-1 之间的小数，则等同于 0，这是因为会先进行取整运算。0 到-1 之间的小数，取整以后等于`-0`，`repeat`视同为 0。参数`NaN`等同于 0。

```javascript
na'.repeat(-0.9) // ""
```

如果`repeat`的参数是字符串，则会先转换成数字。

## 实例方法padStart(),padEnd()

`padStart()`和`padEnd()`一共接受两个参数，第一个参数是字符串补全生效的最大长度，第二个参数是用来补全的字符串。

如果原字符串的长度，等于或大于最大长度，则字符串补全不生效，返回原字符串。

如果用来补全的字符串与原字符串，两者的长度之和超过了最大长度，则会截去超出位数的补全字符串。

```javascript
'abc'.padStart(10, '0123456789')
// '0123456abc'
```

如果省略第二个参数，默认使用空格补全长度。

`padStart()`的常见用途是为数值补全指定位数。

```javascript
'1'.padStart(10, '0') // "0000000001"
'12'.padStart(10, '0') // "0000000012"
'123456'.padStart(10, '0') // "0000123456"
```

另一个用途是提示字符串格式。

```javascript
'12'.padStart(10, 'YYYY-MM-DD') // "YYYY-MM-12"
'09-12'.padStart(10, 'YYYY-MM-DD') // "YYYY-09-12"
```



## 实例方法trimStart(),trimEnd()

`trimStart()`消除字符串头部的空格，`trimEnd()`消除尾部的空格。它们返回的都是新字符串，不会修改原始字符串。

除了空格键，这两个方法对字符串头部（或尾部）的 tab 键、换行符等不可见的空白符号也有效。

浏览器还部署了额外的两个方法，`trimLeft()`是`trimStart()`的别名，`trimRight()`是`trimEnd()`的别名。





## 实例方法matchAll()

`matchAll()`方法**返回一个正则表达式在当前字符串的所有匹配**

## 实例方法replaceAll()

```javascript
'aabbcc'.replace('b', '_')
// 'aa_bcc',只将第一个b替换成了下划线。
'aabbcc'.replace(/b/g, '_')
// 'aa__cc',使用正则表达式的g修饰符。


'aabbcc'.replaceAll('b', '_')
// 'aa__cc'
```

它的用法与`replace()`相同，返回一个新字符串，不会改变原字符串。

```javascript
//原型
String.prototype.replaceAll(searchValue, replacement)
//searchValue是搜索模式，可以是一个字符串，也可以是一个全局的正则表达式（带有g修饰符）。
//如果searchValue是一个不带有g修饰符的正则表达式，replaceAll()会报错。这一点跟replace()不同。
// 不报错
'aabbcc'.replace(/b/, '_')

// 报错
'aabbcc'.replaceAll(/b/, '_')
```

`replaceAll()`的第二个参数`replacement`是一个字符串，表示替换的文本，其中可以使用一些特殊字符串。

```javascript
//$&：匹配的子字符串。
//$` ：匹配结果前面的文本。
//$'：匹配结果后面的文本。
//$n：匹配成功的第n组内容，n是从1开始的自然数。这个参数生效的前提是，第一个参数必须是正则表达式。
//$$：指代美元符号$。

// $& 表示匹配的字符串，即`b`本身
// 所以返回结果与原字符串一致
'abbc'.replaceAll('b', '$&')
// 'abbc'

// $` 表示匹配结果之前的字符串
// 对于第一个`b`，$` 指代`a`
// 对于第二个`b`，$` 指代`ab`
'abbc'.replaceAll('b', '$`')
// 'aaabc'

// $' 表示匹配结果之后的字符串
// 对于第一个`b`，$' 指代`bc`
// 对于第二个`b`，$' 指代`c`
'abbc'.replaceAll('b', `$'`)
// 'abccc'

// $1 表示正则表达式的第一个组匹配，指代`ab`
// $2 表示正则表达式的第二个组匹配，指代`bc`
'abbc'.replaceAll(/(ab)(bc)/g, '$2$1')
// 'bcab'

// $$ 指代 $
'abc'.replaceAll('b', '$$')
// 'a$c'
```

`replaceAll()`的第二个参数`replacement`除了为字符串，也可以是一个函数，该函数的返回值将替换掉第一个参数`searchValue`匹配的文本。

```javascript
'aabbcc'.replaceAll('b', () => '_')
// 'aa__cc'
```

这个替换函数可以接受多个参数。第一个参数是捕捉到的匹配内容，第二个参数捕捉到是组匹配（有多少个组匹配，就有多少个对应的参数）。此外，最后还可以添加两个参数，倒数第二个参数是捕捉到的内容在整个字符串中的位置，最后一个参数是原字符串。

```javascript
const str = '123abc456';
const regex = /(\d+)([a-z]+)(\d+)/g;

function replacer(match, p1, p2, p3, offset, string) {
  return [p1, p2, p3].join(' - ');
}

str.replaceAll(regex, replacer)
// 123 - abc - 456
//正则表达式有三个组匹配，所以replacer()函数的第一个参数match是捕捉到的匹配内容（即字符串123abc456），后面三个参数p1、p2、p3则依次为三个组匹配。
```



# 正则的扩展

## RegExp 构造函数

```javascript
var regex = new RegExp('xyz', 'i');
等价于
var regex = new RegExp(/xyz/i);

```

ES5 不允许此时使用第二个参数添加修饰符，否则会报错。

```javascript
var regex = new RegExp(/xyz/, 'i');
```

ES6,如果`RegExp`构造函数第一个参数是一个正则对象，那么可以使用第二个参数指定修饰符。而且，返回的正则表达式会忽略原有的正则表达式的修饰符，只使用新指定的修饰符。

```javascript
new RegExp(/abc/ig, 'i').flags
// "i"
```



## 字符串的正则方法

字符串对象共有 4 个方法，可以使用正则表达式：`match()`、`replace()`、`search()`和`split()`。

ES6在语言内部全部调用`RegExp`的实例方法，从而做到所有与正则相关的方法，全都定义在`RegExp`对象上。

```javascript
String.prototype.match 调用 RegExp.prototype[Symbol.match]
String.prototype.replace 调用 RegExp.prototype[Symbol.replace]
String.prototype.search 调用 RegExp.prototype[Symbol.search]
String.prototype.split 调用 RegExp.prototype[Symbol.split]
```

## U修饰符

ES6 对正则表达式添加了`u`修饰符，含义为“Unicode 模式”，用来正确处理大于`\uFFFF`的 Unicode 字符。也就是说，会正确处理四个字节的 UTF-16 编码。

```javascript
/^\uD83D/u.test('\uD83D\uDC2A') // false
/^\uD83D/.test('\uD83D\uDC2A') // true
```

## RegExp.prototype.unicode 属性

正则实例对象新增`unicode`属性，表示是否设置了`u`修饰符。

## y修饰符

ES6 还为正则表达式添加了`y`修饰符，叫做“粘连”（sticky）修饰符。

与`g`修饰符类似，也是全局匹配，后一次匹配都从上一次匹配成功的下一个位置开始。不同之处在于，`g`修饰符只要剩余位置中存在匹配就可，而`y`修饰符确保匹配必须从剩余的第一个位置开始，这也就是“粘连”的涵义。

# 数值扩展

## 二进制和八进制表示法

ES6 提供了二进制和八进制数值的新的写法，分别用前缀`0b`（或`0B`）和`0o`（或`0O`）表示。

从 ES5 开始，在严格模式之中，八进制就不再允许使用前缀`0`表示，ES6 进一步明确，要使用前缀`0o`表示。

如果要将`0b`和`0o`前缀的字符串数值转为十进制，要使用`Number`方法。

```javascript
Number('0b111')  // 7
Number('0o10')  // 8
```

## Number.isFinite(),Number.isNaN()

ES6 在`Number`对象上，新提供了`Number.isFinite()`和`Number.isNaN()`两个方法。

`Number.isFinite()`用来检查一个数值是否为有限的（finite），即不是`Infinity`。

如果参数类型不是数值，`Number.isFinite`一律返回`false`。



`Number.isNaN()`用来检查一个值是否为`NaN`。如果参数类型不是`NaN`，`Number.isNaN`一律返回`false`。

```javascript
Number.isNaN(9/NaN) // true
Number.isNaN('true' / 0) // true
Number.isNaN('true' / 'true') // true
```

与传统的全局方法`isFinite()`和`isNaN()`的区别在于，传统方法先调用`Number()`将非数值的值转为数值，再进行判断，而这两个新方法只对数值有效，

## Number.parseInt(),Number.parseFloat()

ES6 将全局方法`parseInt()`和`parseFloat()`，移植到`Number`对象上面，行为完全保持不变。是逐步减少全局性方法，使得语言逐步模块化。

```javascript
Number.parseInt === parseInt // true
Number.parseFloat === parseFloat // true
```

## Number.isInteger() 

`Number.isInteger()`用来判断一个数值是否为整数。

JavaScript 内部，整数和浮点数采用的是同样的储存方法，所以 25 和 25.0 被视为同一个值。

如果参数不是数值，`Number.isInteger`返回`false`。

**注意，由于 JavaScript 采用 IEEE 754 标准，数值存储为64位双精度格式，数值精度最多可以达到 53 个二进制位（1 个隐藏位与 52 个有效位）。如果数值的精度超过这个限度，第54位及后面的位就会被丢弃，这种情况下，`Number.isInteger`可能会误判。**

```javascript
Number.isInteger(3.0000000000000002) // true
//小数的精度达到了小数点后16个十进制位，转成二进制位超过了53个二进制位，导致最后的那个2被丢弃了。
```

如果一个数值的绝对值小于`Number.MIN_VALUE`（5E-324），即小于 JavaScript 能够分辨的最小值，会被自动转为 0。这时，`Number.isInteger`也会误判。**如果对数据精度的要求较高，不建议使用`Number.isInteger()`判断一个数值是否为整数。**

```javascript
//5E-325由于值太小，会被自动转为0，因此返回true。
Number.isInteger(5E-324) // false
Number.isInteger(5E-325) // true
```

## Number.EPSILON

`Number`对象上面，新增一个极小的常量`Number.EPSILON`。根据规格，它表示 1 与大于 1 的最小浮点数之间的差。引入一个这么小的量的目的，在于为浮点数计算，设置一个误差范围。我们知道浮点数计算是不精确的。

## 安全整数和Number.isSafeInteger()

JavaScript 能够准确表示的整数范围在`-2^53`到`2^53`之间（不含两个端点），超过这个范围，无法精确表示这个值。

ES6 引入了`Number.MAX_SAFE_INTEGER`和`Number.MIN_SAFE_INTEGER`这两个常量，用来表示这个范围的上下限。

## Math对象的扩展

ES6 在 Math 对象上新增了 17 个与数学相关的方法。所有这些方法都是静态方法，只能在 Math 对象上调用。

# 函数扩展

## 函数参数的默认值

参数默认值不是传值的，而是每次都重新计算默认值表达式的值。也就是说，参数默认值是惰性求值的。

## 与解构赋值默认值结合使用

## 参数默认值的位置

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