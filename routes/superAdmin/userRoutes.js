const express = require('express');
const app =  express();
const path = require('path'); 

const auth = require('../../middlewares/superadminMiddleware');
const config = require('../../config/config');
const session = require('express-session'); 
const multer = require('multer');

app.use(
    session({
      secret: config.sessionSecret,
      resave: true,
      saveUninitialized: true,
    })
  );   


  const storage = multer.diskStorage({
    destination: function (req,file,cb){
    cb(null, path.join(__dirname, '../../public/images'))
    },
    filename: function (req,file,cb){ 
      const name = Date.now() + '-' + file.originalname;
     cb(null, name );
    },
  })
 const upload  = multer({storage: storage});


const userController = require('../../controllers/superadmin/users/userController');

// show users  
app.get('/users', userController.showUsers);
app.get('/superadmindashboard', auth.isLogin, userController.superadminDashboard)

// edit adn update user
app.get('/edituser/:id',auth.isLogin ,userController.editUser);
app.post('/updateuser/:id', auth.isLogin , userController.updateUser);

// delete user
app.delete('/deleteuser/:id', auth.isLogin, userController.deleteUser);

//^  profile route  
app.get('/superadminprofile',  auth.isLogin, userController.showProfile);
app.post('/superadminprofile', auth.isLogin,  upload.single('image') , userController.updateProfile);

// Update Password 
app.get('/superadminPassword', auth.isLogin, userController.loadsuperadminpassword);
app.post('/updatepassword',auth.isLogin , userController.updatePassword);  

//& logout 
app.get('/logout', auth.isLogin, userController.logout);
//app.get('/showregistereduser', auth.isLogin, userController.showregisteredUser);
module.exports = app;
