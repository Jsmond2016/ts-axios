/*
 * @Description: 
 * @Date: 2020-04-10 14:24:45
 * @Author: HJ <jinhuang02@hand-china.com>
 * @Copyright: Copyright (c) 2018, Hand
 */

import { AxiosInstance, AxiosRequestConfig }  from './types'
import Axios from './core/Axios'
import { extend } from './helpers/util'
import defaults from './defaults'

function createInstance(config: AxiosRequestConfig): AxiosInstance {
  const context = new Axios(config)
  // 为保证 this 指向，需要绑定 this 为 Axios 的实例 contexts
  const instance = Axios.prototype.request.bind(context)
  extend(instance, context)
  return instance as AxiosInstance
}

const axios = createInstance(defaults)

export default axios