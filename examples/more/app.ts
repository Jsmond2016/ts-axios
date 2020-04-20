/*
 * @Description: 
 * @Date: 2020-04-13 23:11:04
 * @Author: HJ <jinhuang02@hand-china.com>
 * @Copyright: Copyright (c) 2018, Hand
 */

import axios from '../../src/index'

document.cookie = 'a=b'

// tslint:disable-next-line: no-floating-promises
axios.get('/more/get').then(res => {
  console.log(res)
})

// tslint:disable-next-line: no-floating-promises
axios.post('http://localhost:8088/more/server2', { }, {
  withCredentials: true // 该设置可以让跨域携带 cookie 
}).then(res => {
  console.log(res)
})


// 验证同源
const instance = axios.create({
  xsrfCookieName: 'XSRF-TOKEN-D',
  xsrfHeaderName: 'X-XSRF-TOKEN-D'
})

// tslint:disable-next-line: no-floating-promises
instance.get('/more/get').then(res => {
  console.log('xsrf demo: ', res)
})