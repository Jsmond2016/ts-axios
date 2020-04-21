/*
 * @Description:  定义一个 xhr 请求
 * @Date: 2020-04-02 16:32:57
 * @Author: HJ <jinhuang02@hand-china.com>
 * @Copyright: Copyright (c) 2018, Hand
 */

import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types'
import { parseHeaders } from '../helpers/headers'
import { createError } from '../helpers/error'
import { isURLSameOrigin } from '../helpers/url'
import { isFormData } from '../helpers/util'
import cookie from '../helpers/cookie'

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const {
      data = null,
      url,
      method,
      headers = {},
      responseType,
      timeout,
      cancelToken,
      withCredentials,
      xsrfCookieName,
      xsrfHeaderName,
      onDownloadProgress,
      onUploadProgress,
      auth,
      validateStatus
    } = config

    const request = new XMLHttpRequest()

    request.open(method!.toUpperCase(), url!, true)

    configureRequest()

    addEvents()
    // 处理请求 headers
    processHeaders()

    processCancel()

    request.send(data)

    


    /**
     *  处理响应
     *
     * @param {AxiosResponse} response
     */
    function handleResponse(response: AxiosResponse): void {
      // status 状态码含义参考 https://www.cnblogs.com/lzy666/p/7157897.html
      if (!validateStatus || validateStatus(response.status)) {
        resolve(response)
      }else {
        reject(createError(
          `Request failed with status code ${response.status}`,
          config,
          null,
          request,
          response
        ))
      }
    }


    /**
     *
     *  配置请求
     */
    function configureRequest(): void {
      if (responseType) {
        request.responseType = responseType
      }
  
      if (timeout) {
        request.timeout = timeout
      }
      if (withCredentials) {
        request.withCredentials = withCredentials
      }
    }



    /**
     *
     *  监听请求状态和处理
     */
    function addEvents(): void {
      request.onreadystatechange = function handleLoad() {
        // 0 代表未初始化。 还没有调用 open 方法
        // 1 代表正在加载。 open 方法已被调用，但 send 方法还没有被调用
        // 2 代表已加载完毕。send 已被调用。请求已经开始
        // 3 代表交互中。服务器正在发送响应
        // 4 代表完成。响应发送完毕
        if (request.readyState !== 4) {
          return
        }
  
        if (request.status === 0) {
          return
        }
  
        const responseHeaders = parseHeaders(request.getAllResponseHeaders())
        const responseData = responseType && responseType !== 'text' ? request.response : request.responseText
        const response: AxiosResponse = {
          data: responseData,
          status: request.status,
          statusText: request.statusText,
          headers: responseHeaders,
          config,
          request
        }
        handleResponse(response)
      }
      // 监听请求报错
      request.onerror = function handleError() {
        reject(createError(
          'Network Error',
          config,
          null,
          request
        ))
      }
  
     // 监听请求超时
      request.ontimeout = function handleTimeout() {
        reject(createError(
          `Timeout of ${config.timeout} ms exceeded`,
           config,
          'ECONNABORTED',
           request
        ))
      }
  
      if (onDownloadProgress) {
        request.onprogress = onDownloadProgress
      }
      
      if (onUploadProgress) {
        request.upload.onprogress = onUploadProgress
      }
    }


    /**
     *
     *  处理请求头
     */
    function processHeaders(): void {
      // 如果是上传下载
      if (isFormData(data)) {
        delete headers['Content-Type']
      }

      // 判断是否同源
      if ((withCredentials || isURLSameOrigin(url!)) && xsrfCookieName) {
        const xsrfValue = cookie.read(xsrfCookieName)
        if (xsrfValue && xsrfHeaderName) {
          headers[xsrfHeaderName] = xsrfValue
        }
      }

      // 如果配置了 auth，则加上 Authorization，window.btoa 为 base64 编码
      if (auth) {
        headers['Authorization'] = 'Basic ' + btoa(auth.username + ':' + auth.password)
      }

      Object.keys(headers).forEach((name) => {
        if (data === null && name.toLowerCase() === 'content-type') {
          delete headers[name]
        } else {
          request.setRequestHeader(name, headers[name])
        }
      })
    }



    /**
     *
     *  取消请求
     */
    function processCancel(): void {
      if (cancelToken) {
        // tslint:disable-next-line: no-floating-promises
        cancelToken.promise.then(reason => {
          request.abort()
          reject(reason)
        })
	      .catch(
            /* istanbul ignore next */
            () => {
              // do nothing
            }
          )
      }
    }
  })
}