# 选择器

**ID选择器**： “#”打头，权重相当高。ID一般指向唯一元素。但是， 在CSS中，ID样式出现在多个不同的元素上并不会只渲染第一个， 而是雨露均沾。但显然不推荐这么做。

**伪类选择器**：一般指前面有个英文冒号（:）的选择器， 如:first-child 或:last-child等。 

**伪元素选择器**：就是有连续两个冒号的选择器，如::firstline::first-letter、::before和::after。

[FireFox mousedown干掉:active实例](http://jsrun.net/aRIKp/edit)

# 第3章 流·元素与基本尺寸

## 块级元素

li元素默认的display值 是list-item，table元素默认的display值是table，但是它们均 是“块级元素”，因为它们都符合块级元素的基本特征，也就是一个水平 流上只能单独显示一个元素，多个块级元素则换行显示。

[block水平元素与清除浮动实例](http://jsrun.net/NRIKp/edit)

## 3.1.2 display:inline-table的盒子是怎样组成的

[inline-table内联表格特性展示](http://jsrun.net/3RIKp/edit)

## 3.2.1 深藏不露的width:auto

### width的默认值是auto

1. 充分利用可用空间。比方说，div p这些元素的宽度默 认是100%于父级容器的。叫做fill-available