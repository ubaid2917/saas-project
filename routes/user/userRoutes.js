// const express = require('express');
// const app = express();
// const path  = require('path');  
// const multer = require('multer');
// const userController = require('../../controllers/user/userController');

// const auth = require('../../middlewares/userMiddleware');
// const config = require('../../config/config');
// const session = require('express-session');

// app.use(
//     session({
//       secret: config.sessionSecret,
//       resave: true,
//       saveUninitialized: true,
//     })
//   );

// const storage = multer.diskStorage({
//     destination: function(req,file,cb){
//         cb(null, path.join(__dirname, '../../public/images'))
//         },
//         filename: function(req,file,cb){
//            const name = Date.now() + '-' + file.originalname;
//            cb(null, name);
//         }
// })

// const upload = multer({storage: storage})


// //< role and user routes start here
// app.post('/userRole', auth.isLogin ,userController.createRole);
// app.post('/createuser', auth.isLogin ,userController.createUser);
// app.get('/showuser', auth.isLogin ,userController.getUser);
// app.post('/updateuser/:id', auth.isLogin ,userController.updateUser);
// app.get('/deleteUser/:id', auth.isLogin , userController.deleteUser);
// //< role and user routes end here

// //~ product routes start here 
// app.post('/createuserProduct',auth.isLogin , upload.fields([{name: 'otherDescriptionImage' }, {name: 'moreInformationImage'}, {name: 'coverImage'}, {name: 'subImage'},]),userController.createProduct);
// app.post('/editUserProduct/:id', auth.isLogin , userController.updateUserProduct);
// //~ product routes end here 


// //^ tax routes start here
// app.post('/createUserTask', auth.isLogin , userController.createUserTax);
// app.get('/showUserTask', auth.isLogin , userController.showUserTax);
// app.post('/updateUserTask/:id', auth.isLogin ,  userController.updateUserTask);
// app.get('/deleteUserTax/:id', auth.isLogin ,  userController.deleteUserTax);
// //^ tax routes end here


// //& category routes start here
// app.post('/createUsercategory',  auth.isLogin , upload.fields([{name: "image"},{name:  "icon"},]),userController.createUserCategory);
// app.get('/showUserccategory', auth.isLogin , userController.showUserCategory);
// app.post('/updateUsercategory/:id', auth.isLogin ,  userController.UpdateUserccategory)
// app.get('/deleteUserCategory/:id', auth.isLogin ,  userController.deleteUserCategory);
// //& category routes end here


// //> attribute routes start here
// app.post('/createAttribute', auth.isLogin , userController.createAttribute);
// app.get('/showAttribute', auth.isLogin , userController.showAttribute);
// app.post('/updateAttribute/:id', auth.isLogin ,  userController.updateAttribute);
// // app.post('/deleteAttribute/:id', userController.deleteAttribute);

// //> attribute routes end here
// module.exports = app;
