const db = require('../../config/mongoose')
const Todo = require('../todo') // 載入 todo model

db.once('open', () => {
  for (let i = 0; i < 10; i++) {
    Todo.create({ name: 'name-' + i }) //參數是一包物件 {name:'name-'+i}
  }
  console.log('done')
})