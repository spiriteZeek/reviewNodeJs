// assert实验特性，不稳定，原生
import response from './response.json' assert { type: 'json' }
console.log(response)

const routerItem = {
  path: '/login',
  handle: login,
}

function helper() {
  return JSON.stringify(response)
}

async function login(ctx) {
  console.log(ctx.query)
  ctx.res.end(helper())
}

export default routerItem
