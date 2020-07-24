/**
 * 小实验：获取 JavaScript 固有对象
 * 
 * 从 JavaScript 标准中可以找到全部的 JavaScript 对象的定义。JavaScript 语言规定了全部对象的属性。
 * 
 * 三个值
 * Infinity、NaN、Undefined
 * 九个函数
 * eval、isFinite、isNaN、parseFloat、parseInt、decodeURI、decodeURIComponent、encodeURI、encodeURIComponent
 * 
 * 一些构造器
 * Array、 Date、 RegExp、 Promise、 Proxy、 Map、 WeakMap、 Set、 WeakSet、 Function、 Boolean、 String、 Number、 Symbol、 Object、 Error、 EvalError、 RangeError、 ReferenceError、 SyntaxError、 TypeError、 URIError、 ArrayBuffer、 SharedArrayBuffer、 DataView、 Typed Array、 Float32Array、 Float64Array、 Int8Array、 Int16Array、 Int32Array、 UInt8Array、 UInt16Array、 UInt32Array、 UInt8ClampedArray。
 * 
 * 四个用于当做命名空间
 * JSON、Math、Reflect、Atomic
 */
var set = new Set();
var objects = [
  eval,
  isFinite,
  isNaN,
  parseFloat,
  parseInt,
  decodeURI,
  decodeURIComponent,
  encodeURI,
  encodeURIComponent,
  Array,
  Date,
  RegExp,
  Promise,
  Proxy,
  Map,
  WeakMap,
  Set,
  WeakSet,
  Function,
  Boolean,
  String,
  Number,
  Symbol,
  Object,
  Error,
  EvalError,
  RangeError,
  ReferenceError,
  SyntaxError,
  TypeError,
  URIError,
  ArrayBuffer,
  SharedArrayBuffer,
  DataView,
  Float32Array,
  Float64Array,
  Int8Array,
  Int16Array,
  Int32Array,
  Uint8Array,
  Uint16Array,
  Uint32Array,
  Uint8ClampedArray,
  Atomics,
  JSON,
  Math,
  Reflect
];
objects.forEach(o => set.add(o));

for (var i = 0; i < objects.length; i++) {
  var o = objects[i]
  for (var p of Reflect.ownKeys(o)) {
    var d = Reflect.getOwnPropertyDescriptor(o, p)
    if ((d.value !== null && typeof d.value === "object") || (typeof d.value === "function"))
      if (!set.has(d.value))
        set.add(d.value), objects.push(d.value);
    if (d.get)
      if (!set.has(d.get))
        set.add(d.get), objects.push(d.get);
    if (d.set)
      if (!set.has(d.set))
        set.add(d.set), objects.push(d.set);
  }
}