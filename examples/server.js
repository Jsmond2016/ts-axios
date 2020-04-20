/*
 * @Description: 
 * @Date: 2020-04-02 16:48:10
 * @Author: HJ <jinhuang02@hand-china.com>
 * @Copyright: Copyright (c) 2018, Hand
 */

const express = require('express')
const bodyParser = require('body-parser')
const cookieParse = require('cookie-parser')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const WebpackConfig = require('./webpack.config')
const multipart = require('connect-multiparty')
const path = require('path')
const atob = require('atob')

require('./server2')

const app = express()
const compiler = webpack(WebpackConfig)

app.use(webpackHotMiddleware(compiler))
app.use(express.static(__dirname))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParse()) // cookie 读取中间件，使用后方可读取 req.cookies

app.use(webpackDevMiddleware(compiler, {
  publicPath: '/__build__/',
  stats: {
    colors: true,
    chunks: false
  }
}))

// XSRF 攻击防御测试
app.use(express.static(__dirname, {
  setHeaders (res) {
    res.cookie('XSRF-TOKEN-D', Math.random().toString(16).slice(2))
  }
}))

// 上传下载
app.use(multipart({
  uploadDir: path.resolve(__dirname, 'upload-file')
}))


const router = express.Router()


registerSimpleRouter()
registerBaseRouter()
registerErrorRouter()
registerExtendRouter()
registerInterceptorRouter()
registerConfigRouter()
registerCancelRouter()
registerMoreRouter()
uploadAndDownloadRouter()
registerAuthRouter()
registerStatusRouter()


function registerSimpleRouter() {
  router.get('/simple/get', function(req, res) {
    res.json({
      msg: `hello world`
    })
  })
}
function registerBaseRouter() {
  router.get('/base/get', function(req, res) {
    res.json(req.query)
  })
  
  router.post('/base/post', function(req, res) {
    res.json(req.body)
  })
  
  router.post('/base/buffer', function(req, res) {
      let msg = []
      req.on('data', (chunk) => {
        if (chunk) {
          msg.push(chunk)
        }
      })
      req.on('end', () => {
        let buf = Buffer.concat(msg)
        res.json(buf.toJSON())
      })
    })
}

function registerErrorRouter() {
  router.get('/error/get', function(req, res) {
    if (Math.random() > 0.5) {
      res.json({
        msg: `hello world`
      })
    } else {
      res.status(500)
      res.end()
    }
  })

  router.get('/error/timeout', function(req, res) {
    setTimeout(() => {
      res.json({
        msg: `hello world`
      })
    }, 3000)
  })
}

function registerExtendRouter() {
  router.get('/extend/get', function(req, res) {
    res.json({
      msg: 'hello, world'
    })
  })
  router.post('/extend/post', function(req, res) {
    res.json(req.body)
  })
  router.patch('/extend/patch', function(req, res) {
    res.json(req.body)
  })
  router.put('/extend/put', function(req, res) {
    res.json(req.body)
  })
  router.options('/extend/options', function(req, res) {
    res.end()
  })
  router.delete('/extend/delete', function(req, res) {
    res.end()
  })
  router.head('/extend/head', function(req, res) {
    res.end()
  })
  router.get('/extend/user', function(req, res) {
    res.json({
      code: 0,
      message: 'ok',
      result: {
        name: 'jack',
        age:18
      }
    })
  })
}

function registerInterceptorRouter() {
  router.get('/interceptor/get', function(req, res) {
    res.end('hello')
  })
}

function registerConfigRouter() {
  router.post('/config/post', function(req, res) {
    res.json(req.body)
  })
}

function registerCancelRouter() {
  router.get('/cancel/get', function(req, res) {
    setTimeout(() => {
      res.json(req.query)
    }, 1000)
  })

  router.post('/cancel/post', function(req, res) {
    setTimeout(() => {
      res.json(req.body)
    }, 1000)
  })
}

function registerMoreRouter() {
  router.get('/more/get', function (req, res) {
    res.json(req.cookies) // 设置了 cookie-parser 后才可以读取到
  })
}

function uploadAndDownloadRouter() {
  router.post('/more/upload', function(req, res) {
    console.log(req.body, req.files)
    res.end('upload success!')
  })
}

function registerAuthRouter() {
  router.post('/more/post', function(req, res) {
    const auth = req.headers.authorization
    const [type, credentials] = auth.split(' ')
    console.log(atob(credentials))
    const [username, password] = atob(credentials).split(':')
    if (type === 'Basic' && username === 'Yee' && password === '123456') {
      res.json(req.body)
    } else {
      res.end('UnAuthorization')
    }
  })
}

function registerStatusRouter() {
  router.get('/more/304', function(req, res) {
    res.status(304)
    res.end()
  })
}

app.use(router)

const port = process.env.PORT || 8080
module.exports = app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}, Ctrl+C to stop`)
})



