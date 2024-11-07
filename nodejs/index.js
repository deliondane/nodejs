const express = require('express')//express모듈을 가져오는 구문
const app = express()//새로운 express앱을 만듬
const port = 3000 //port 경로(port는 자유롭게 변경해도 됨)

//express앱에 get메서드를 연결해서 서버에 요청('/' = root 디렉토리) 
app.get('/', (req, res) => {
  res.send('Hello World!') //Hello World!를 출력
})

//listen메서드로 서버를 실행
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})