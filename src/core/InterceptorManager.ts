/*
 * @Description: 拦截器类，内部方法
 * @Date: 2020-04-12 09:55:41
 * @Author: HJ <jinhuang02@hand-china.com>
 * @Copyright: Copyright (c) 2018, Hand
 */
import { ResolvedFn, RejectedFn } from '../types'

interface Interceptor <T>{
  resolved: ResolvedFn<T>
  rejected?: RejectedFn
}

export default class InterceptorManager<T>{
  private interceptors: Array<Interceptor<T> | null>

  constructor() {
    this.interceptors = []
  }


  /**
   * 拦截器使用方式，存放 resolved 和 rejected
   *
   * @param {ResolvedFn<T>} resolved
   * @param {RejectedFn} [rejected]
   * @returns {number}
   * @memberof InterceptorManager
   */
  use(resolved: ResolvedFn<T>, rejected?: RejectedFn): number {
    this.interceptors.push({
      resolved,
      rejected
    })
    return this.interceptors.length - 1
  }


  /**
   * 遍历拦截器
   * 
   * @param {(interceptor: Interceptor<T>) => void} fn
   * @memberof InterceptorManager
   */
  forEach(fn: (interceptor: Interceptor<T>) => void): void {
    this.interceptors.forEach(interceptor => {
      if (interceptor !== null) {
        fn(interceptor)
      }
    })
  }


  
  /**
   * 删除拦截器
   * 注意 -不能改变拦截器数组的长度，只能将内容置为 null，为了类型兼容，需要使用联合类型
   * @param {number} id
   * @memberof InterceptorManager
   */
  eject(id: number): void {
    if (this.interceptors[id]) {
      this.interceptors[id] = null
    }
  }
}