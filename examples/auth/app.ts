/*
 * @Description: Http 鉴权
 * @Date: 2020-04-20 15:08:53
 * @Author: HJ <jinhuang02@hand-china.com>
 * @Copyright: Copyright (c) 2018, Hand
 */

import axios from '../../src/index'


// tslint:disable-next-line: no-floating-promises
axios.post('/more/post', {
  a: 1
}, {
  auth: {
    username: 'Yee', // 这里改成其他名字进行测试 Unauthorization
    password: '123456'
  }
}).then(res => {
  console.log(res)
})