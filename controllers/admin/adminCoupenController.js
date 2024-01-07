const Coupen = require("../../models/admin/AdminCoupenModel");
const Order = require('../../models/superadmin/orderModel');
const  Plan = require('../../models/superadmin/PlanModel');
const User = require("../../models/superadmin/userModel");
const planRequest = require('../../models/superadmin/planRequestModel');
const Subscribe = require('../../models/superadmin/planSubscribeModel');
async function createCoupen(req, res) {
  try {
    const name = req.body.name;
    const coupentype = req.body.coupentype;
    const discount = req.body.discount;
    const limit = req.body.limit;
    const expiryDate = req.body.expiryDate;
    const code = req.body.code;
    const status = req.body.status === 'on';
    const freeShippingStatus = req.body.freeShippingStatus;

    const checkName = await Coupen.findOne({ name });

    if (checkName) {
      res.status(200).send("Coupen already Exist");
      return;
    } 

    const coupenData = new Coupen({
      name,
      coupentype,
      discount,
      limit,
      expiryDate,
      code,
      status: status,
      freeShippingStatus,
    });

    await coupenData.save();

    res.status(200).send("Coupen created Successfully");
  } catch (error) {
    console.log(error.message);
  }
}  


async function showAdminCoupen(req,res){ 
  var search = '';
  if(req.query.search){
    search = req.query.search;
  }  

  var page = 1;
  if(req.query.page){
   page = req.query.page;
  }
   

  try{ 
 
    const limit = 1;


    const adminCoupen = await  Coupen.find({ 
      $or: [
        { name: { $regex: '.*' + search + '.*', $options: 'i' } },
      ], 

     }).limit((limit)* 1)
       .skip((page -1) * limit).exec();

       const count = await  Coupen.find({ 
        $or: [
          { name: { $regex: '.*' + search + '.*', $options: 'i' } },
        ], 
  
       }).countDocuments();

    res.render('showadmincoupen.ejs', { adminCoupen,
     totalPages: Math.ceil(count / limit),
     currentPage: page,
    })
  }catch(error){
    console.log(error.message);
  }
}   
   

async function showPlan(req,res){
  const user = await User.findOne({ _id: req.session.user_id });
 
  
  if(!user){
    res.status(200).send("session id is not found");
  }
  try{
   const plan = await Plan.find({}); 
   if(!plan){
    res.status(200).send("no plan found", {user});
   }

   res.status(200).render('showadminPlan.ejs', {plan })
  }catch(error){
    console.log(error.message)
  }
}
 
async function loadsubscribePlan(req,res){
  try{ 
    const user = await User.findOne({_id: req.session.user_id});
    if(!user){
      res.status(200).send("user id is not found in session");
    }
       const planId = req.params.id; 

       if(!planId){
        res.status(200).send("plan id not found");
       }   
       const plans  = await Plan.findById(planId);

       if(!plans){
        res.status(200).send("plan is not defined")
       }
       
       res.render("subscribeplan.ejs", {user, plans});
  }catch(error){
    console.log(error.message);
  }
}   

async function subscribePlan(req, res) {
  try {
    const user = await User.findOne({ _id: req.session.user_id });
    if (!user) {
      return res.status(200).send("user id is not found");
    }

    const planId = req.params.id;
    const plan = await Plan.findById(planId);
    if (!plan) {
      return res.status(200).send("plan not found");
    }

    // Update user's plan field
    user.planId = planId;
    await user.save();

    const users = user;
    const paymentType = req.body.paymentType;

    const planData = new Subscribe({
      users,
      plan: planId,
      paymentType,
    }); 

    await planData.save();

    res.status(200).json({ message: "Plan created successfully", user, plan });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
} 


async function loadSendRequest(req,res){
  try{ 
    const user = await User.findOne({_id: req.session.user_id});

    if(!user){
      res.status(200).send("user not found");
    }
   const packageid = req.params.id;

   if(!packageid){
    res.status(200).send("pacakge id is not found");
   } 

   const package = await Plan.findById(packageid);

   if(!package){
    res.status(200).send("package id is not found");
   }

   res.render('sendrequest.ejs', {package, user})
  }catch(error){
    console.log(error.message);
  }
}

 async function sendRequest(req, res) {
  try {
    const user = await User.findOne({ _id: req.session.user_id });
    const packageid = req.params.id;

    if (!packageid) {
      return res.status(400).send("Package id is not found");
    }

    const packageId = req.params.id;
    const userId = user;

    const existingRequest = await planRequest.findOne({
      userId: userId,
      packageId,
    });

    if (existingRequest) {
      if (existingRequest.status === 'verify') {
        return res.status(200).send("You already have a verified request");
      } else {
        return res.status(200).send("You already have a pending request");
      }
    }  

    const planData = new planRequest({
      packageId,
      userId,
    });

    await planData.save();

    res.status(200).send("Your request has been sent to the admin");
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
}





module.exports = {
    createCoupen,
    showAdminCoupen,
    showPlan,
    loadsubscribePlan,
    subscribePlan,
    loadSendRequest,
    sendRequest,
};
