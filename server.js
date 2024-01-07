const express = require('express');
const app = express();
const port = process.env.PORT || 3000; 
const path  = require('path');
const ejs  = require('ejs');

const bodyParser = require('body-parser');
const db = require('./db/db');

const staticPath = path.join(__dirname, 'public');
const viewPath = path.join(__dirname, 'views');

app.set('view engine', 'ejs');
app.set('views', viewPath);

app.use(express.static('public'));
// app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// super admin routes
const registerRoutes = require('./routes/register/registerRoutes');
const superAdminUser = require('./routes/superAdmin/userRoutes');
const superAdminCoupens = require('./routes/superAdmin/coupenRoute');
const superAdminPanels = require('./routes/superAdmin/planRoutes');
const superAdminTheme = require('./routes/superAdmin/themeRoute');

app.use('/', registerRoutes); 
app.use('/superadmin/', superAdminUser);
app.use('/superadmin/', superAdminCoupens);
app.use('/superadmin/', superAdminPanels);
app.use('/superadmin/', superAdminTheme);



// admin routes
const adminCategory = require('./routes/admin/categoryRoute');
const adminProduct = require('./routes/admin/productRoute');
const adminTax = require('./routes/admin/taxRoutes');
const adminCoupenRoute = require('./routes/admin/adminCoupenRoute');
const adminShipping = require('./routes/admin/shippingRoute');
const adminRole = require('./routes/admin/roleRoute');
const adminReview = require('./routes/admin/reviewRoute');
const QandA = require('./routes/admin/QandARoute');


app.use('/admin', adminCategory);
app.use('/admin', adminProduct);
app.use('/admin', adminTax);
app.use('/admin', adminCoupenRoute);
app.use('/admin', adminShipping); 
app.use('/admin', adminRole);  
app.use('/admin', adminReview);
app.use('/admin', QandA);


//user routes
// const userRoutes = require('./routes/user/userRoutes');


// app.use('/', userRoutes);


app.listen(port, ()=>{
    console.log(`Running on port ${port}`)
})