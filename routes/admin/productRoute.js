const express = require('express');
const app = express();
const path = require('path');
const multer = require('multer'); 
const pathController = require('../../controllers/admin/productController');
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
    destination: function(req,file,cb){
        cb(null, path.join(__dirname, '../../public/images'))
        },
        filename: function(req,file,cb){
           const name = Date.now() + '-' + file.originalname;
           cb(null, name);
        }
})

const upload = multer({storage: storage})
 
app.get('/createProduct', auth.isLogin, pathController.loadCreateProduct)

app.post('/createProduct', auth.isLogin ,  upload.fields([
    {name: 'otherDescriptionImage' },
    {name: 'moreInformationImage'},
    {name: 'coverImage'},
    {name: 'subImage'},
]) , pathController.createProduct);


// app.post('/showProduct', pathController.showProduct);

// show product 
app.get('/showProduct', auth.isLogin, pathController.showProduct);

// edit and update product
app.get('/editProduct/:id', auth.isLogin, pathController.editProduct);
app.post('/editProduct/:id', auth.isLogin, pathController.updateProduct);

// delete product
app.get('/deleteProduct/:id', auth.isLogin, pathController.deleteProduct);

// update product images
app.post('/updateProductImages/:id', auth.isLogin, upload.fields([
    { name: 'coverImage' },
    { name: 'subImage' },
    { name: 'otherDescriptionImage' },
    { name: 'moreInformationImage' },
]), pathController.updateProductImages);


module.exports = app;