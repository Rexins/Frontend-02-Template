## 学习笔记

### 范用语言分类方法

根据复杂类型去做分类
**乔布斯基谱系**：是计算机科学中刻画形式文法表达能力的一个分类谱系，是由诺姆·乔姆斯基于 1956 年提出的。它包括四个层次：

* 非形式语言
  * 中文、英文
* 形式语言(形式化定义，严谨、严格)(乔姆斯基谱系)
  * 无限制文法（确定语言）、上下文相关文法（每个语法和上下文有所关联）、无上下文文法（和上下文无关、放在哪都一个意思）、正则文法（regular）

### 产生式（巴斯克-诺尔范式、BNF） 表示语法结构

****
    产生式在计算机中指 Tiger 编译器将源程序经过词法分析（Lexical Analysis）和语法分析（Syntax Analysis）后得到的一系列符合文法规则（Backus-Naur Form，BNF）的语句
    BNF(Backus-Naur Form)范式，中文名巴科斯范式。是一种用于表示上下文无关文法的语言，上下文无关文法描述了一类形式语言。由 约翰·巴科斯(John Backus) 和 彼得·诺尔(Peter Naur) 在1960年提出，用来描述ALGO60语言的语法。也是首次引入用来描述计算机语言语法的符号集。

* 用尖括号起来的名称来表示语法结构名
* 语法结构分成基础结构和需要用其他语法结构定义的复合结构
  * 基础结构称终结符 Terminal Symbol
  * 复合结构称为非终结符 Nonterminal Symbol
* 引号和中间的字符表示终结符
* 可以有括号
* \* 表示重复多次
* | 表示或
* \+ 表示至少一次

现代的编程语言里并不是贴合乔姆斯谱系定义结构去设置的

加法表达式 BNF 的表现形式：
```
    <MultplicativeExpression>::= <Number> |
        <MultplicativeExpression> "*" <Number> |
        <MultplicativeExpression> "/" <Number>
    <AddtiveExpression>:: = <MultplicativeExpression> |
        <AddtiveExpression> "+" <MultplicativeExpression> |
        <AddtiveExpression> “-” <MultplicativeExpression>
```

### 语言的分类

* 按 形式语言-用途 来分类
  * 数据描述语言（JSON、XML、SQL、CSS）
  * 编程语言（C、CSS、Java、C#、Python、Ruby、Perl、Lisp、T-SQL、Clojure、**Haskell**、JavaScript）
* 按 形式语言-表达方式 来分类
  * 声明式语言（JSON、HTML、XAML、SQL、CSS、LISP、Clojure、Haskell）
  * 命令式语言（C、C++、Java、C#、Pytho、Ruby、Perl、JavaScript）

### 编程语言的性质

**图灵机（Turing machine）**：又称确定型图灵机，是英国数学家艾伦·图灵于 1936 年提出的一种将人的计算行为抽象掉的数学逻辑机，其更抽象的意义为一种计算模型，可以看作等价于任何有限逻辑数学过程的终极强大逻辑机器。
**图灵完备性**：在可计算性理论里，如果一系列操作数据的规则（如指令集、编程语言、细胞自动机）可以用来模拟单带图灵机，那么它是图灵完全的。这个词源于引入图灵机概念的数学家艾伦·图灵。虽然图灵机会受到储存能力的物理限制，图灵完全性通常指“具有无限存储能力的通用物理机器或编程语言”。(直观的理解：所有的可计算的问题都可用来描述的，这样的语言就是具备图灵完备性的)

* 图灵完备性 (编程语言必备的一个条件。经过一代一代的发展逐渐的收敛到了几个固定模式)
  * 命令式——图灵机（所有命令式语言基本是从图灵机理论来的图灵完备性，所以他实现图灵完备的方式要么使用 goto 语句，要么使用 if加wile 语句）
	* goto
	* if和while
  * 声明式——lambda（根函数比较相似）
	* 递归

### 动态与静态

* 类型系统
  * 动态类型系统与静态类型系统: 动态类型系统是指在用户的机器上内存里能够找到的类型，与之相对只在程序员编写时期能够保存下来的类型那么他就是静态类型系统。JavaScript和C++。
  * 强类型与弱类型：类型是否会自动转换
    * String + Number
    * String == Boolean
  * 复合类型
    * 结构体
    * 函数签名
  * 子类型
  * 泛型
    * 逆变/协变

### 一般命令式编程语言的设计方式

* Atom(原子)
  * Identifier(标识符)
  * Literal(直面量)
* Expression(表达式)
  * Atom(原子)
  * Operator(操作符)
  * Punctuator(辅助符号)
* Statement(语法)
  * Expression(表达式)
  * Keyword(关键字)
  * Punctuator(辅助符号)
* Structor(结构化)
  * Function(函数)
  * Class(类)
  * Process(进程)
  * Namespace(命名空间)
  * …
* Program（组织代码层级）
  * Program
  * Module
  * Package
  * Library

总体结构分为五个层级 Atom、Expression、Statement、Structor、Program
    原子（Atom）是一个语言的最小的组成单位，它通常包含着一些关键字、直接量、变量名基本的单位
    表达式（Expression）由原子、操作符、符号组成 JavaScript 有 十多层表达式： 四则运算、按位与、移位运算、比较运算、或运算、非运算
    语句（Statement）由表达式、关键字、标识符、符号一定的结构组合而成。
    有以上三种就可以被称之为语言了
