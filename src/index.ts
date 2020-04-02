/*
 * @Description: 编写请求代码
 * @Date: 2020-04-02 16:14:39
 * @Author: HJ <jinhuang02@hand-china.com>
 * @Copyright: Copyright (c) 2018, Hand
 */
import { AxiosRequestConfig } from './types'
import xhr from './xhr'


function axios(config: AxiosRequestConfig): void {
  xhr(config)
}

export default axios
