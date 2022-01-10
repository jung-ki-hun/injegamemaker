require("dotenv").config();
const config = {
    app: {
        host: process.env.T3_HOST || '192.168.219.107',
        port: process.env.T_PORT || '4000',
        key: process.env.SECRET_KEY || '!%@^^!&#$',
        ckey: process.env.CRYPTO_KEY ||'!@!#!@%&^YSDJFS!@$!',
        carl: process.env.CRYPTO_ARL || 'aes-256-cbc'
    },
    pgdb: {
        host: process.env.DB_IP || "127.0.0.1",
        port: process.env.DB_PORT || "5432",
        user: process.env.DB_ID || "postgres",
        password: process.env.DB_PW || "rlgns123",
        database : process.env.DB_NAME || "projectb"
    },
    err:{
        ERR_IP_NOT_COUNTRY:{
            status: 401,
            message: "The country is inaccessible"
        },
        ERR_DB_DONT_SAVE:{
            status: 200,
            message: "DB inquiry failed"
        },
        ERR_DB_EMPTY_DATA:{
            status: 0,//false
            message: "DB data empty"
        },
        ERR_UESR_NOT_ACCREDIT:{
            status: 403,
            message: "I can't find the user."
        }
    }    
}
module.exports = config;
