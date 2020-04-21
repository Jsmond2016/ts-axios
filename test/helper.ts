/*
 * @Description: 
 * @Date: 2020-04-21 13:47:18
 * @Author: HJ <jinhuang02@hand-china.com>
 * @Copyright: Copyright (c) 2018, Hand
 */

 export function getAjaxRequest(): Promise<JasmineAjaxRequest> {
   return new Promise(function(resolve) {
     setTimeout(() => {
       // 使用 jasmine 伪造的 ajax-xhr 对象
       return resolve(jasmine.Ajax.requests.mostRecent())
     }, 0)
   })
 } 