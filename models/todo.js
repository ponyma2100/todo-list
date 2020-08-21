// Todo model
const mongoose = require('mongoose')
const Schema = mongoose.Schema
// 把想要的資料結構當成參數傳給 new Schema()
const todoSchema = new Schema({
  name: {
    type: String, //資料型別為字串
    required: true, //必填欄位
  },
  // 屬性取名為 isDone，通常變數名稱用 is，暗示著這個變數的型別為布林值
  isDone: {
    type: Boolean,
    default: false,  // 預設完成狀態為 false
  },
  userId: {
    type: Schema.Types.ObjectId, //定義 userId 這個項目是一個 ObjectId，也就是它會連向另一個資料物件
    ref: 'User', //定義參考對象是 User model
    index: true,
    required: true
  }
})
// 輸出schema，這份 schema 命名為 Todo
module.exports = mongoose.model('Todo', todoSchema)