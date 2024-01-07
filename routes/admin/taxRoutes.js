const express = require('express');
const app = express();
const path = require('path');
const taxController = require('../../controllers/admin/taxController'); 
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

app.post('/createTax', auth.isLogin, taxController.createTax);


module.exports = app;