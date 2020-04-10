/*
 * @Description: 
 * @Date: 2020-04-02 21:03:08
 * @Author: HJ <jinhuang02@hand-china.com>
 * @Copyright: Copyright (c) 2018, Hand
 */


import { isPlainObject } from './util'

export function transformRequest (data: any): any {
  if (isPlainObject(data)) {
    return JSON.stringify(data)
  }
  return data
}

// 当相应数据为字符串时，转换成 json 对象
export function transformResponse (data: any): any {
  if (typeof data === 'string') {
    try {
      // 将 data 转换成 json 对象
      data = JSON.parse(data)
    } catch (e) {
      // 表示响应数据不是字符串
      console.log('响应数据不是字符串')
    }
  }
  return data
}

