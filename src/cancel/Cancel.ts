/*
 * @Description: 
 * @Date: 2020-04-12 23:07:54
 * @Author: HJ <jinhuang02@hand-china.com>
 * @Copyright: Copyright (c) 2018, Hand
 */

 export default class Cancel{
   message?: string
   constructor(message?: string) {
    this.message = message
   }
 } 

 export function isCancel(val: any): boolean {
   return val instanceof Cancel
 }