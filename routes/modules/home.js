// 管理首頁
// 引用Express與Express路由器
const express = require('express')
const router = express.Router()
// 引用 Todo model
const Todo = require('../../models/todo')
// 定義首頁路由

router.get('/', (req, res) => {
  const userId = req.user._id //變數設定
  Todo.find({ userId }) //取出Todo Model的所有資料；加入查詢條件
    .lean() //把Mongoose的Model物件轉換成乾淨的JavaScript資料陣列
    .sort({ _id: 'asc' })
    .then(todos => res.render('index', { todos })) //將資料傳給index樣板
    .catch(error => console.error(error))
})

module.exports = router