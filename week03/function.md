### 函数的调用方式
在 ES2018 中，函数已经是一个很复杂的体系了，从 Execution Context 体系，到函数的生成调用。
**普通函数：用 function 关键字定义的函数**
```JavaScript
  function foo() {
    // code
  }
```
**箭头函数：用 => 运算符定义的函数**
```JavaScript
  const foo = () => {
    // code
  } 
```
**方法：在 class 中定义的函数**
```JavaScript
  class C {
    foo() {
      // code
    }
  }
```
**生成器函数：用 function*定义的函数**
```JavaScript
  function* foo() {
    // code
  }
```
**类：用 class 定义的类，实际上也是函数**
```JavaScript
  class C {
    constructor() {
      // code
    }
  }
```
**异步函数：普通、箭头、生成器函数加上 async 关键字**
```JavaScript
  async function foo() {
    // code
  }
  const foo = async () => {
    // code
  }
  async function foo*() {

  }
```

ES6 以来，大量加入的新语法极大地方便了我们编程的同时，也增加了很多我们理解的心智负担。要想认识这些函数的执行上下文切换，我们必须要对它们行为上的区别有所了解。

对普通变量而言，这些函数并没有本质区别，都是遵循了 “继承定义时环境” 的规则，它们的一个行为差异在于 this 关键字。

###  this 关键字的行为
this 是 JavaScript 中的一个关键字，它的使用方法类似于一个变量。
this 是 Execution Context 中很重要的一个组成部分。同一个函数的调用方式不同，得到的 this 值也不相同。
普通函数的 this 值由“调用它所使用的引用”决定，其中奥秘在于：我们获取函数的表达式，实际上是获取它的 Reference 引用。
当做一些算法运算（或者其他运行时），Reference 类型会被解引用，即获取真正的值（被引用的内容）来参与运算，而函数调用、delete等操作，都需要用到 Reference 类型中的对象。**调用函数时使用的引用，决定了函数执行的时刻**
生成器函数、异步生成器函数和异步普通函数跟普通函数行为是一致的，异步箭头函数与箭头函数行为是一致的（箭头函数和异步箭头函数this绑定父级执行上下文this）。

### this 关键字的机制
this 在 ES2018 中被纳入 Lexical Environment中，JavaScript 标准定义了[[thisMode]]私有属性。
[[thisMode]]私有属性有三个值：
* **lexical：** 表示从上下文中找this，这对应了箭头函数
* **global：** 表示当this为undefined时，取全局对象，对应了普通函数
* **strict：** 当严格模式开启时使用，this严格按照调用时传入的值，可能为 null 或者 undefined


### 操作 this 的内置函数
Function.prototype.call 和 Function.prototype.apply 可以指定函数调用时传入的 this 值。
两个方法作用是一样的，区别在于传参的方式。
此外，还有 Function.prototype.bind 它可以生成一个绑定过的函数，这个函数的 this 值**固定了参数**。
有趣的是，call、apply、bind用于不接受this的函数类型如箭头、class都不会报错。这时无法实现改变this的能力，但是可以实现传参。