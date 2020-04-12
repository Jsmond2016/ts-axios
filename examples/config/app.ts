/*
 * @Description: 
 * @Date: 2020-04-02 16:53:41
 * @Author: HJ <jinhuang02@hand-china.com>
 * @Copyright: Copyright (c) 2018, Hand
 */
import axios from '../../src/index'
import qs from 'qs'

axios.defaults.headers.common['test2'] = 123

// tslint:disable-next-line: no-floating-promises
axios({
  url: '/config/post',
  method: 'post',
  data: qs.stringify({
    a: 1
  }),
  headers: {
    test: '321'
  }
}).then((res) => {
  console.log(res.data)
})