module.exports = {
  authenticator: (req, res, next) => {
    console.log(req.isAuthenticated())
    if (req.isAuthenticated()) {
      return next()
    }
    req.flash('warning_msg', '請先登入才能使用')
    res.redirect('/users/login')
  }
}