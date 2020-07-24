// Todo model
const mongoose = require('mongoose')
const Schema = mongoose.Schema
// 把想要的資料結構當成參數傳給 new Schema()
const todoSchema = new Schema({
  name: {
    type: String, //資料型別為字串
    required: true //必填欄位
  }
})
// 輸出schema，這份 schema 命名為 Todo
module.exports = mongoose.model('Todo', todoSchema)