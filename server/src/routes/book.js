const express = require('express')
const BookRouter = express.Router()
const Book = require("../models/Book")

// 전체 도서 목록 조회
BookRouter.get('/', async(req,res) => {  
    const books = await Book.find()
    res.json({status: 200, books})
})

// 특정 도서 조회
BookRouter.get('/:id', (req,res) => {
    Book.findById(req.params.id, (err, book) => {
        if(err) throw err;
        res.json({status:200, book})
    })
})

// 특정 도서 생성
BookRouter.post('/',(req,res)=>{
    Book.findOne({ISBN: req.body.ISBN}, async(err,book)=>{  // 중복 체크
        if(err) throw err;
        if(!book){  //데이터베이스에서 해당 ISBN을 조회하지 못한 경우 
            const newBook = new Book(req.body);
            await newBook.save().then(()=> {
                res.json({status:201, msg: '새로운 도서가 등록되었습니다.', newBook})
            })
        } else{
            const msg = '해당 도서는 이미 등록되어 있습니다.'
            console.log(msg)
            res.json({status:204, msg})
        }
    })
})

// 특정 도서 변경
BookRouter.put('/:id',(req,res)=>{
    Book.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, book)=>{
        if(err) throw err;
        res.json({status:204, msg:`도서 ${req.params.id}의 정보가 변경되었습니다.`})
    })
})

// 특정 도서 삭제
BookRouter.delete('/:id',(req,res)=>{
    Book.findByIdAndDelete(req.params.id,(err,book) => {
        if(err) throw err;
        res.json({status:204,msg:`도서 ${req.params.id}가 삭제되었습니다.`})
    }) 
})


module.exports = BookRouter