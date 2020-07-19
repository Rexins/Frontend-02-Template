## 学习笔记

### Expression 表达式

> 前两节课讲述的是 JavaScript 的表达式，主要讲述了表达式中的优先级顺序、Left Hand Side & Right Hand Side 的表达式类型、标准类型 Reference 的处理

**第一课总结 Priority Expression 、 Left Hand Side & Right Hand Side 、Reference**
 JavaScript 采用了优先级表达 Expression 的执行顺序，而这种方式是不严谨的，用产生式(BNF) 是个较好的解决方案
 Left Hand Side 表示 左边表达式 Right Hand Side 同理，Right Hand Side 不可能为 Left Hand Side 反过来是可行的，Left Hand Side 可以为 Menber、New、Call Expression。
 Reference 为JavaScript标准属性之一，由两部分Object、可以组成在 delete、assign 场景下会直接采用 Reference 而 加减乘除之类的场景则直接解引用当普通变量使用。

**第二课总结 Type Convertion 、 UnBoxing 、Boxing**
 在表达式中如果类型不匹配，会自动对类型进行个转换。
 UnBoxing（拆箱操作）对象类型转换为基础类型 ToPrimitive, 优先 调用 Symbol.toPrimitive的方法，没有该方法则根据场景调用 valueOf 或 toString
 Boxing（装箱操作）基础类型进行.运算符或者[]属性访问的时候，会直接根据基础类型的所属构造函数进行临时封装，然后调用读取属性

### Statement 语句

Statement 中涉及的语法(Grammer)有 简单语句、复合语句，在运行时(Runtime)中有 Completion Record、Lexical Environment的概念

**第三课总结 Completion Record**
Completion Record 是语句的完成记录，用来做返回数据、退出语句、跳过语句等记录作用，它由三个类型来记录该语句的完成记录的行为。

* **[[type]]：** normal、break、continue、return、or throw
* **[[value]]：** 基本类型
* **[[target]]：** break、continue label外层语句

Completion Record 的 [[target]] label 是指语句前的标识符+: 中的标识符，用来指定作用与该标识符语句。

**第四课总结 简单、复合语句**
简单语句类型
Expression(表达式语句)、Empty(空语句)、Debugger(调试语句)
Throw(错误抛出)、Continue(跳过当前循环)、Break(退出语句)、Return（返回语句）这四个都是流程控制语句

复合语句类型
Block、If、Switch、Iteration、With、Labbelled、Try
Iteration 包含了 while/do while/for/for in/for of/for await of
在 for 语句中会独立产生 let 独立的作用域，在let应用上。

**第五课总结 声明**
Funciton、Generator、AsyncFunction、AsyncGenerator、Variable、Class、LexicalDeclaration
声明都有预处理机制(pre-process)
其中 Function、Generator、AsyncFunction、AsyncGenerator、VariableDeclaration 都有声明提前的机制
而 Class、LexicalDeclaration 择优声明前调用报错的机制

**第六课总结 宏任务与微任务、事件循环**
宏任务与微任务采用的是 JSC 里边的一个说法。宏任务(Macrotask)是传给 JavaScript 引擎 执行的，微任务(micriotask)是 JavaScript 内部产生的(Promise)。

事件循环(EventLoop)
getCode => execute => wait => getCode ...

**第七课总结 函数调用**
宏任务与微任务会决定我们代码的执行顺序，在同一个任务里还会有函数调用导致任务来来回回的执行，主要是涉及的执行上下文栈(Execution Context Stack)。
Execution Context Stack 里每一个所保存的东西 执行上下文(Execution Context),Execution Context 保存了执行语句中所有所需要的信息。
而当前运行语句所承载的栈顶元素就是 Running Execution Context。
**Execution Context** 所可能含有的因素：

* **code evaluation state** 用于 async 和 generator 函数，保存了代码到哪的信息
* **Function** 有 Function Execution Context 初始化所拥有的的
* **Script or Module** 记录了 Script 或 Module 上下文
* **Generator** Generator 函数创建的执行上下文所拥有的的
* **Realm** 保存我们使用所有内置对象的领域
* **LexicalEnvironment** 执行代码中所需要的环境，保存变量
* **VariableEnvironment** 用 var 声明变量声明到哪

LexicalEnvironment 保存了 this、new.target、super、变量
VariableEnvironment 是历史遗留包袱，仅仅由来处理 var 声明

**Environment Records** 

* **Declarative Environment Records**
  * **Function Environment Records**
  * **Module Environment Records**
* **Global Environment Records**
* **Object Environment Records** 由with产生

**Function - Closure**
闭包由两部分组成 **代码部分** 和 **环境部分**
环境部分有 Object 和 变量序列 组成
