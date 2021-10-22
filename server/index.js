var express = require('express') // node_modules 내 express 관련 코드를 가져온다
var app = express()
var cors = require('cors')
var logger = require('morgan')
var mongoose = require('mongoose')
var routes = require('./src/routes')

var corsOptions = {
    origin: 'http://localhost:3000', // localhost:3000 주소는 허용
    credentials: true
}

const CONNECT_URL = 'mongodb://localhost:27017/mydbname'
mongoose.connect(CONNECT_URL, { //MongoDB 서버 연결
    useNewUrlParser:true,
    useUnifiedTopology: true
}).then(()=> console.log("mongodb connected..."))
  .catch(e => console.log(`failed to connect mongodb: ${e}`))

app.use(cors(corsOptions)) //CORS 설정
app.use(express.json()) // request body 파싱
app.use(logger('tiny')) // Logger 설정
app.use("/api", routes) //api 라우팅

app.get('/hello', (req,res)=>{
    res.send('hello world!')
})

app.use((req,res,next) => { // 사용자가 요청한 페이지가 없는 경우 에러처리
    res.status(404).send("페이지를 찾을 수 없습니다.")
})

app.use((err,req,res,next) =>{  // 서버 내부 오류 처리
    console.error(err,stack)
    res.status(500).send("서버에 오류가 발생했습니다.")
})

app.listen(5001, () =>{ // 5001 포트로 서버 오픈
    console.log('server is running on port 5001...')
})