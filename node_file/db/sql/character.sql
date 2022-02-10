CREATE TABLE character_m(
    c_no SERIAL NOT NULL,
    user_id SERIAL REFERENCES users(user_id),
    c_name VARCHAR(100) NOT NULL,
    c_level int NOT NULL,
    log_time TIMESTAMP,
    PRIMARY KEY(c_no)
);--캐릭터 정보
CREATE TABLE character_c(); -- 캐릭터 세부설정들