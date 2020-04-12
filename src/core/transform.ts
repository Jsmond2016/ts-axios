/*
 * @Description: 请求和响应默认处理逻辑
 * @Date: 2020-04-12 19:53:21
 * @Author: HJ <jinhuang02@hand-china.com>
 * @Copyright: Copyright (c) 2018, Hand
 */

import { AxiosTransformer } from '../types';



 /**
  * 数据处理，对请求和响应的数据(data)进行处理
  *
  * @export
  * @param {*} data
  * @param {*} headers
  * @param {(AxiosTransformer | AxiosTransformer[])} [fns]
  * @returns {*}
  */
 export function transform(data: any, headers: any, fns?: AxiosTransformer | AxiosTransformer[]): any{
    if (!fns) {
      return data
    }
    if (!Array.isArray(fns)) {
      fns = [fns]
    }

    fns.forEach(fn => {
      data = fn(data, headers)
    })

    return data
 }