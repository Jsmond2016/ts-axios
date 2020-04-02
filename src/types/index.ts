/*
 * @Description: 
 * @Date: 2020-04-02 16:29:47
 * @Author: HJ <jinhuang02@hand-china.com>
 * @Copyright: Copyright (c) 2018, Hand
 */

export type Method = 'get' | 'GET'
  | 'delete' | 'Delete'
  | 'head' | 'HEAD'
  | 'options' | 'OPTIONS'
  | 'post' | 'POST'
  | 'put' | 'PUT'
  | 'patch' | 'PATCH'


export interface AxiosRequestConfig{
  url: string,
  method?: Method,
  data?: any,
  params?: any,
}