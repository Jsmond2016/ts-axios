/*
 * @Description: 处理请求头
 * @Date: 2020-04-05 20:33:11
 * @Author: HJ <jinhuang02@hand-china.com>
 * @Copyright: Copyright (c) 2018, Hand
 */
import { isPlainObject, deepMerge } from './util'
import { Method } from '../types'

// headers name 规范化，避免大小写问题导致错误
function normalizeHeaderName(headers: any, normalizedName: string): void{
  if (!headers) {
    return 
  }

  Object.keys(headers).forEach(name => {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = headers[name]
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

export function parseHeaders(headers: string): any {
  let parsed = Object.create(null)
  if (!headers) {
    return parsed
  }

  headers.split('\r\n').forEach(line => {
    let [key, val] = line.split(':')
    key = key.trim().toLowerCase()
    if (!key) return
    if (val) val = val.trim()
    parsed[key] = val
  })

  return parsed
}




/**
 *  打平 headers 的内部各种属性，都放在最外层，然后删除
 *
 * @export
 * @param {*} headers
 * @param {Method} method
 * @returns {*}
 */
export function flattenHeaders(headers: any, method: Method): any {
  if (!headers) {
    return headers
  }

  headers = deepMerge(headers.common, headers[method], headers)

  const methodsToDelelte = ['delete', 'get', 'head', 'options', 'post', 'put', 'patch', 'common']

  methodsToDelelte.forEach(method => {
    delete headers[method]
  })

  return headers
}