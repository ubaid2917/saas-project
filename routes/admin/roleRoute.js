const express = require('express');
const app = express(); 
const path = require('path');
const roleController = require('../../controllers/admin/roleController');
 
const auth = require('../../middlewares/adminMiddleware');
const config = require('../../config/config');
const session = require('express-session');

app.use(
    session({
      secret: config.sessionSecret,
      resave: true,
      saveUninitialized: true,
    })
  );
app.post('/addRole', auth.isLogin,   roleController.createRole); 

app.get('/editRole/:id',  auth.isLogin, roleController.editRole);
app.post('/editRole/:id',  auth.isLogin, roleController.updateRole);   

// delete role 
app.get('/deleteRole/:id',  auth.isLogin, roleController.deleteRole);




module.exports = app; 
