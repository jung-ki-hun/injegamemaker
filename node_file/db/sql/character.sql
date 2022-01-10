CREATE TABLE login_log(
    ll_no SERIAL NOT NULL,
    user_id SERIAL REFERENCES users(user_id),
    log_time TIMESTAMP,
    PRIMARY KEY(ll_no)
);--로그인 기록