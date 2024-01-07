const express = require('express');
const app = express();
const path = require('path');

const shippingController = require('../../controllers/admin/shippingController');
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


app.post('/shipping',   shippingController.createShipping);
// show shipping  
app.get('/showShipping', auth.isLogin, shippingController.showShipping); 

// edit and update shipping
app.get('/editShipping/:id', auth.isLogin, shippingController.editShipping);
app.post('/editShipping/:id', auth.isLogin, shippingController.updateShipping);

// delete shipping
app.get('/deleteShipping/:id', auth.isLogin,  shippingController.deleteShipping);
  

app.post('/createAtribute', shippingController.createAttribute);
module.exports =  app;