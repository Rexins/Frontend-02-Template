    CSS 的顶层样式表由两种规则列表构成：at-rule、qualified-rule

### at-rule

* @charset - CSS 文件所使用的字符编码格式，它如果被使用，必须出现在最前面。这个规则只给出语法解析阶段前使用，并不影响页面上的展示效果。
* @import - 用于引入一个 CSS 文件，除了 @charset 规则不会被引入，@import可以引入另一个文件全部内容。
* @meida - 能够对设备的类型环境进行一些判断，在 media 的区块内，是普通规则(qualified-rule)
* @page - 用于分页媒体访问网页时的表现设置，页面是一种特殊的盒模型结构，除了页面本身，还可以设置它周围盒模型。
* @counter-style - 用于描述定义列表项的表现。
* @key-frames - 用来定义动画关键帧
* @font-face - 用于定义一种字体
* @supports - 检查环境特性
* @namespace - 用于跟 XML 命名空间配合的一个规则，表示内部的 CSS 选择器全都带上特定命名空间。
* @viewport - 用于设置视口的一些特性，不过兼容性不是很好，多数的时候被 HTML 的 meta 代替。
* @color-profile - 是 SVG1.0 引入的 CSS 特性，但是实现状况不大好。
* @document - 还没讨论清楚，被推迟到 CSS4 中
* @font-feature-values

### qualified-rule

* 选择器
  * complex-selector
    * combinator
      * space
      * \>
      * \+
      * \~
      * ||
    * compound-selector
      * type-selector
      * subclass-selector
        * id
        * class
        * attribute
        * pseudo-class
      * pseudo-element
* 声明列表
  * 属性
    * CSS 范围的关键字：initial，unset，inherit，任何属性都可以的关键字。
    * 字符串：比如 content 属性。
    * URL：使用 url() 函数的 URL 值。
    * 整数/实数：比如 flex 属性。
    * 维度：单位的整数/实数，比如 width 属性。
    * 百分比：大部分维度都支持。
    * 颜色：比如 background-color 属性。
    * 图片：比如 background-image 属性。
    * 2D 位置：比如 background-position 属性。
    * 函数：来自函数的值，比如 transform 属性。
  * 值
    * 值的类型
    * 函数
      * calc
      * max
      * min
      * clamp
      * toggle
      * attr

![语法结构分析](./CSSSystemStructure.png)

### 选择器语法

**简单选择器（simple_selector）**

* 全体选择器
* 类型选择器
* class选择器
* id选择器
* 属性选择器
* 伪类选择器
* 伪元素选择器

**复合选择器（selector_group）**

*  <simple_selector><simple_selector><simple_selector>
*  * 或则 div 必须写在前面


**复杂选择器（selector）**

* <selector_group><sp><selector_group>
* <selector_group>">"<selector_group>
* <selector_group>"+"<selector_group>
* <selector_group>"~"<selector_group>
* <selector_group>"||"<selector_group>

### 选择器优先级

```javascript
    const cpcifity = [0,2,1,1] // inline id class typeName
    
    const N = Math.pow(256, 2) // 一般浏览器都采用 65536 作为优先级算法机值
    const S = 0 * Math.pow(N, 3) + 2 * Math.pow(N, 2) + 1 * Math.pow(N, 1) + 1 * Math.pow(N, 0)
```

### 伪类

**链接/行为**

* :any-link（匹配所有超链接）
* :link:visited（link匹配未访问的超链接，visited 匹配访问过的超链接）
* :hover
* :active
* :foces
* :target

**树结构**

* :empty
* :nth-child
* :nth-last-child
* :first-child :last-child :only-child
* of-type系列是 child 的系列的一个语法糖， S:nth-of-type(An+B) 是 :nth-child(|An+B| of S) 的另一种写法

**逻辑形**
* :not伪类
* :where :has

ps: nth-last-child/emtpy/last-child/only-child 其实是破坏了css comput 的回溯性质的，在其实现上是使用了一定的骇客手段做实现，因为实现方式的不同对性能应当会造成一定的影响，所以在可以的情况下使用符合设计初期的选择器进行定义样式。
ps: 尽可能的定义多组 className 去描述元素状态，少用复杂、伪类等选择器进行元素匹配，复杂的选择器最终会造成一定的性能方面的影响。

**其他伪类选择器**
* 国际
  * dir
  * lang
* 音频/视频
  * play
  * pause
* 时序
  * current
  * past
  * future
* 表格
  * nth-col
  * nth-last-col

### 伪元素

* ::before
* ::after
* ::first-line
* ::first-letter
