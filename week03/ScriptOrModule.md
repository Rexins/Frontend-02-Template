JavaScript 支持两种源文件 **Script** 和 **Module**，这个区分是自 ES6 后开始，ES6之前只支持 Script 源文件。
Script 可以由浏览器或node 环境引入执行，而 Module 只能在Script中用 import 引入执行。
现在浏览器可以支持用 script 标签引入模块或者脚本，如果要引入模块，必须给 script 标签添加 type="module"。如果引入脚本，则不需要 type。
```javascript
  <script type="module" src="xxxxx.js"></script>
```
### import 声明
import 用来引入模块，用法如下：
* import 'moduleName'; // 引入一个模块
* 带 from 表示引入模块的一部分信息，可以把它们当做本地变量
  * import v from "moduleName";把模块默认导入值放入变量v
  * import {a ax b, modify} from "moduleNmae";引入模块的导出变量，并将 a 用别名 b 引人。
  * import * as x from "moduleName"; 把模块中所有的变量以类似对象属性的方式引入

### export 声明
支撑导出的任务，用法如下
* export 声明（export {a,b,c}）
* export 声明形语句前添加 export 关键字（var、function、class、let、const）
* export default 导出默认值
* export a from 'moduleName' 过渡

ps：需要注意的是 export default 导出的是值，后期修改值本身不会影响后续引入的 script 或 module（引用类型除外），export 导出的是变量一经修改，引入 script 和 module 都会发生改变。

## 函数体
JavaScript 引擎除了执行 Script 和 Module 之外，还可以执行函数。而函数体和跟 script  和 module 有一定的相似之处。
执行函数的行为通常是在 JavaScript 代码执行时，注册宿主环境的某些事件触发的，而执行的过程，就是执行函数体（函数的花括号中间的部分）。

函数体（Function Body）其实也是一个语句的列表。跟脚本和模块比起来，函数体中的语句列表中多了 return 语句可以用。
函数体实际上有四种(区别在于能否使用 await、yield)：
* 普通函数体
* 异步函数体
* 生成器函数体
* 异步生成器函数体

### 预处理、指令序言
这是JavaScript语法全局的机制，这两机制解释了些 JavaScript 的语法现象。不理解预处理机制我们就无法理解 var 等声明类语句的行为，而不理解指令序言，我们就无法解释严格模式。

**预处理**
在代码执行前，会对脚本、模块和函数体中的语句进行预处理。预处理会提前处理var/let/function/const/class这些语句。
* var 声明永远作用于脚本、模块、函数体这个级别，需要注意的是在 with 中使用，var声明仍然会穿透出去
* function 声明和var相似，在if中声明需要注意的是，他会穿透出去但是只声明，在执行阶段才会进行赋值
* class、let、const 赋值前调用会有报错。

**指令序言机制**
脚本和模块都支持一种特别的语法，叫做指令序言（Directive Prologs）。
“use strict”只有在脚本和模块首部才生效。