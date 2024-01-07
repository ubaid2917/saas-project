const express = require('express');
const app = express();
const path  = require('path');
const userController = require('../../controllers/register/registerController');

const auth = require('../../middlewares/adminMiddleware');
const config = require('../../config/config');
const session = require('express-session');
app.use(express.static('public'));

app.use(
    session({
      secret: config.sessionSecret,
      resave: true,
      saveUninitialized: true,
    })
  );

app.get('/register', (req,res) => {
  res.render('auth/register.ejs')
})
app.post('/register', auth.isLogout,userController.registerUser); 

app.get('/login', auth.isLogout, userController.login);
app.post('/login',auth.isLogout ,userController.loginUser);

// app.get('/userdashboard', auth.isLogin, userController.userDashboard); 


app.get('/forget-password',  auth.isLogout, userController.loadforgetPassword);
app.post('/forget-password', auth.isLogout, userController.forgetPassword);
 
 app.get('/admindashboard', auth.isLogin, function(req,res){
  res.render('admindashboard.ejs' )
 })
app.get('/resetpassword', auth.isLogout, userController.loadResetPassword );
app.post("/resetpassword", userController.resetpassword); 



app.get('/logout',  auth.isLogin, userController.logout);

module.exports = app; 