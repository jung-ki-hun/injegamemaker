CREATE TABLE item_list(
    il_no serial not null,
    item_type int not null, --무기/방어구/장신구/도구
    item_name VARCHAR(150) not null, -- 이름
    item_part int not null, -- 부위
    item_level int not null, --등급
    item_tier int not null, --티어
    PRIMARY KEY(il_no)
);--item 종류
CREATE TABLE item_option(
    io_no serial not null,
    attack FLOAT not null, --공격력
    hpr FLOAT not null, 
    mpr FLOAT not null,
    spr FLOAT not null,
    earth FLOAT not null,
    water FLOAT not null,
    fire FLOAT not null,
    wind FLOAT not null,
    Defense FLOAT not null, --방어력
    Defense_m FLOAT not null, --마법방어력
    Fatal FLOAT not null, -- 치명확률
    pass_p FLOAT not null, -- 물리관통
    pass_m FLOAT not null, -- 마법관통
    speed_a FLOAT not null, --공속
    speed_mv FLOAT not null, -- 이속
    PRIMARY KEY(io_no)
);--item 옵션