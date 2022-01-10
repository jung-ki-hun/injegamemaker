const test = (req,res)=>{
    //req test function
    const u = req.body.id;
    return res.join(u);
  }
const index = async (req, res) => {
    // 쿠키에 담아줘야될것
    // 닉네임
    // id
    // jwt
    // 에러처리
    const { token,level,user } = req.user; // req.user은 passport가 보내
    const cookie_d = {
      //id : req.id,
      jwt : token,
      name : user.username,
      level : level
    }//쿠키에 저장
    if (req.user.error) {
      return res.status(500).json(req.user);
    }
    // 로그인 성공 시
    res.cookie('key',cookie_d);
    console.log(cookie_d);
    //res.send(`token :   ${token}`); // 토근 보내주는 구간
    return res.json({ token,cookie_d });
  }//login 