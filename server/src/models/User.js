const mongoos = require('mongoose')
const book = require('./Book')

const bookSchema = mongoos.Schema({
    name: { type: String, required: true, trim:true },  // trim : 공백제거
    age: { type: Number, required: true, trim:true },
    email: { type: String, required: true, trim:true },
    books: { type: [book], required: true, trim:true }
})

const Book = mongoos.model('User', userSchema)  // 스키마로부터 생성된 모델 객체
module.exports = User;