const mongoos = require('mongoose')

const bookSchema = mongoos.Schema({
    title: { type: String, required: true, trim:true },  // trim : 공백제거
    author: { type: String, required: true, trim:true },
    sunmmary: { type: String, trim:true },
    genre: { type: String, trim:true },
    release: { type: String, required: true, trim:true },
    ISBN: { type: Number, required: true}
})

const Book = mongoos.model('Book', bookSchema)  // 스키마로부터 생성된 모델 객체
module.exports = Book;