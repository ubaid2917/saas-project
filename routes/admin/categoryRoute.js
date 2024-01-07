const express = require('express');
const app = express();
const path = require('path');
const multer = require('multer'); 
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

const storage = multer.diskStorage({
    destination:function(req,file,cb){
     cb(null, path.join(__dirname, '../../public/images'))
    },
    filename:function(req,file,cb){
        const name = Date.now() + '-' + file.originalname;
        cb(null, name);
    }  
})
const upload = multer({storage: storage}); 

const categoryController = require('../../controllers/admin/categoryController');

app.post('/addcategory', upload.fields([
    {name: 'image'},
    {name: 'icon'},

]), categoryController.addCategory);  

app.get('/showcategory', auth.isLogin , categoryController.showCategory);
// edit and update category
app.get('/editcategory/:id', auth.isLogin , categoryController.editCategory);
app.post('/updatecategory/:id',auth.isLogin , categoryController.updateCategory);

// delete category 
app.get('/deletecategory/:id', auth.isLogin , categoryController.deleteCategory);

module.exports = app; 