
## 第二周笔记

本周学习的是 JavaScript 的最小单元原子(Atom)其包含了字面量(Literal)、变量(Variable)、关键字(Keywords)、空白符(WhiteSpaces)、换行符(Line Terminator),单元间的组合对应了运行时的 类型(Types) 和造成了 Execution Context 的内存存储的变化。

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

### Object

    首先从最初认知角度上来定义 Object，他其实有三个特征 唯一标识符(identifier)、状态(state)、行为(behaior)。

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
* 属性(k 值可以为两种类型，String/Symbol)
  * 数据属性(Data Property)
    * value、writable、enumerable、configurable
  * 访问器属性(Accessor Property)
    * get、set、enumerable、configurable

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

#### 宿主对象

    宿主对象由宿主环境提供
