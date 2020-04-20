/*
 * @Description: 静态方法拓展
 * @Date: 2020-04-20 17:15:35
 * @Author: HJ <jinhuang02@hand-china.com>
 * @Copyright: Copyright (c) 2018, Hand
 */
import axios from '../../src/index'

function getA() {
  return axios.get('/more/A')
}

function getB() {
  return axios.get('/more/B')
}

// tslint:disable-next-line: no-floating-promises
axios.all([getA(), getB()])
  .then(axios.spread(function(resA, resB) {
    console.log(resA.data)
    console.log(resB.data)
  }))

// tslint:disable-next-line: no-floating-promises
axios.all([getA(), getB()])
  .then(([resA, resB]) => {
    console.log(resA.data)
    console.log(resB.data)
  })

const fakeConfig = {
  baseURL: 'https://www.baidu.com/',
  url: '/user/12345',
  params: {
    idClient: 1,
    idTest: 2,
    testString: 'thisIsATest'
  }
}
console.log(axios.getUri(fakeConfig))