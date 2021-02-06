// function log(x, y) {
//     y = y || 'World';
//     console.log(x, y);
//   }
//   log('hello');
//   log('hello','china')
//   log('hello','')

//   function foo(x,x,y=1) {
      
//   }

/**rest 参数 */
// function add(...values) {
//     let sum=0;
//     for (let val of values) {
//         sum+=val;
//     }
//     return sum;
// }
// console.log(add(2,5,3));
//

// arguments变量写法
function sortNumbersArgu() {
    // 转为数组
    return Array.prototype.slice.call(arguments).sort();
}
//rest 参数写法
// const sortNumbers=(...numbers)=>numbers.sort();
// console.log(sortNumbers)

// 改写数组push方法
// function push(array,...items) {
//     items.forEach(function (item) {
//         array.push(item);
//         console.log(item);
//     })
// }
// var a=[];

// console.log(push(a,1,2,3))

// function f(a,...b,c) {
    
// }

// (function (a) {}).length
// (function (...a) {}).length
// (function (a,...b) {}).length

// 3.严格模式
// function doSomething(a,b) {
//     'user strict';
//     //
// }

//4.name属性
// 函数的name属性，返回该函数的函数名。

// 
var f = function () {};

// ES5
f.name // ""

// ES6
f.name // "f"

const bar = function baz() {};

// ES5
bar.name // "baz"

// ES6
bar.name // "baz"


// Function构造函数返回的函数实例，name属性的值为anonymous。

(new Function).name // "anonymous"


// bind返回的函数，name属性值会加上bound前缀。

function foo() {};
foo.bind({}).name // "bound foo"

(function(){}).bind({}).name // "bound "

//5.箭头函数
//由于大括号被解释为代码块，所以如果箭头函数直接返回一个对象，必须在对象外面加上括号，否则会报错。
// let getTempItem=id=>{id:id,name:'temp'};
let getTempItem=id=>({id:id,name:'item'});
let foo=()=>{a:1};
console.log(foo())
//箭头函数只有一行语句，且不需要返回值，可以采用下面的写法，就不用写大括号了。
let fn=()=>void doesNotReturn();

//使用定义
// （1）函数体内的this对象，就是定义时所在的对象，而不是使用时所在的对象。

// （2）不可以当作构造函数，也就是说，不可以使用new命令，否则会抛出一个错误。

// （3）不可以使用arguments对象，该对象在函数体内不存在。如果要用，可以用 rest 参数代替。

// （4）不可以使用yield命令，因此箭头函数不能用作 Generator 函数。


//6.尾调用优化
//ES6 的尾调用优化只在严格模式下开启，正常模式是无效的。


//函数尾调用
// function f(x){
//     return g(x);
//   }
// 注意，只有不再用到外层函数的内部变量，内层函数的调用帧才会取代外层函数的调用帧，否则就无法进行“尾调用优化”。
// 注意，目前只有 Safari 浏览器支持尾调用优化，Chrome 和 Firefox 都不支持。

//函数尾递归
// 函数调用自身，称为递归。如果尾调用自身，就称为尾递归。对于尾递归来说，由于只存在一个调用帧，所以永远不会发生“栈溢出”错误。



//7.函数参数的尾逗号
// 新的语法允许定义和调用时，尾部直接有一个逗号。这样的规定也使得，函数参数与数组和对象的尾逗号规则，保持一致了。

// function clownsEverywhere(param1,param2,) {
    
// }
// clownsEverywhere(
//     'foo',
//     'bar',
// )
//8.Function.prototype.toString()
// toString()方法返回函数代码本身，以前会省略注释和空格。

// 修改后的toString()方法，明确要求返回一模一样的原始代码。



//9.catch命令的参数省略
// 允许catch语句省略参数。