import './scss/index.scss';

console.log('It\'s alive!!!')

async function start() {
  return await Promise.resolve('async is working')
}

start().then(console.log)
