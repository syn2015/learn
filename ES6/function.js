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


//5.箭头函数


//6.尾调用优化


//7.函数参数的尾逗号

//8.Function.prototype.toString()
toString()方法返回函数代码本身，以前会省略注释和空格。

修改后的toString()方法，明确要求返回一模一样的原始代码。



//9.catch命令的参数省略
允许catch语句省略参数。