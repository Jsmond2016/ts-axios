/*
 * @Description: 默认配置相关属性
 * @Date: 2020-04-12 15:04:09
 * @Author: HJ <jinhuang02@hand-china.com>
 * @Copyright: Copyright (c) 2018, Hand
 */

 import { AxiosRequestConfig} from './types'

 const defaults: AxiosRequestConfig = {
   method: 'get',
   timeout: 0,
   headers: {
     common: {
       Accept: 'application/json, text/plain, */*'
     }
   }
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