// 引用Express與Express路由器
const express = require('express')
const router = express.Router()
const Todo = require('../../models/todo')

router.get('/new', (req, res) => {
  return res.render('new')
})


router.post('/', (req, res) => {
  const name = req.body.name //從req.body 拿出表單裡的name資料
  // console.log(req.body)
  return Todo.create({ name }) //存入資料庫
    .then(() => res.redirect('/')) //新增完成後導回首頁
    .catch(error => console.log(error))
})

router.get('/:id', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)
    .lean()
    .then((todo) => res.render('detail', { todo }))
    .catch(error => console.log(error))
})

router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)
    .lean()
    .then((todo) => res.render('edit', { todo }))
    .catch(error => console.log(error))
})

router.put('/:id', (req, res) => {
  const id = req.params.id // 資料來自客戶端，id 要從網址上用 req.params.id 拿下來
  const { name, isDone } = req.body // 資料來自客戶端，name從表單拿出來
  return Todo.findById(id)
    .then(todo => {
      todo.name = name
      todo.isDone = isDone === 'on'
      return todo.save()
    })
    .then(() => res.redirect(`/todos/${id}`))
    .catch(error => console.log(error))
})

router.delete('/:id', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)
    .then(todo => todo.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.error(error))
})

module.exports = router