/*
 * @Description:  定义一个 xhr 请求
 * @Date: 2020-04-02 16:32:57
 * @Author: HJ <jinhuang02@hand-china.com>
 * @Copyright: Copyright (c) 2018, Hand
 */

import { AxiosRequestConfig } from './types';

export default function xhr(config: AxiosRequestConfig): void {
  const { data = null, url, method = 'get' } = config

  const request = new XMLHttpRequest()

  request.open(method.toUpperCase(), url, true)

  request.send(data)
 }