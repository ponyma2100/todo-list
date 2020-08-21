const express = require('express')
const exphbs = require('express-handlebars')
const session = require('express-session')
const usePassport = require('./config/passport')
const bodyParser = require('body-parser') // 引用body-parser
const methodOverride = require('method-override')
const flash = require('connect-flash')
const app = express()

const routes = require('./routes') //引用路由器
require('./config/mongoose')
const port = 3000


// 新增了一個叫 hbs 的樣板引擎
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
// hbs元件掛載到我們的主程式裡，開始啟用
app.set('view engine', 'hbs')

app.use(session({
  secret: 'ThisIsMySecret',
  resave: false,
  saveUninitialized: true
}))


app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

usePassport(app) // 呼叫 Passport 函式並傳入 app，這條要寫在路由之前

app.use(flash())

app.use((req, res, next) => {
  console.log(req.user)
  res.locals.isAuthenticated = req.isAuthenticated
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  next()
})
//把使用者資料交接給 res 使用， 要交接給 res，我們才能在前端樣板裡使用這些資訊
//放在 res.locals 裡的資料，所有的 view 都可以存取

app.use(routes)


app.listen(port, () => {
  console.log(`This Express is listening on http:localhost:${port}`)
})