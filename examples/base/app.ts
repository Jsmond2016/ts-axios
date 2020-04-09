/*
 * @Description: 
 * @Date: 2020-04-02 17:34:20
 * @Author: HJ <jinhuang02@hand-china.com>
 * @Copyright: Copyright (c) 2018, Hand
 */
import axios from '../../src/index'

// axios({
//   method: 'get',
//   url: '/base/get',
//   params: {
//     foo: ['bar', 'baz']
//   }
// })

// axios({
//   method: 'get',
//   url: '/base/get',
//   params: {
//     foo: {
//       bar: 'baz'
//     }
//   }
// })

// const date = new Date()

// axios({
//   method: 'get',
//   url: '/base/get',
//   params: {
//     date
//   }
// })

// axios({
//   method: 'get',
//   url: '/base/get',
//   params: {
//     foo: '@:$, '
//   }
// })

// axios({
//   method: 'get',
//   url: '/base/get',
//   params: {
//     foo: 'bar',
//     baz: null
//   }
// })

// axios({
//   method: 'get',
//   url: '/base/get#hash',
//   params: {
//     foo: 'bar'
//   }
// })

// axios({
//   method: 'get',
//   url: '/base/get?foo=bar',
//   params: {
//     bar: 'baz'
//   }
// })

// const arr = new Int32Array([21, 34])
// axios({
//   method: 'post',
//   url: '/base/buffer',
//   data: arr,
// })


// axios({
//   method: 'post',
//   url: '/base/post',
//   data: {
//     a: 1,
//     b: 2,
//   }
// })

// axios({
//   method: 'post',
//   url: '/base/post',
//   headers: {
//     'content-type': 'applicaction/json',
//     'Accept': 'application/json, text/plain, */*',
//   },
//   data: {
//     a: 1,
//     b: 2,
//   }
// })

// const paramsString = 'q=URLUTILS.searchParams&topic=api'
// const searchParams = new URLSearchParams(paramsString)
// // URLSearchParams： 参考 https://developer.mozilla.org/zh-CN/docs/Web/API/URLSearchParams

// // 当请求数据是普通对象，且没有配置 headers 的时候，浏览器会自动为其添加 content-type
// axios({
//   method: 'post',
//   url: '/base/post',
//   data: searchParams,
// })

// tslint:disable-next-line: no-floating-promises
axios({
  method: 'post',
  url: '/base/post',
  data: {
    a: 1,
    b: 2,
  },
}).then(res => {
  console.log(res)
})

// tslint:disable-next-line: no-floating-promises
axios({
  method: 'post',
  url: '/base/post',
  responseType: 'json',
  data: {
    a: 3,
    b: 4,
  },
}).then(res => {
  console.log(res)
})

