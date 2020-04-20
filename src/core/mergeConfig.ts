/*
 * @Description: 合并配置
 * @Date: 2020-04-12 15:22:01
 * @Author: HJ <jinhuang02@hand-china.com>
 * @Copyright: Copyright (c) 2018, Hand
 */

import { AxiosRequestConfig } from '../types';
import { isPlainObject, deepMerge } from '../helpers/util';


const strats = Object.create(null)

/**
 * 默认合并策略函数
 *
 * @param {*} val1
 * @param {*} val2
 * @returns {*} any
 */
function defaultStrat(val1: any, val2: any): any {
  return typeof val2 !== 'undefined' ? val2 : val1
}


/**
 * 合并策略函数，只取 配置2
 *
 * @param {*} val1
 * @param {*} val2
 * @returns {*}
 */
function fromVal2Strat(val1: any, val2: any): any {
  if (typeof val2 !== 'undefined') {
    return val2
  }
}


const stratKeysFromVal2 = ['url', 'params', 'data']
stratKeysFromVal2.forEach(key => {
  strats[key] = fromVal2Strat
})


/**
 *  复杂合并策略，传入的参数可能为一个对象
 *
 * @param {*} val1
 * @param {*} val2
 */
function deepMergeStrat(val1: any, val2: any): any {
  if (isPlainObject(val2)) {
    return deepMerge(val1, val2)
  } else if (typeof val2 !== 'undefined') {
    return val2
  } else if (isPlainObject(val1)) {
    return deepMerge(val1)
  } else if (typeof val1 !== 'undefined') {
    return val1
  }
}

const stratKeysDeepMerge = ['headers', 'auth']

stratKeysDeepMerge.forEach(key => {
  strats[key] = deepMergeStrat
})


 /**
  *  合并配置方法，将传入的 config1 和 config2 配置中的 key 合并
  *  每次 合并 都要判断使用哪一种合并策略
  * @export
  * @param {AxiosRequestConfig} config1
  * @param {AxiosRequestConfig} [config2]
  * @returns
  */
 export default function mergeConfig(config1: AxiosRequestConfig, config2?: AxiosRequestConfig): AxiosRequestConfig  {
   if (!config2) {
     config2 = {}
   }
   const config =Object.create(null)

   for (let key in config2) {
    mergeField(key)
   }

   for (let key in config1) {
     if (!config2[key]) {
       mergeField(key)
     }
   }

   // 使用了设计模式——策略模式
   function mergeField(key: string) {
    const strat = strats[key] || defaultStrat
    config[key] = strat(config1[key], config2![key]) // 虽然上面定义了 config2 为空对象，但是这里因为在函数内，无法判断类型，需要断言为 !
   }

   return config

 }
