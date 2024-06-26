import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

//1.获取文件
const __filename = fileURLToPath(import.meta.url)

//2.获取当前文件夹
const __dirname = path.dirname(__filename)

//获取数据文件
const database = path.join(__dirname, 'file.json')

//增
function addFile(param) {
  const filesStr = fs.readFileSync(database, { flag: 'r+' })
  const file = JSON.parse(filesStr)
  file.push(param)
  fs.writeFileSync(database, JSON.stringify(file), { flag: 'w+' })
}

//删
// 删除数组特定元素 arr.splice(startIndex, number)
function delFile(fileId) {
  const filesStr = fs.readFileSync(database, { flag: 'r+' })
  const file = JSON.parse(filesStr)
  const fileIndex = file.findIndex((item) => item.uid === fileId)
  if (fileIndex > -1) {
    file.splice(fileIndex, 1)
  }
  console.log(fileIndex)
  fs.writeFileSync(database, JSON.stringify(file), { flag: 'w+' })
}

//改
function editFile(fileId, filename) {
  const fileStr = fs.readFileSync(database, { flag: 'r+' })
  const file = JSON.parse(fileStr)
  const fileIndex = file.findIndex((item) => item.uid === fileId)
  console.log(fileIndex)
  if (fileIndex > -1) {
    file[fileIndex].filename = filename
  }
  fs.writeFileSync(database, JSON.stringify(file), { flag: 'w+' })
}
console.log('start edit')
editFile('1', 'zeek')
console.log('end edit')

//查
//获取所有图片信息
function getAllFiles() {
  const filesStr = fs.readFileSync(database, { flag: 'r+' })
  const files = JSON.parse(filesStr)
  return {
    totalSize: files.length,
    items: files,
  }
}

export { getAllFiles, addFile, editFile, delFile }
