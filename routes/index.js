// 總路由器
// 引用Express與Express路由器
const express = require('express')
const router = express.Router()
const home = require('./modules/home') // 引入home 模組程式碼
const todos = require('./modules/todos') // 引入 todos 模組程式碼

// 準備引入路由模組
// 將網址結構符合 / 字串的request 導向home模組
router.use('/', home)
// 將網址結構符合 /todos 字串開頭的 request 導向 todos 模組
router.use('/todos', todos)
// 匯出路由器
module.exports = router