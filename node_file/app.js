import express from express;
import morgan from morgan;
import passport from passport;
import cors from cors;
import any from anyfunction;
const jkh = require('./lib/function');
const app = express();

app.disable('x-powered-by'); // x-powered-by 헤더 비활성화
app.use(cors({
	exposedHeaders: ['Content-Disposition'], // 다운로드 시 파일명 첨부 허용
})); // CORS 해제
app.options('*', cors()); // CORS Pre-Flight 활성화
app.use(express.json());
app.use(express.urlencoded({ extends: true }));
app.use(cookieParser());
app.use(passport.initialize());//passport 실행
app.use(morgan('combined', { stream: jkh_f.logstream }))//로그파일로 관리 함 1일단위


app.listen(jkh.app.port, jkh.app.host, () => {
	let str = `http://${jkh.app.host}:${jkh.app.port}/`;//api 접근 최상위 주소
	console.log(`${jkh_f.date_time()}start server`);

});