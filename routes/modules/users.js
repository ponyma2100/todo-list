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
  User.findOne({ name }).then(user => {
    if (user) {
      console.log('User already exist')
      res.render('register', {
        name,
        email,
        password,
        confirmPassword
      })
    } else {
      return User.create({
        name,
        email,
        password
      })
        .then(() => res.redirect('/'))
        .catch(error => console.log(error))
    }
  })
})


router.get('/logout', (req, res) => {
  req.logout() // Passport.js 提供的函式，會幫你清除 session
  res.redirect('/users/login')
})

module.exports = router