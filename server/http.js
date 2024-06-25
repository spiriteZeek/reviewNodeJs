import http from 'node:http'

const router = [
  { path: '/', handle: async (ctx) => ctx.res.end('根目录') },
  {
    path: '/login',
    handle: async (ctx) => {
      console.log('query:' + ctx.query.name + ctx.query.age)
      ctx.res.end(JSON.stringify({ sucess: true }))
    },
  },
]

function urlParser(originUrl) {
  console.log('originUrl:' + originUrl)
  const params = originUrl.split('?')
  const url = params[0]
  const result = {}
  console.log('params.length:' + params.length)
  if (params.length === 2) {
    const p = params[1]
    const parr = p.split('&')

    parr.forEach((q) => {
      const splitedQ = q.split('=')
      result[splitedQ[0]] = splitedQ[1]
    })
  }
  return {
    url: url,
    param: result,
  }
}

const server = http.createServer(async (req, res) => {
  // http请求通过[请求方法+请求url]区分接口功能
  // 如何让不同的url+method组合，路由到不同的处理函数

  const { url, param } = urlParser(req.url)
  res.setHeader('Content-type', 'text/plain;charset=utf-8') //解决服务端乱码
  const routerInstance = router.find((r) => r.path === url)
  console.log(req.url, req.method)
  const context = {
    req: req,
    res: res,
    query: param,
  }
  if (routerInstance) {
    await routerInstance.handle(context)
  }
})

// 本地loopback interface
// localhost 127.0.0.1

const HOST = '0.0.0.0' // 不能乱写，写当前操作系统所拥有的网卡地址
const PORT = 3000 // tcp端口号2个字节表示（0~65535）
// (ip+port)
server.listen(PORT, HOST, () => {
  console.log('启动服务器')
})
