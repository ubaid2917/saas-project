const express = require('express');
const app = express();
const path = require('path');
 
const planController = require('../../controllers/superadmin/plans/planController');
const auth = require('../../middlewares/superadminMiddleware');
const config = require('../../config/config');
const session = require('express-session');
const plan = require('../../models/superadmin/PlanModel');

app.use(
    session({
      secret: config.sessionSecret,
      resave: true,
      saveUninitialized: true,
    })
  );

 app.get('/loadplan', auth.isLogin , function(req,res){
  res.render('createplan.ejs')
 })

 app.get('/showplan', auth.isLogin , planController.showplan)
app.post('/createplan',auth.isLogin , planController.createPlan);
app.get('/editPlan/:id',  planController.editPlan);
app.post('/updatePlan/:id',  planController.updatePlan); 


// ^ plan request code 

app.get('/showRequestPlan', auth.isLogin, planController.showRequestPlan);
 

app.get('/edit/:id', planController.editrequestedPlan );
app.post('/edit/:id', planController.updaterequestedPlan );
 
module.exports = app; 