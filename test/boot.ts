/*
 * @Description: 运行 npm test 先执行这里的文件
 * @Date: 2020-04-21 10:14:34
 * @Author: HJ <jinhuang02@hand-china.com>
 * @Copyright: Copyright (c) 2018, Hand
 */
const JasmineCore = require('jasmine-core')
// @ts-ignore
global.getJasmineRequireObj = function() {
  return JasmineCore
}
require('jasmine-ajax')