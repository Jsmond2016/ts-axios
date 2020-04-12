/*
 * @Description: 
 * @Date: 2020-04-12 21:05:49
 * @Author: HJ <jinhuang02@hand-china.com>
 * @Copyright: Copyright (c) 2018, Hand
 */

import { CancelExcecutor, CancelTokenSource, Canceler } from '../types'
import Cancel from './Cancel'


interface ResolvePromise {
  (reason?: Cancel): void
}


 export default class CancelToken {
   promise: Promise<Cancel>
   reason?: Cancel

   constructor(executor: CancelExcecutor) {
    let resolvePromise: ResolvePromise
    // 抽离 pending 状态的 promise，实现异步分离
    this.promise =  new Promise<Cancel>(resolve => {
      resolvePromise = resolve
    })

    executor(message => {
      if (this.reason) return
      this.reason = new Cancel(message)
      resolvePromise(this.reason)
    })
  }

  throwIfRequested() {
    if (this.reason) {
      throw this.reason
    }
  }

  static source(): CancelTokenSource{
    let cancel!: Canceler
    // 因为 cancel 上面定义却在函数内赋值，ts 无法判断其是否有值，实际上我们是知道其肯定有值的，所以加 !
    const token = new CancelToken(c => {
      cancel = c
    })
    return {
      cancel,
      token
    }
  }
 } 