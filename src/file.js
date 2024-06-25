import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

//获取upload/name.txt路径
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
console.log(__dirname)
const filePath = path.join(__dirname, "../upload/name.txt")
console.log(filePath)

// nodejs回调函数特点
// 所有回调函数第一个参数一定是err，真是的回调数据放在后面
// fs.open(filePath, (err, fd) => {
//   if (err) {
//     console.log(err)
//     return
//   }
//   fs.read(3, (er, bufferLength, buffer) => {
//     if (err) {
//       console.log(err)
//       return
//     }
//     console.log(buffer.toString())
//   })
// })

//同步读取文件，可能会造成线程阻塞
const fd = fs.openSync(filePath, 'r')
const buf = Buffer.allocUnsafe(100)
//对象的浅拷贝
const bufSize = fs.readSync(fd, buf)
console.log(bufSize)
console.log(buf)

