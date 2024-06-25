
import path from 'node:path'
import fs from 'node:fs'
import { fileURLToPath } from 'node:url'
// 1.当前文件路径
const __filename = fileURLToPath(import.meta.url)
// 2.当前文件夹路径
const __dirname = path.dirname(__filename)
// 3.打开文件路径
const uploadPath = path.join(__dirname, '../upload/name.txt')

fs.readFile(uploadPath, (err, buf) => {
  if (err) {
    console.log(err)
    return
  }
  console.log(buf.toString())
})

const fileBuf = fs.read()

