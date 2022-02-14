CREATE TABLE character_m(
    c_no_m SERIAL NOT NULL, -- 관리번호
    user_id SERIAL REFERENCES users(user_id), -- user정보
    c_name VARCHAR(100) NOT NULL, -- 캐릭터 이름
    log_time TIMESTAMP NOT NULL, --캐릭터 접근 시점 기록
    c_no_c Serial REFERENCES character_c(c_no_c),
    PRIMARY KEY(c_no_m)
);--유저가 가지는 캐릭터
CREATE TABLE character_c(
    c_no_c serial NOT NULL,
    c_no_a serial REFERENCES character_c_a(c_no_a), -- 세부설정 테이블
    hp int not NULL, -- 체력
    mp int not NULL, -- 마나
    sp int not null, -- 스테미너
    earth int not NULL, -- 대지
    water int not null, --물 
    fire int not null, --불 
    wind int not null, --바람
    str int not null, -- 힘
    dex int not null, --민첩
    bar int not null, -- 지능
    sto int not null -- 배고픔
    PRIMARY KEY(c_no_c)
); -- 캐릭터 세팅값
CREATE TABLE character_c_a(
    c_no_a serial not null,
    hpr FLOAT not null,
    mpr FLOAT not null,
    spr FLOAT not null,
    earth_a FLOAT not null,
    earth_r FLOAT not null,
    water_a FLOAT not null,
    water_r FLOAT not null,
    fire_a FLOAT not null,
    fire_r FLOAT not null,
    wind_a FLOAT not null,
    wind_r FLOAT not null,
    PRIMARY KEY(c_no_a)
);-- 캐릭터 부가능력치(클라이언트에서 계산할수도 있기때문에.,,)
CREATE TABLE character_i(

); -- 캐릭터 보유 아이템
CREATE TABLE character_i_w(

); -- 캐릭터 착용 아이템