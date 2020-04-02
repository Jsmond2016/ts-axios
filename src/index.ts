/*
 * @Description: 编写请求代码
 * @Date: 2020-04-02 16:14:39
 * @Author: HJ <jinhuang02@hand-china.com>
 * @Copyright: Copyright (c) 2018, Hand
 */
import { AxiosRequestConfig } from './types'
import xhr from './xhr'
import { bulidURL } from '../helpers/url'


function axios (config: AxiosRequestConfig): void {
  processConfig(config)
  xhr(config)
}

function processConfig (config: AxiosRequestConfig): void {
  config.url = transformUrl(config)
}

function transformUrl (config: AxiosRequestConfig): string {
  const { url, params } = config
  return bulidURL(url, params)
}


export default axios