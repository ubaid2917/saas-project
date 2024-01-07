const User = require("../../models/superadmin/userModel");
const bcrypt = require("bcrypt");
const config = require('../../config/config'); 
const randomstring = require("randomstring");
const nodemailer = require("nodemailer");

async function securePassword(password) {
  try {
    const hashPassword = await bcrypt.hash(password, 10);
    return hashPassword;
  } catch (error) {
    console.log(error.message);
  }
}


async function  resetpasswordMail(name,email, token){
  try{
    const transport = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      requireTLS: true,
      auth:{
        user: config.emailUser,
        pass: config.emailPassword,
      }
    }) 
    const mailOptions = {
      from: config.emailUser,
      to: email,
      subject: "For Reset Password",
      html:
        "<p> Hi " +
        "<b>" +
        name +
        "</b>" +
        ' <br> please click here to <a href="http://localhost:3000/resetpassword?token=' +
        token +
        '"> Reset </a> your password</p>'
    };
    transport.sendMail(mailOptions, function(err, info){
      if (err) {
        console.log(err);
      } else {
        console.log("Email has been sent", info.response);
      }
    })

  }catch(error){
    console.log(error.message);
  }
}

async function registerUser(req, res) {
  try {
    const name = req.body.name;
    const email = req.body.email;
    const storename = req.body.storename;
    const password = req.body.password;
    const cPassword = req.body.cPassword;
   
    const checkName = await User.findOne({ name});

    if(checkName){
      res.status(200).send("name already exists");
    } 
    
    const checkEmail = await User.findOne({ email });

    if (checkEmail) {
      res.status(200).json("Email already in use");
    }

    if (password !== cPassword) {
      res.status(200).json("password and confirm password must be same");
    }
    
    const storeExist = await User.findOne({ storename});

    if(storeExist){
       res.status(200).send("Store name unavailable please try another name"); 
    }
    const spassword = await securePassword(password);
    const userData = new User({
      name,
      email,
      storename,
      password: spassword,
      cPassword,
    });

    await userData.save();

    res.status(200).json(`successfully register ` );
  } catch (error) {
    console.log(error.message);
  }
}

async function loginUser(req, res) {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const userData = await User.findOne({ email });

    if (userData) {
      const checkpassword = await bcrypt.compare(password, userData.password);

      if (checkpassword) {
        req.session.user_id = userData._id;
      
        if (userData.role === 'super-admin') {
          return res.redirect("/superadmin/superadmindashboard");
        } else if (userData.role === 'admin') {
          req.session.user_id = userData._id;
          console.log(req.session.user_id = userData._id);
          return res.redirect("/admindashboard");
        } else {
          return res.redirect('/admindashboard');
        }
      } else {
        return res.status(200).send("Invalid Credentials");
      } 
    } else {
      return res.status(200).send("Invalid Credentials");
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("Internal Server Error");
  }
}


async function userDashboard(req,res){
  try{
   res.render('userdashboard.ejs');
  }catch(error){
    console.log(error.message);
  }
}
 
async function logout(req,res){
  try{
   req.session.destroy();
   res.redirect('/login');
  }catch(error){
    console.log(error.message); 
  }
}

async function login(req,res){
  res.render('auth/login.ejs');
} 


async function loadforgetPassword(req,res){
  try{
    res.render('forget-password.ejs');
  }catch(error){
    console.log(error.message);
  }
}
 

async function forgetPassword(req,res){
  try{
     const email = req.body.email;
     
     const checkEmail = await User.findOne({email: email});
      
     if(checkEmail){
      const randomString = randomstring.generate();
      await User.updateOne({email: email}, {$set: {token: randomString}});
      resetpasswordMail(checkEmail.name, checkEmail.email, randomString);
      res.render("forget-password.ejs", {
        success: true,
        message: "Please check you email to reset password",
      });



     }else{
      res.status(200).send("email not found");
     }
  }catch(error){
    console.log(error.message);
  }
}   

async function loadResetPassword(req,res){
  try{
   const token = req.query.token;
   const tokenData = await User.findOne({ token: token });

    if (tokenData) {
      res.render("resetpassword.ejs", { user_id: tokenData._id });
    } else {
      res.send("Invalid token");
    }
  }catch(error){
    console.log(error.message);
  }
} 

async function resetpassword(req,res){
  try{
   const password = req.body.password;
   const user_id = req.body.user_id;
   const securepassword = await securePassword(password);
   await User.findByIdAndUpdate(
    { _id: user_id },
    {
      $set: {
        password: securepassword,
        token: "",
      },
    }
  );
  res.redirect("/login");
  }catch(error){
    console.log(error.message);
  }
}

module.exports = {
  registerUser,
  loginUser,
  securePassword,
  userDashboard,

  loadforgetPassword,
  forgetPassword,
  loadResetPassword,
  resetpassword,
  logout,
  login,
};
