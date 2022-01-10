const passport = require('passport');
const passport_local = require('passport-local');
const jkh_fun = require('./function');
const { pool, Q } = require('../db/db');//db 조회 용
const LocalStrategy = passport_local.Strategy;


//트랜젝션 확보 예정
const index = async (id, pw) => {
     console.log(id, pw);
    var pw_c = jkh_fun.cipheriv(pw);//암호화 진행 //iv 버전으로 수정 필수 !!!!
    console.log(id, pw_c);
    var user;//반환 하는 값
    try {        
        await pool.query('BEGIN');//트랜잭션 시작
        const sql1 = Q`
          SELECT 
            u.username,
            u.user_id
          FROM
            users u, users_level ul
          WHERE     
            u.email = ${id}
            AND
            u.pw = ${pw_c}
          `;//암호화 한 데이터(pw)를 기반으로 검색 진행
        const query1 = await pool.query(sql1);//조회 알고리즘
        console.log(`check type : ${query1.rows[0]}`);   
        if (jkh_fun.isEmpty(query1.rows[0])) {
            console.log('login fail');
            return null;
        }
        else {
            let user_id = query1.rows[0].user_id;//사용자 key 추출
            user = query1.rows[0];
            const sql2 = Q`
            insert 
              into 
                login_log(user_id,log_time) 
              values (${user_id},${jkh_fun.date_time()})`;
            const query2 = await pool.query(sql2);
            if (query2.errors) {
                console.log(query2.errors);
            }
        }
        await pool.query("COMMIT")//저장
        return user;
    }
    catch (err) {
        console.error(err);
        await pool.query('ROLLBACK')//에러시 롤백
    }
}//login 

// Local Strategy
passport.use(
    'user.local',
    new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
            session: false, // 세션 사용안함
            passReqToCallback: false,//req 사용관련 함수
        },
        async (email, password, done) => {
            try {
                //로그인 확인 구현 자리
                const user = await index(email, password);//login 확인 함수 
                if(jkh_fun.isEmpty(user)){ //조회값이 null 값이면 //값이 튄다
                    return done(null,{error: true, message: 'Incorrect email or password'});
                }
                           
                // JWT 토큰 생성 
                console.log("sdfs"+user);
                const token = jkh_fun.createToken(user.user_id);//userid 인자 전달
                const level = user.level_u;
                return done(null, { token,level,user}, {});
                
            } catch (e) {
                // 로그인 확인 중 에러 발생 시
                console.error(e);
                return done(null, { error: true, message: 'Internal Error' }, {});
            }
        },
    ),
);//