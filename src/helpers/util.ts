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

// 将 from 的内容全部拷贝到 to 中
// 联合类型, 因为是在前面加了 括号，需要使用分号区分
export function extend<T, U>(to: T, from: U): T & U {
  for (const key in from) {
    ;(to as T & U)[key] = from[key] as any
  }

  return to as T & U
}



/**
 *  深度 合并配置，类似深拷贝，这里只考虑参数为对象的情况
 *
 * @export
 * @param {...any[]} objs
 * @returns {*}
 */
export function deepMerge(...objs: any[]): any {
  const result = Object.create(null)

  objs.forEach(obj => {
    if (obj) {
      Object.keys(obj).forEach(key => {
        const val = obj[key]
        // 递归，若值依然是一个对象，则需要再次遍历，直到最后只为一个值
        if (isPlainObject(val)) {
          if (isPlainObject(result[key])) {
            result[key] = deepMerge(result[key], val)
          } else {
            result[key] = deepMerge(val)
          }
        } else {
          result[key] = val
        }
      })
    }
  })

  return result
}
