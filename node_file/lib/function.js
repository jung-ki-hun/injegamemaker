const jkh_key = require('./config');
/********************************
 * ************기본함수 **********
 *********************************/
var isEmpty = (...str) => { //null을 대신해 비어있음을 확인
    for (let i_str of str) {
        if (typeof i_str === "undefined" || i_str === null || i_str === "" )
            return true;
        else
            return false;
    }
}
var isNan = (...num) =>{
    for (let i_str of num) {
        if (typeof i_str == "undefined" || i_str == null || i_str == NaN )
            return true;
        else
            return false;
    }
}
const appRoot = require("app-root-path");//진입점 루트함수
/********************************
 * **********시간 관련함수********
*********************************/
var date_time = () => {
    const date = new Date();
    var str = date;
    return str;
}
var date_ymd = () => {
    const date = new Date();
    var str = `${date.getFullYear()}/${date.getMonth()+1}/${date.getDate()}`;
    return str;
}
var date_local_time = () => {
    let date = new Date();
    const str = `${date.toLocaleTimeString()}`;
    return str;
}//사용자 기준으로 확인
var date_local_time_set = (local) => {
    let date = new Date();
    const str = `${date.toLocaleTimeString(local)}`;
    return str;
}
/********************************
 * ************암호화************
*********************************/
var cipheriv = (password) => {
    var cc = crypto.createCipheriv(jkh_key.app.carl,key,iv);//return -> cipher
    cc.update(password, 'utf-8', 'base64');
    var cipstr = cc.final('base64');
    return cipstr;
}//암호화 함수

var dcipheriv = (password) => {
    var dc = crypto.createDecipheriv(jkh_key.app.carl, key,iv);
    dc.update(password, 'base64', 'utf-8');
    var dcipstr = dc.final('utf-8');
    return dcipstr;
}//복호화 함수

/********************************
 * ***********로그 관리***********
*********************************/
var webhook = require("./jkh_webhook");

var fs = require('fs');
var rfs = require('rotating-file-stream');//로그 하루단위로 절샥
const logstream = rfs.createStream(`access.log`, {
    interval: '1d',
    path: `${appRoot}/log/log` });

/********************************
 * ***********token ***********
*********************************/
const jwt = require('jsonwebtoken');
const createToken =  (user_id)=>{
const token = jwt.sign({user_id: user_id}, jkh_key.app.key, {expiresIn: '1h'});
    return token;
}

/********************************
 * ********** 파일생성  ***********
*********************************/

const file_r = (path,name)=>{ //읽기
    let str = `${path}/${name}.txt`;
    const file = fs.readFile(str,(err,data)=>{
        if(isEmpty(err)){
            console.log("파일 읽기 성공");
            return data;
        }
        else{
            console.log("파일 읽기 실패 : " + err);
            return null;//사용하기전에 isnull체크 필수 
        }
    });
}
const file_w = (path,name,data)=>{ //쓰기
    let str = `${path}/${name}.txt`;
    const file = fs.writeFile(str, data,'utf8',(err)=>{
        if(isEmpty(err)){ //undifind
            console.log("파일 생성 성공");
        }
        else{
            console.log("파일 생성 실패 : " + err);
        }
    });
}//신규 파일이나 파일 전체 갱신후 생성시 사용
const file_a = (path,name,data)=>{
    let str = `${path}/${name}.txt`;
    const file = fs.appendFile(str,data,(err)=>{
        if(isEmpty(err)){ //undifind
            console.log("파일 생성 성공");
        }
        else{
            console.log("파일 생성 실패 : " + err);
        }
    });
}//파일에 데이터 추가용 함수


module.exports = {
    isEmpty,
    isNan,
    date_time,
    date_ymd,
    cipheriv,
    dcipheriv,
    file_r,
    file_w,
    file_a,
    date_local_time,
    date_local_time_set,
    createToken,
    appRoot,
    logstream
}//log save