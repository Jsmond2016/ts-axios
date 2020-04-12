/*
 * @Description: 
 * @Date: 2020-04-02 16:53:41
 * @Author: HJ <jinhuang02@hand-china.com>
 * @Copyright: Copyright (c) 2018, Hand
 */
import axios, { AxiosTransformer } from '../../src/index'
import qs from 'qs'


// 合并配置-测试
// axios.defaults.headers.common['test2'] = 123

// tslint:disable-next-line: no-floating-promises
// axios({
//   url: '/config/post',
//   method: 'post',
//   data: qs.stringify({
//     a: 1
//   }),
//   headers: {
//     test: '321'
//   }
// }).then((res) => {
//   console.log(res.data)
// })


// 请求和响应配置化-测试
// tslint:disable-next-line: no-floating-promises
// axios({
//   transformRequest: [
//     (function(data) {
//       return qs.stringify(data)
//     }),
//     ...(axios.defaults.transformRequest as AxiosTransformer[])
//   ],
//   transformResponse: [
//     ...(axios.defaults.transformResponse as AxiosTransformer[]),
//     function(data) {
//       if (typeof data === 'object') {
//         data.b = 2
//       }
//       return data
//     }
//   ],
//   url: '/config/post',
//   method: 'post',
//   data: {
//     a: 1
//   }
// }).then((res) => {
//   console.log(res.data)
// })


// 拓展静态接口测试
const instance = axios.create({
  transformRequest: [(function(data) {
    return qs.stringify(data)
  }), ...(axios.defaults.transformRequest as AxiosTransformer[])],
  transformResponse: [...(axios.defaults.transformResponse as AxiosTransformer[]), function(data) {
    if (typeof data === 'object') {
      data.b = 2
    }
    return data
  }]
})

// tslint:disable-next-line: no-floating-promises
instance({
  url: '/config/post',
  method: 'post',
  data: {
    a: 1
  }
}).then((res) => {
  console.log(res.data)
})