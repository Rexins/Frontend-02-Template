**本周任务初步了解浏览器工作流程、状态机、HTTP请求响应内容解析、HTMLDOM树解析**

### 浏览器是如何工作的？

前端工程师了解浏览器工作原理，有助于性能优化、错误排查。

浏览器基础工作流程：

1. 浏览器首先使用 HTTP 协议或者 HTTPS 协议，向服务器请求页面(URL[HTTP] => HTML)；
2. 把请求回来的 HTML 代码经过解析，构成 DOM 树(HTML[parse] => DOM)；
3. 计算 DOM 树上的 CSS 属性(DOM[CSS Computing] => DOM with CSS)；
4. 最后根据 CSS 属性对元素逐个进行渲染，得到内存中的位图（DOM with CSS[layout] => DOM with position）；
5. 一个可选地步骤是将位图进行合成，这会极大增加后续绘制的速度（可选）；
6. 合成之后，再绘制到界面上(DOM with position[render] => Bitmap)；

![页面渲染流程](./browerBaseWork.jpg)

### 有限状态机

`
    有限状态机是用来描述对象行为建模的工具，其作用主要是用来描述对象在它的生命周期内所经历的状态序列，以及如何响应来自外界的各种事件。在计算机科学中，有限状态机被广泛用于建模应用行为、硬件电路系统设计、软件工程，编译器、网络协议、和计算与语言的研究。
`

* 每一个状态都是个机器
  * 在每一个机器里，我们可以做计算、存储、输出...
  * 所有这些机器接收的输入都是一致的
  * 状态机的每一个机器本身没有状态，如果我们用函数来表示，它应该是纯函数
* 每一个机器知道下一个状态
  * 每个机器都有确定的下一个状态(Moore)
  * 每个机器根据输入决定下一个状态(Mealy)

### HTTP解析

计算机网络通讯的七层网络模型 ISO-OSI
HTTP（应用、表示、会话层）、TCP（传输层）、Internet（网络层）、4G/5G/WIFI（数据链路、物理层）

response 格式
`
    HTTP/1.1 200 OK                             //status line
    Content-Type: text/html                     // headers
    Date: Mon, 23 Dec 2019 06:49:19 GMT
    Connection: keep-alive
    Transfer-Encoding: chunked                  // headers

    26                                          // chunked body 起头是个16进制数据
    <html><body>Hello World</body></html>
    0                                           // chunekd body 最后是个0
`
http 是文本传输协议，抛开浏览器的封装的话，我们需要对文本用状态机机根据协议约定格式进行解析，获取 statusline、headers、body等内容。
而body又更具 transfer-encoding 的不同采用不同的解析格式 chunked 是其中的一种。

### HTML解析

用状态机去解析文本获取 DOM 树，


