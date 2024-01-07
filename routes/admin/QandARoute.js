const express = require('express');
const app = express();
const path  = require('path'); 
const QandAController = require('../../controllers/admin/QandAController');

const auth = require('../../middlewares/adminMiddleware');
const config = require('../../config/config');
const session = require('express-session');
 

app.use(session({
    secret: config.sessionSecret,
    resave: true,
    saveUninitialized: true,
}));
 
app.get('/createQandA', auth.isLogin, QandAController.loadQandA);
app.post('/createQandA', auth.isLogin, QandAController.createQandA);

app.get('/showQandA', auth.isLogin, QandAController.showQandA); 

app.get('/replyqanda/:id', auth.isLogin, QandAController.replyQandA);
app.post('/replyqanda/:id', auth.isLogin, QandAController.makereplyQandA); 

app.get('/deleteQandA/:id', auth.isLogin, QandAController.deleteQandA);

module.exports = app;