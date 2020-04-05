/*
 * @Description: 
 * @Date: 2020-04-02 21:03:08
 * @Author: HJ <jinhuang02@hand-china.com>
 * @Copyright: Copyright (c) 2018, Hand
 */


import { isPlainObject } from './util'

export function transformRequest (data: any): any {
  if (isPlainObject(data)) {
    return JSON.stringify(data)
  }
  return data
}

