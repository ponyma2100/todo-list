// 引用Express與Express路由器
const express = require('express')
const router = express.Router()
const Todo = require('../../models/todo')

router.get('/new', (req, res) => {
  return res.render('new')
})


router.post('/', (req, res) => {
  const userId = req.user._id
  const name = req.body.name //從req.body 拿出表單裡的name資料
  // console.log(req.body)
  return Todo.create({ name, userId }) //存入資料庫
    .then(() => res.redirect('/')) //新增完成後導回首頁
    .catch(error => console.log(error))
})

// 改用 findOne 之後，Mongoose 就不會自動幫我們轉換 id 和 _id，所以這裡要寫和資料庫一樣的屬性名稱，也就是 _id
router.get('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Todo.findOne({ _id, userId }) //把原本的 Todo.findById(id) 改成 Todo.findOne({ _id, userId })，才能串接多個條件
    .lean()
    .then((todo) => res.render('detail', { todo }))
    .catch(error => console.log(error))
})

router.get('/:id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Todo.findOne({ _id, userId })
    .lean()
    .then((todo) => res.render('edit', { todo }))
    .catch(error => console.log(error))
})

router.put('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id // 資料來自客戶端，id 要從網址上用 req.params.id 拿下來
  const { name, isDone } = req.body // 資料來自客戶端，name從表單拿出來
  return Todo.findOne({ _id, userId })
    .then(todo => {
      todo.name = name
      todo.isDone = isDone === 'on'
      return todo.save()
    })
    .then(() => res.redirect(`/todos/${_id}`))
    .catch(error => console.log(error))
})

router.delete('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Todo.findOne({ _id, userId })
    .then(todo => todo.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.error(error))
})

module.exports = router