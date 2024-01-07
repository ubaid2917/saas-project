const express = require('express');
const app = express();
const path = require('path');
const adminCoupenController = require('../../controllers/admin/adminCoupenController');
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

//^ coupen routes start here
  app.get('/loadadminCoupen', auth.isLogin , function(req,res)
  {
    res.render('admincoupen.ejs')
  })
app.post('/createAdminCoupen', auth.isLogin , adminCoupenController.createCoupen)

app.get('/showadminCoupen', auth.isLogin, adminCoupenController.showAdminCoupen);

// Correct route definition
// Example route definition

//^ coupen routes end here 


// ~ plan routes start here  
app.get('/showplan', auth.isLogin, adminCoupenController.showPlan);

app.get('/subscribe/:id', auth.isLogin, adminCoupenController.loadsubscribePlan);
app.post('/subscribe/:id', auth.isLogin, adminCoupenController.subscribePlan);


//* plan request start 
app.get('/planrequest/:id', adminCoupenController.loadSendRequest)
app.post('/planrequest/:id', adminCoupenController.sendRequest); 

//* plan request start
// ~ plan routes end here
module.exports = app; 