/*
 * @Description: 默认配置相关属性
 * @Date: 2020-04-12 15:04:09
 * @Author: HJ <jinhuang02@hand-china.com>
 * @Copyright: Copyright (c) 2018, Hand
 */

 import { AxiosRequestConfig } from './types'
 import { processHeaders } from './helpers/headers'
 import { transformRequest, transformResponse } from './helpers/data'

 const defaults: AxiosRequestConfig = {
   method: 'get',
   timeout: 0,
   headers: {
     common: {
       Accept: 'application/json, text/plain, */*'
     }
   },
   xsrfCookieName: 'XSRF-TOKEN',
   xsrfHeaderName: 'X-XSRF-TOKEN',

   // 请求数据默认处理逻辑
   transformRequest: [
     function(data: any, headers: any): any {
       processHeaders(headers, data)
       return transformRequest(data)
     }
   ],
   // 响应数据默认处理逻辑
   transformResponse: [
     function(data: any): any {
       return transformResponse(data)
     }
   ]
 }

 // 这些请求是没有携带 data 数据的
 const methodsNoData = ['delete', 'get', 'head', 'options']
 methodsNoData.forEach(method => {
   defaults.headers[method] = {}
 })

 // 这些请求携带 data 数据
 const methodsWithData = ['post', 'put', 'patch']
 methodsWithData.forEach(method => {
   defaults.headers[method] = {
     'Content-Type': 'application/x-www-form-urlencoded'
   }
 })

 export default defaults