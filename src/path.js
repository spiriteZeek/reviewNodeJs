// 拼接文件路径
// 文件路径本质上（字符串）
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const result = path.join(...['/zeek', 'jet','software.jpg'])
console.log(result)


// 1.当前文件的路径
const __filename = fileURLToPath(import.meta.url)
// 2.当前文件夹的路径
const __dirname = path.dirname(__filename)
const __dirname1 = path.join(__filename, '..')

console.log(__filename)
console.log(__dirname)
console.log(__dirname1)

// 3.进程的启动路径
console.log(process.cwd())
// 改变进程的运行路径
process.chdir(path.join(__dirname))
console.log(process.cwd())
console.log(process.env.path)
console.log(process.argv[2])