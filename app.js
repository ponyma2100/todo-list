const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser') // 引用body-parser
const methodOverride = require('method-override')

const routes = require('./routes') //引用路由器
require('./config/mongoose')
const app = express()

const todo = require('./models/todo')
const port = 3000

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