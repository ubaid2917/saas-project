const User = require("../../../models/superadmin/userModel");
const bcrypt = require('bcrypt');
async function securePassword(newpassword) {
  try {
    const hashPassword = await bcrypt.hash(newpassword, 10);
    return hashPassword;
  } catch (error) {
    console.log(error.message); 
  }
}

// show user start
async function showUsers(req, res) {
  var search = '';
  if (req.query.search) {
    search = req.query.search;
  }
  var page = 1;
  if (req.query.page) {
    page = req.query.page;
  }

  try {
    const limit = 4;

    const users = await User.find({
      $or: [
        { name: { $regex: '.*' + search + '.*', $options: 'i' } },
      ],
    })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
     
    
    const count = await User.find({
      $or: [
        { name: { $regex: '.*' + search + '.*', $options: 'i' } },
        { email: { $regex: '.*' + search + '.*', $options: 'i' } },
        { storename: { $regex: '.*' + search + '.*', $options: 'i' } },
      ],
    }).countDocuments();

    if (!users) {
      res.status(200).send('No user found');
    }
    res.status(200).render('showuser.ejs', {
      users,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (error) {
    console.log(error.message);
  }
}

// show user end

// edit user start

async function editUser(req, res) {
  try {
    const userId = req.params.id;

    if (!userId) {
      res.status(200).send("User not found");
    }

    const userData = await User.findById(userId);

    if (!userData) {
      res.status(200).send("User not found");
      return;
    }

    res.status(200).send({ userData });
  } catch (error) {
    console.log(error.message);
  }
}
async function updateUser(req, res) {
  try {
    const userId = req.params.id;
    const { name, email, storename } = req.body;

    if (!userId) {
      res.status(200).send("User not found");
      return;
    }

    const userData = await User.findByIdAndUpdate(userId, {
      name,
      email,
      storename,
    });

    res.status(200).send("User updated");
  } catch (error) {
    console.log(error.message);
  }
}

// usr delete
async function deleteUser(req, res) {
  try {
    const userId = req.params.id;

    if (!userId) {
      res.status(200).send("User not found");
    }

    const userData = await User.findByIdAndDelete(userId);

    if (!userData) {
      res.status(200).send("User not found");
      return;
    }

    res.status(200).send("User deleted");
  } catch (error) {
    console.log(error.message);
  }
}
 
// ^ show profile
async function showProfile(req, res) {
  try {
    const user = await User.findOne({ _id: req.session.user_id });
    
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.render('superadminprofile.ejs', { user });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error");
  }
}           

async function updateProfile(req,res){
  try{
    const user_id = req.body.user_id;
   const name = req.body.name;
   const email = req.body.email;
   const image = req.file.filename;
      

   const userData = await User.findByIdAndUpdate(user_id, {
     name,
     email,
     image,
   }, {new: true}); 
   if(!userData){
    res.status(200).send("User id not found");
   }   

   const user = await User.findOne({_id: req.session.user_id});
   if(!user){
    res.status(200).send("User session id is not found");
   } 

   if(userData){
    res.status(200).send("successfully update profile");
   }
   
   res.render('superadminprofile.ejs', {user})
  }catch(error){
    console.log(error.message);
  }
}


// & logout 

async function logout(req,res){
  try{
    req.session.destroy();
    res.redirect('/login');
  }catch(error){
   console.log(error.message);
  }
}
 
// ^ super admin password start -------------
 async function loadsuperadminpassword(req,res){
  try{ 
    const user  = await User.findOne({_id: req.session.user_id});
      if(!user){
        res.status(200).send("User not found")
      }

    res.render('superadminpassword.ejs', {user})
  }catch(error){
    console.log(error.message);
  }
 }
 async function updatePassword(req, res) {
  try {
    const user_id = req.body.user_id;
    const password = req.body.password;
    const newpassword = req.body.new_password;
    const cPassword = req.body.cPassword;

    const user = await User.findById(user_id);
    if (!user) {
      return res.status(404).send("User id not found in session");
    }

    if (newpassword !== cPassword) {
      return res.status(400).send("Your new password does not match");
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (validPassword) {
      const newPassword = await securePassword(newpassword);
      const userData = await User.findByIdAndUpdate(
        { _id: user_id },
        { $set: { password: newPassword , cPassword: cPassword}},
        { new: true }
      );
       

      return res.status(200).send("Password Updated");
    } else {
      return res.status(401).send("Your current password is incorrect");
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("Internal Server Error");
  }
}


// ^ super admin password end    -------------

async function superadminDashboard(req,res){
  try{
     res.render('superadmindashboard.ejs')
  }catch(error){
    console.log(error.message);
  }
}
   
module.exports = {
  superadminDashboard,
  showUsers,
  editUser,
  updateUser,
  deleteUser,
  showProfile,
  loadsuperadminpassword,
  updatePassword,
  updateProfile,
  logout,
};
