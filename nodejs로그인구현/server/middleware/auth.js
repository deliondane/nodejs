//인증처리를 하는 구문
//User.js를 불러오고
const {User} = require("../models/User");

let auth = (req, res, next) => {
  //인증 처리하는 곳

  //client 쿠키에서 토큰을 가져온다.
  let token = req.cookies.x_auth;
  //console.log(token)

  //토큰을 복호화 한 후 유저를 찾는다
  //user통해 findByToken라는 메서드를 호출하여 복호화, 이때 인자로 client의 토큰을 전달한다
  //유저가 있으면 인증 okay
  //유저가 없으면 인증 No
  User.findByToken(token, (err, user) => {
    //err가 있으면 에러를 출력
    if(err) throw err;

    //user가 없으면 isAuth: false로 error: true로 반환
    if(!user) return res.json({isAuth: false, error: true})

    //user와 token정보를 req에 넣어 줍니다.
    req.token = token;
    req.user = user;
    //next()를 호출하여 auth미들웨어를 빠져 나갑니다.
    next();
  });
}

//auth를 객체로 내보내기
module.exports = {auth};