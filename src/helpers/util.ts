/*
 * @Description: 
 * @Date: 2020-04-02 17:25:20
 * @Author: HJ <jinhuang02@hand-china.com>
 * @Copyright: Copyright (c) 2018, Hand
 */
const toString = Object.prototype.toString

export function isDate (val: any): val is Date {
  return toString.call(val) === '[object Date]'
}

// 此对象判断可能为 object 或者 array
// export function isObject (val: any): val is Object {
//   return val !== null && typeof val === 'object'
// }

// 判断只能为 object
export function isPlainObject (val: any): val is Object {
  return toString.call(val) === '[object Object]'
}

