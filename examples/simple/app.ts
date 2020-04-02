/*
 * @Description: 
 * @Date: 2020-04-02 16:53:41
 * @Author: HJ <jinhuang02@hand-china.com>
 * @Copyright: Copyright (c) 2018, Hand
 */
import axios from '../../src/index'

axios({
  method: 'get',
  url: '/simple/get',
  params: {
    a: 1,
    b: 2
  }
})