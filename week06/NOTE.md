### 选择器语法

**简单选择器（simple_selector）**

* \*
* div svgla
* .cls
* #id
* [attr=value]
* :hover
* ::before

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

**逻辑形**
* :not伪类
* :where :has

ps: nth-last-child/emtpy/last-child/only-child 其实是破坏了css comput 的回溯性质的，在其实现上是使用了一定的骇客手段做实现，因为实现方式的不同对性能应当会造成一定的影响，所以在可以的情况下使用符合设计初期的选择器进行定义样式。
ps: 尽可能的定义多组className 去描述元素状态，少用复杂、伪类等选择器进行元素匹配，复杂的选择器最终会造成一定的性能方面的影响。

### 伪元素

* ::before
* ::after
* ::first-line
* ::first-letter