const express = require('express');
const app = express();
const path  = require('path'); 
const reviewController = require('../../controllers/admin/reviewController');

const auth = require('../../middlewares/adminMiddleware');
const config = require('../../config/config');
const session = require('express-session');
 

app.use(session({
    secret: config.sessionSecret,
    resave: true,
    saveUninitialized: true,
}));

app.get('/loadCreatereview', auth.isLogin, reviewController.loadCreateReview);
app.post('/Createreview', auth.isLogin, reviewController.createReview);
 
app.get('/showReviews', auth.isLogin, reviewController.showReviews);

app.get('/editreview/:id', auth.isLogin, reviewController.editReview);
app.post('/editreview/:id', auth.isLogin, reviewController.updateReview);
app.get('/deletereview/:id', auth.isLogin,reviewController.deleteReview);
module.exports = app;