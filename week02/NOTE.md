
## 第二周笔记

本周学习的是 JavaScript 的最小单元原子(Atom)其包含：
* **WhiteSpaces** 空白符
* **LineTerminator** 换行符
* **Comment** 注释
* **Token** 词
  * **IdentifierName** 标识符名称，典型案例使我们使用的变量名字、关键词
  * **Punctuator** 符号，我们使用运算符的符号
  * **NumericLiteral** 数字直接量，就是我们写的数字
  * **StringLiteral** 字符串直接量，就是我们使用单引号或者双引号引起来的直接量
  * **Template** 字符串模板，用反引号括起来的直接量

单元间的组合对应了运行时的 类型(Types) 和造成了 Execution Context 的内存存储的变化。

Types（基本类型）
    Number、String、Boolean、Null、Undefined、Object、Symbol、Bigint

### Number(IEEE 754 Double Float)

    Float 在计算机领域中 表示浮点数，意思是小数点可以来回浮动，他的思想是将一个数字拆分指数和有效位数，这个数的有效位数是表示浮点数的精度，指数决定了浮点数的表示范围。所以数越大所表示的位置越稀疏。
    IEEE 754 Double Float 表示为 Sign(1) + Exponent(11) + Fraction(52) 64Bit
    Sign 表示 正负，0 表示为正 1 表示为负
    Exponent 表示指数位，它会有个偏移，比 1e10 大的表示为正数反之为负数。
    Fraction 有个隐藏位 表为 1 最小值。

* Grammar
  * DecimalLiteral（十进制）0、0.、.2、1e3
  * BinaryIntegeriteral（二进制）0b111
  * OctalIntegerLiteral（八进制）0o10
  * HexIntegerLiteral（十六进制）0xFF

根据浮点数的定义，非整数的 Number 类型无法用 == (===) 来比较，这也是为什么 JavaScript 中，0.1+0.2不能=3;
在实际上我们应该拿其和最小精度值作比较:
```
  Math.abs(0.1+0.2-0.3) <= Number.EPSILON
```

### String

    字符串由多个 字符（Character）组成，在计算机当中用 码点（Code Point） 来表示字符，在存储当中按编码方式（Encoding）以字节存储。

* 字符集（符号集）
  * ASCII
  * Unicode
  * UCS
  * GB
    * GB2312
    * GBK(GB13000)
    * GB13080
  * ISO-8859
  * BIG5
* UTF（编码方式）
  * UTF8
  * UTF16

符号集规定了符号的二进制码，却没有规定这个二进制码应该如何存储。
UTF-8 就是在互联网上使用最广的一种 Unicode 的实现方式。其他实现方式还包括 UTF-16（字符用两个字节或四个字节表示）和 UTF-32（字符用四个字节表示），不过在互联网上基本不用。重复一遍，这里的关系是，UTF-8 是 Unicode 的实现方式之一。
UTF-8 最大的一个特点，就是它是一种变长的编码方式。它可以使用1~4个字节表示一个符号，根据不同的符号而变化字节长度。
UTF-8 的编码规则很简单，只有二条：

1. 对于单字节的符号，字节第一位为0，后面7位为这个符号Unicode码。因此对于英语字母，UTF-8和ASCII码是相同的。
2. 对于 n 字节的符号（n>1），第一个字节的前 n 位都设为 1，第 n + 1 位设为 0，后面字节前两位律设为 10（所提及的都是控制位），剩下没有提及的二进制码，全部为这个符号的 Unicode 码。

### Null、Undefined
  Null 表示的定位了为空，null 是一个关键字
  Undefined 表示没有定义为空，undefined 为一个变量，在 JavaScript 早期的时候可以对其赋值，所以通常用 void 关键字来表示 undefined

### Symbol
  Symbol 是 ES6 中引入的新类型，它是一切非字符串对象 key 的集合，在 ES6 规范中，整个对象系统被用 Symbol 重构。
  一些标准中提到的 Symbol，可以在全局 Symbol 函数的属性中找到。例如，我们可以使用 Symbol.iterator 来定义 for...of 在对象上的行为。
  这些标准中被称为“众所周知”的Symbol，也构成了语言的一类接口类型。它们允许编写和语言结合更紧密的API。

### Object
  首先从最初认知角度上来定义 Object，他其实有三个特征 唯一标识符(identifier)、状态(state)、行为(behaior)。
  JavaScript对象独有的特色：**对象具有高度的动态性，这是因为 JavaScript 赋予了使用者在运行时为对象填改状态和行为的能力。**

  JavaScript 对于 **基于对象** 的定义：**语言和宿主的基础设施由对象来提供，并且 JavaScript 程序即是一系列互相通讯的对象集合。**

* Class
  * 类是一种常见的描述对象的方式
  * 而 "归类" 和 "分类" 则是两个主要流派
  * 归类属于多继承
  * 分类属于单继承，只有一个从属关系
* Prototype
  * 原型是种更接近人类原始认知的描述对象的方法
  * 并不做严谨的的分类，而是采用"相似"的方式去描述对象

在 JavaScript 运行时，我们只需要关心两个部分

* 原型
  * 定义了属性的访问，对象属性进行访问是贤惠查找对象中是否存在，然后顺着私有属性 [[prototype]] 向上查找，直到其  [[prototype]] 为 null。
  * 顺着[[prototype]]的链式查找则被称为原型链
* 属性(k 值可以为两种类型 String/Symbol，用一组特征来访问属性)
  * 数据属性(Data Property)
    * value(值)、writable(能否被赋值)、enumerable(能否枚举)、configurable(能否被删除或改变特征值)
  * 访问器属性(Accessor Property)
    * get(取属性值被调用)、set(设置属性值被调用)、enumerable、configurable


“基于类”的编程提倡使用一个关注分类和类之间关系开发模型。在这类语言中，总是先有类，再从类去实例化一个对象。类与类之间又可能会形成继承、组合等关系。类又往往与语言的类型系统整合，形成一定编译时的能力。
“基于原型”更为关注一系列对象实例的行为，而后才去关心如何将这些对象，划分到最近的使用方式相似的原型对象，而不是将它们分成类

#### 描述面向对象的语法

* {} . [] Object.defienProperty
* Object.create / Object.setPrototypeOf / Object.getPrototypeOf
* new / class / extends
* new / function / prototype

#### 特殊对象

* Function Object
* Array[[length]]
* Object.prototype[[setPrototypeOf]]
* ...

#### 对象分类
* 宿主对象（host Objects）：由 JavaScript 宿主环境提供对象，它们的行为完全由宿主环境提供。
* 内置对象（Built-in Objects）：由 JavaScript 语言提供对象。
  * 固有对象（Intrinsic Objects）：由标准规定，随着 JavaScript 运行时创建而自动创建的对象实例。
  * 原生对象（Native Objects）：可以由用户通过 Array、RegExp 等内置构造器或者特殊语法创建的对象。
  * 普通对象（Ordinary Objects）：由 {} 语法、Object 构造器或者 Class 关键字定义的类创建的对象，它能够被原型继承。

#### 内置对象·原生对象
我们把 JavaScript 中，能通过语言本身的构造器创建的对象称作原生对象。在 JavaScript 标准中，提供了 30 多个构造器，按不同的运用场景可以分为以下几类。
![原生对象分类](./nativeObjctes.png)

几乎所有原生对象构造器的能力都无法用纯 JavaScript 来实现，它们也无法用 class/extend 语法来继承。
这些构造器本身对象多数使用了私有字段，而这些字段使得原型继承方法无法正常工作，所以，可以认为原生对象是为了特定能力或性能，而设计出来的“特权对象”。


### 标准/规范类型
* **List 和 Record**：用于描述函数传参过程。
* **Set**：主要用于解释字符集等。
* **Completion Record**：用于描述异常、跳出等语句执行过程。
* **Reference**：用来描述对象属性、assign、delete 等。
* **Property Description**：用于描述对象的属性。
* **Lexical Environment 和 Environment Record**：用于描述变量和作用域。
* **Data Block**：用于描述二进制数据。
