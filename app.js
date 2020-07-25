const express = require('express')
const mongoose = require('mongoose') // 載入mongoose
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser') // 引用body-parser
const Todo = require('./models/todo') //載入 Todo Model
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

app.get('/', (req, res) => {
  Todo.find() //取出Todo Model的所有資料
    .lean() //把Mongoose的Model物件轉換成乾淨的JavaScript資料陣列
    .then(todos => res.render('index', { todos })) //將資料傳給index樣板
    .catch(error => console.error(error))
})

app.post('/todos', (req, res) => {
  const name = req.body.name //從req.body 拿出表單裡的name資料
  console.log(req.body)
  return Todo.create({ name }) //存入資料庫
    .then(() => res.redirect('/')) //新增完成後導回首頁
    .catch(error => console.log(error))
})


app.get('/todos/new', (req, res) => {
  return res.render('new')
})

app.listen(port, () => {
  console.log(`This Express is listening on http:localhost:${port}`)
})