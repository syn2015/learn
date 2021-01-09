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

2. 收缩与包裹。代表float,绝对定位，inline-block或table元素。称为shrink-to-fit。css3中的fit-content就是这种表现。

3. 收缩到最小。代表是table-layout为auto的表格中

   [table-layout:auto的表格的一柱擎天现象](http://jsrun.net/URIKp/edit)

   当每一列空间都不够的时候，文字能断就断，但中文是随便断的， 英文单词不能断。称之为preferred minimum width或minimum content width ，或min-content

   超出容器限制。除非有明确的width相关设置，否则上面3种 情况尺寸都不会主动超过父级容器宽度的，但是存在一些特殊情况。例 如，内容很长的连续的英文和数字，或者内联元素被设置了white-space:nowrap。

   [nowrap不换行超出容器限制实例](http://jsrun.net/9RIKp/edit)

   子元素既保持了inline-block元素的收缩特性，又同时让内容宽 度最大，直接无视父级容器的宽度限制。这种现象后来有了专门的属性 值描述，这个属性值叫作max-content。

   

   **结论**

   在CSS世界中，盒子分“内在盒子”和“外在盒子”，显示也分“内部显示”和“外部显示”，同样地，尺寸也分“内部尺寸”和“外部尺寸”。其中“内部尺寸”英文写作“Intrinsic Sizing”，表示尺寸由内部元素决定；还有一类叫作“外部尺寸”，英文写作“Extrinsic Sizing”，宽度由外部元素决定。**默认宽度100%显示， 是“外部尺寸”，其余全部是“内部尺寸”。**

## 外部尺寸与流体特性

margin/border/padding和content内容区域自动分配水平空间的机制

[“外部尺寸”block元素的流动性示意实例](http://jsrun.net/eRIKp/edit)

格式化宽度。格式化宽度仅出现在“绝对定位模型”中，也就 是出现在position属性值为absolute或fixed的元素中。在默认情况 下，绝对定位元素的宽度表现是“包裹性”，宽度由内部尺寸决定，但 是，有一种情况其宽度是由外部尺寸决定的，

对于非替换元素（见本书第4章），当left/top或top/bottom对 立方位的属性值同时存在的时候，元素的宽度表现为“格式化宽度”，其 宽度大小相对于最近的具有定位特性（position属性值不是static） 的祖先元素计算。

此外，和上面的普通流一样，“格式化宽度”具有完全的流体性，也 就是margin、border、 padding和content内容区域同样会自动分配 水平（和垂直）空间。

## 内部尺寸与流体特性

快速判断一个元素使用的是否为“内部尺寸”呢？很简单，假 如这个元素里面没有内容，宽度就是0，那就是应用的“内部尺寸”。

### 表现形式

1. 包裹性
   - 按钮文字越多宽度越宽（内部尺 寸特性），但如果文字足够多，则会在容器的宽度处自动换行（自适应 特性）。[按钮元素“包裹性”示意实例](http://jsrun.net/zRIKp/edit)
   - button标签按钮才会自动换行，input标签按钮，默认 white-space:pre，是不会换行的，需要将pre值重置为默认的 normal。
   - 实现文字少时候居中显示，超过一行时候居左显示[按钮元素“包裹性”示意实例](http://jsrun.net/PRIKp/edit)
   - 除了inline-block元素，浮动元素以及绝对定位元素都具有包裹 性，均有类似的智能宽度行为。
2. 首选最小宽度
   - 所谓“首选最小宽度”，指的是元素最适合的最小宽度。
   - 东亚文字（如中文）最小宽度为每个汉字的宽度
   - 西方文字最小宽度由特定的连续的英文字符单元决定。并不是所有 的英文字符都会组成连续单元，一般会终止于空格（普通空格）、 短横线、问号以及其他非英文字符等。
   - 果想让英文字符和中文一样，每一个字符都用最小宽度单元，可 以试试使用CSS中的**word-break:break-all。**
   - 类似图片这样的替换元素的最小宽度就是该元素内容本身的宽度。利用连续英文单词不换行的特性，[“首选最小宽度”与凹凸效果实例](http://jsrun.net/ERIKp/edit)
3. 最大宽度
   - 最大宽度就是元素可以有的最大宽度。我自己是这么理解的，“最 大宽度”实际等同于“包裹性”元素设置white-space:nowrap声明后的 宽度。如果内部没有块级元素或者块级元素没有设定宽度值，则“最大 宽度”实际上是最大的连续内联盒子的宽度。
   - “连续内联盒子”指的全部都是内联级别的一个或一堆元素，中间 没有任何的换行标签或其他块级元素。
   - 根据经验，大部分需要使用“最大宽度”的场景都可以 通过设置一个“很大宽度”来实现。
   - 一般来讲，实现自定义滚动有两种原理：一种借助原生的滚 动，scrollLeft/scrollTop值变化，它的优点是简单，不足是效果呆 板；另一种是根据内部元素的尺寸和容器的关系，通过修改内部元素的 位置实现滚动效果，优点是效果可以很绽放。[“最大宽度”与iScroll水平滚动实例](http://jsrun.net/sRIKp/edit)

## width值作用的细节

[width, padding, border同时存在的宽度表现](http://jsrun.net/dRIKp/edit)

## CSS流体布局下的宽度分离原则

所谓“宽度分离原则”，就是CSS中的width属性不与影响宽度的 padding/border（有时候包括margin）属性共存

## box-sizing

[文本域textarea的100%自适应父容器宽度。](http://jsrun.net/JRIKp/edit)