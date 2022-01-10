const express = require('express');
var app = express.Router();
const path_u = {
    user : require('./user.js'),
    login : require('./login.js')
}
app.group('/',(router)=>{
    router.group('/user',path_u.user);
    router.group('/login',path_u.login);
})
module.exports = app;