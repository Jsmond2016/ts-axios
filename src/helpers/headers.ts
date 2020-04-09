/*
 * @Description: 处理请求头
 * @Date: 2020-04-05 20:33:11
 * @Author: HJ <jinhuang02@hand-china.com>
 * @Copyright: Copyright (c) 2018, Hand
 */
import { isPlainObject } from './util'

// headers name 规范化，避免大小写问题导致错误
function normalizeHeaderName(headers: any, normalizedHeaderName: string): void{
  if (!headers) {
    return 
  }

  Object.keys(headers).forEach(name => {
    if (name !== normalizedHeaderName && name.toUpperCase() === normalizedHeaderName.toUpperCase()) {
      headers[normalizedHeaderName] = headers[name]
      delete headers[name]
    }
  })
}


export function processHeaders(headers: any, data: any): any{

  normalizeHeaderName(headers, 'Content-Type')

  if (isPlainObject(data)) {
    if (headers && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json;charset=utf-8'
    }
  }
  return headers
}