import { addFile, getAllFiles } from '../database/file/file.js'
import fs from 'node:fs'
import path from 'node:path'
import busboy from 'busboy'
import { randomFillSync } from 'node:crypto'
//获取upload路径
const upload = path.join(process.cwd(), '/upload')

// 这种方式每次使用都要alloc一次
// function random() {
//   const buf = Buffer.alloc(16)
//   return randomFillSync(buf).toString('hex')
// }

// 这种方法使用的是同一个buf，减少alloc次数，只是每次重新给buf赋值
// 使用了闭包的特性
const random = (() => {
  const buf = Buffer.alloc(16)
  return () => randomFillSync(buf).toString('hex')
})()


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

const downloadFile = {
  path: '/download',
  handle: async (ctx) => {
    // res对象是一个可写流
    const filename = ctx.query.file
    const fileReadStream = fs.createReadStream(path.join(upload, filename))
    ctx.res.setHeader('Content-Disposition', `attachment; filename=${filename}`)
    fileReadStream.pipe(ctx.res)
  },
}

const uploadFile = {
  path: '/upload',
  handle: async (ctx) => {
    // 怎么把formdata格式的数据解析出来
    // multipart/form-data
    const bb = busboy({ headers: ctx.req.headers, defParamCharset: 'utf8' })
    const fileName = `oss-${random()}`
    bb.on('file', (name, file, info) => {
      console.log(name)
      console.log(info) 

      //对文件名进行解码

      const date = new Date()
      addFile({
        uid: fileName,
        filename: info.filename,
        fileType: info.mimeType,
        fileSize: "20k",
        fileUrl: `http://127.0.0.1:3000/download?file=${fileName}`,
        fileUpdateTime: `${date.getFullYear()}年${date.getMonth()}月${date.getDay()}日`
      })
      const saveTo = path.join(upload, fileName)
      file.pipe(fs.createWriteStream(saveTo))
    })
    ctx.req.pipe(bb) // 可读流读取的文件是否直接是文件的二进制
    // 获取到用户的文件，并且直接将其保存至upload，同时更新file.json
    bb.on('close', ()=>{
      ctx.res.end(JSON.stringify({
        statusCode: 0,
        info: 'ok',
        data: {
          fileUrl: `http://127.0.0.1:3000/download?file=${fileName}`
        }
      }))
    })
  },
}

export { listFile, downloadFile, uploadFile }
