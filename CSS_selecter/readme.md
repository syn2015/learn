# 1.CSS选择器

## [Shadow DOM](http://jsrun.net/7HIKp/edit)

```html
<div class="demo">       	
    <p>我是一个普通的<code>&lt;p&gt;</code>元素，我的背景色是？</p>
    <div id="hostElement"></div>
</div>
<script>
// 创建 shadow DOM
var shadow = hostElement.attachShadow({mode: 'open'});
// 给 shadow DOM 添加文字
shadow.innerHTML = '<p>我是由Shadow DOM创建的<code>&lt;p&gt;</code>元素，我的背景色是？</p>';
// 添加CSS，文字背景色变成黑色
shadow.innerHTML += '<style>p { background-color: #333; color: #fff; }</style>';
</script>
```

## [CSS命名空间和SVG颜色控制](http://jsrun.net/dHIKp/edit)

```html
 <div class="demo">
    <p>这是文字：<a href>点击刷新</a></p>
    <p>这是SVG：<svg width="438.529" height="438.528" viewBox="0 0 438.529 438.528" style="width:20px; height:20px;"><a xlink:href><path d="M433.109 23.694c-3.614-3.612-7.898-5.424-12.848-5.424-4.948 0-9.226 1.812-12.847 5.424l-37.113 36.835c-20.365-19.226-43.684-34.123-69.948-44.684C274.091 5.283 247.056.003 219.266.003c-52.344 0-98.022 15.843-137.042 47.536-39.021 31.689-64.715 73.035-77.087 124.048v1.997c0 2.474.903 4.617 2.712 6.423 1.809 1.809 3.949 2.712 6.423 2.712h56.814c4.189 0 7.042-2.19 8.566-6.565 7.993-19.032 13.035-30.166 15.131-33.403 13.322-21.698 31.023-38.734 53.103-51.106 22.082-12.371 45.873-18.559 71.376-18.559 38.261 0 71.473 13.039 99.645 39.115l-39.406 39.397c-3.607 3.617-5.421 7.902-5.421 12.851 0 4.948 1.813 9.231 5.421 12.847 3.621 3.617 7.905 5.424 12.854 5.424h127.906c4.949 0 9.233-1.807 12.848-5.424 3.613-3.616 5.42-7.898 5.42-12.847V36.542c0-4.949-1.796-9.23-5.42-12.848zM422.253 255.813h-54.816c-4.188 0-7.043 2.187-8.562 6.566-7.99 19.034-13.038 30.163-15.129 33.4-13.326 21.693-31.028 38.735-53.102 51.106-22.083 12.375-45.874 18.556-71.378 18.556-18.461 0-36.259-3.423-53.387-10.273-17.13-6.858-32.454-16.567-45.966-29.13l39.115-39.112c3.615-3.613 5.424-7.901 5.424-12.847 0-4.948-1.809-9.236-5.424-12.847-3.617-3.62-7.898-5.431-12.847-5.431H18.274c-4.952 0-9.235 1.811-12.851 5.431C1.807 264.844 0 269.132 0 274.08v127.907c0 4.945 1.807 9.232 5.424 12.847 3.619 3.61 7.902 5.428 12.851 5.428 4.948 0 9.229-1.817 12.847-5.428l36.829-36.833c20.367 19.41 43.542 34.355 69.523 44.823 25.981 10.472 52.866 15.701 80.653 15.701 52.155 0 97.643-15.845 136.471-47.534 38.828-31.688 64.333-73.042 76.52-124.05.191-.38.281-1.047.281-1.995 0-2.478-.907-4.612-2.715-6.427-1.81-1.799-3.953-2.706-6.431-2.706z"/></a></svg></p>
</div>
@namespace "http://www.w3.org/1999/xhtml";
@namespace svg "http://www.w3.org/2000/svg";
svg|a { color: black; fill: currentColor; }
a { color: gray; }
```

## 无效CSS选择器

```css
.example:hover,
.example:active,
.example:focus-within{
	color:red;
}
//IE不识别:focus-within伪类,导致整行失效

/*IE可以识别*/
.example:hover,
.example:active{
	color:red;
}
/*IE浏览器不可识别*/
.example:focus-within{
	color:red;
}
//无效
div,span::whatever{
    background:gray;
}
//私有前缀，有效
div,span::-webkit-whatever{
    background:gray;
}
//-webkit-和:focus-within等可以识别IE浏览器
```

# 2.选择器优先级

0级别：统配选择器、选择符、逻辑组合伪类

```javascript
*号，
选择符：+  >  ~  空格  || 
逻辑组合伪类:   not()  :is()  :where等。伪类不影响优先级，影响优先级的是括号里面的选择器。只有逻辑组合伪类的
```

1级别 标签选择器

2级别 类选择器（.），属性选择器([])  伪类选择器(:)

3级别 ID选择器(#)

4级别 style属性内联

5级别 !important

# 3.CSS优先级

```
//重复选择器本身
.foo .foo{}
//属性选择器
.foo[class]{}
#foo[id]{}
```

# 4.选择器大小写

在]前面加i，表示大小写不敏感

# 5.选择器命名合法性

类名和ID选择器可以有数字开发，需要转译为Unicode值

# 6.选择器最佳实践汇总

## 命名

1. 命名建议使用小写，单词或缩写，专有名词可以拼音
2. 不建议驼峰命名法，留给JS DOM使用，以示区分。
3. 组合命名使用短横线或下划线，或组合使用。或连续短横线或连续下划线，组合数没必要超过五个。
4. 设置统一前缀，强化品牌同时避免样式冲突。

## 选择器类型

1. CSS重置样式，
   - 不适用ID选择器，推荐属性选择器 [id='someId']{}
   - 可以使用标签选择器或属性选择器
2. 基础样式，
   - 全部使用类选择器，没有层级，没有标签
   - HTML需要重命名的问题，可以通过面向属性命名的CSS样式库得到解决
3. 交互变换样式

# 7.后代选择器 



# 8.子代选择器>

选择子选择器的目的是避免冲突，推荐使用后代选择器

1. 状态类名控制，比如.active类名进行状态切换，选择子代选择器可以避免影响后代元素
2. 标签受限。比如li标签重复嵌套。
3. 层级位置和动态判断。
   - :not(body) > .cs-date-panel-x{position:relative;}
   - 当组件容器不是body的子元素的时候取消绝对定位

# 9.相邻兄弟选择器+

1. 文本节点，会被相邻兄弟选择器忽略。

2. 注释节点，会被相邻兄弟选择器忽略。

3. 实现类似:first-child的效果

   - .cs-li + .cs-li {margin-top:1em;}
   - 相邻兄弟只匹配后一个元素，第一个元素会落空。实现了非首列表元素的匹配

4. 配合伪类实现交互

   - ```
     <input><span class="cs-tips">不超过10个字符</span>span>
     ```

   - :focus + .cs-tips{visibility:visible;}

# 10.随后兄弟选择器

相邻兄弟选择器只匹配后面的第一个兄弟元素，随后兄弟选择器匹配后面所有兄弟元素。