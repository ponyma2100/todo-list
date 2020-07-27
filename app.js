const express = require('express')
const mongoose = require('mongoose') // 載入mongoose
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser') // 引用body-parser
const methodOverride = require('method-override')
const routes = require('./routes') //引用路由器
const todo = require('./models/todo')
const app = express()
const port = 3000

// set connection to mongedb
mongoose.connect('mongodb://localhost/todo-list', { useNewUrlParser: true, useUnifiedTopology: true })
// 取得資料庫連線狀態
const db = mongoose.connection
// 連線異常
db.on('error', () => {
  console.log('mongodb error!')
})

// 連線成功，由 once 設定的監聽器是一次性的，一旦連線成功，在執行 callback 以後就會解除監聽器。
db.once('open', () => {
  console.log('mongodb connected!')
})
// 新增了一個叫 hbs 的樣板引擎
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
// hbs元件掛載到我們的主程式裡，開始啟用
app.set('view engine', 'hbs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(routes)



app.listen(port, () => {
  console.log(`This Express is listening on http:localhost:${port}`)
})