CREATE TABLE character_m(
    c_no SERIAL NOT NULL,
    user_id SERIAL REFERENCES users(user_id),
    c_name VARCHAR(100) NOT NULL,
    c_level int NOT NULL,
    log_time TIMESTAMP,
    PRIMARY KEY(c_no)
);--로그인 기록