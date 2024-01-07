const express = require('express');
const app = express();
const config = require('../../config/config');
const session = require('express-session');
const path = require('path');
const multer = require('multer');

const auth = require('../../middlewares/superadminMiddleware');
const themeController = require('../../controllers/superadmin/theme/themeController');

app.use(session({
    secret: config.sessionSecret,
    resave: true,
    saveUninitialized: true,
})) 
app.use('/themes', express.static(path.join(__dirname, '../../public/themes')));

const storage = multer.diskStorage({

    destination: (req,file,cb)=>{
        cb(null, path.join(__dirname, '../../public/'));
    }, filename: (req,file,cb) => {
        const fileName = file.originalname;
        cb(null, fileName);
    }
}) 

const upload = multer({storage: storage});

app.get('/load-theme',  themeController.loadTheme);
app.post('/add-theme', upload.single('theme'), auth.isLogin, themeController.createTheme); 

 
app.get('/show-theme', themeController.showTheme); 
 

app.get('/show-content/:name', themeController.showthemecontent);

// app.post('/show-theme-content', themeController.showThemeContent);

module.exports = app;