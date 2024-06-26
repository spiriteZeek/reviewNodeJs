import { getAllFiles } from '../database/file/file.js'

const listFile = {
  path: '/img/list',
  handle: async (ctx) => {
    const result = {
      statusCode: 0,
      info: 'ok',
      data: getAllFiles(),
    }
    ctx.res.end(JSON.stringify(result))
  },
}

export { listFile }
