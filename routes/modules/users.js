const express = require('express')
const router = express.Router()
const User = require('../../models/user')
const passport = require('passport') // 引用passport

router.get('/login', (req, res) => {
  res.render('login')
})
// 加入 middleware，驗證 request 登入狀態
router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  const errors = []

  if (!name || !email || !password || !confirmPassword) {
    errors.push({ message: '所有欄位都是必填。' })
  }

  if (password !== confirmPassword) {
    errors.push({ message: '密碼與確認密碼不相符！' })
  }

  if (errors.length) {
    return res.render('register', {
      errors,
      name,
      email,
      password,
      confirmPassword
    })
  }

  User.findOne({ email }).then(user => {
    if (user) {
      errors.push({ message: '這個 Email 已經註冊過了。' })
      return res.render('register', {
        errors,
        name,
        email,
        password,
        confirmPassword
      })
    }
    return User.create({
      name,
      email,
      password
    })
      .then(() => res.redirect('/'))
      .catch(error => console.log(error))
  })
})


router.get('/logout', (req, res) => {
  req.logout() // Passport.js 提供的函式，會幫你清除 session
  req.flash('success_msg', '你已成功登出。')
  res.redirect('/users/login')
})

module.exports = router