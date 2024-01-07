const express = require('express');
const app =  express();
const path = require('path'); 
const coupenController = require('../../controllers/superadmin/coupens/coupenController');

const auth = require('../../middlewares/superadminMiddleware');
const config = require('../../config/config');
const session = require('express-session');

app.use(
    session({
      secret: config.sessionSecret,
      resave: true,
      saveUninitialized: true,
    })
  );

// super admin coupen
app.post('/addcoupen', coupenController.addCoupen);
app.get('/showcoupen',  coupenController.showCoupen);
app.get('/editcoupen/:id', auth.isLogin , coupenController.editCoupen);
app.post('/updatecoupen/:id', auth.isLogin , coupenController.updateCoupen);
app.delete('/deletecoupen/:id', auth.isLogin , coupenController.deleteCoupen);

module.exports = app;
