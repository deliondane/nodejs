const express = require('express');
const app = express();//express 애플리케이션 인스턴스 등록
//다른 도메인에서 API에 접근할 수 있도록 해주는 미들웨어
const cors = require('cors');

const PORT = 3000; //서버가 실행될 포트
//app.use(cors()) //모든 요청에 대해 CORS를 허용
app.use(cors({origin : "http://127.0.0.1:5500"})); //localhost:5500만 허용하겠다

//body-parser = 요청 본문을 파싱해주는 모듈
app.use(express.json()); //body-parser가 express에 내장되어있으므로 바로 사용 가능

//예시 사용자 데이터(실제 환경에서는 데이터베이스에서 사용자 정보를 가져오는 것이 일반적이다)
const users = [
  {
    username: 'testuser1',
    password: 'password123'
  },
  {
    username: 'testuser2',
    password: 'password1234'
  }
];

//get = 데이터 조회(쿼리 문자열로 데이터를 전송)
//post = 주로 데이터를 서버에 전송하거나 새로운 리소스를 생성하는데 사용
//(요청 본문에 데이터를 포함하여 전송 - 예)JSON형식으로 데이터를 보낼 수 있다.)

//로그인 엔드포인트
app.post('/login', (req, res) => {
  //req.body에서 사용자 이름(user)과 비밀번호(pw)를 추출해서 각각 변수에 할당(객체분해할당)
  const {user, pw} = req.body;
  console.log(user, pw)
  //users 배열에서 입력한 사용자 이름과 일치하는 사용자를 찾아 foundUser변수에 저장
  const foundUser = users.find(u => u.username === user)

  //사용자가 존재하지 않으면 "사용자 이름이 일치하지 안습니다."라는 메시지를 반환
  if(!foundUser){
    return res.json({success: false, message: "사용자 이름이 일치하지 않습니다."})
  }

  //사용자가 존재하면 비밀번호를 비교하여 일치여부에 따라 성공 또는 실패 메시지를 반환
  if(foundUser.password === pw){//비밀번호 비교
    return res.json({success: true, message: "로그인 성공!"})
  }else{//비밀번호가 일치하지 않는 경우
    return res.json({success: false, message: "사용자 비밀번호가 일치하지 않습니다"})
  }
})

//서버를 해당 포트로 실행
app.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT}에서 실행중 입니다.`)
})