const Plan = require("../../../models/superadmin/PlanModel");
const planRequest = require('../../../models/superadmin/planRequestModel'); 
const User = require("../../../models/superadmin/userModel");

async function createPlan(req, res) {
  try {
    const name = req.body.name;
    const price = req.body.price;
    const duration = req.body.duration;
    const  productLimit = req.body.productLimit;
    const theme = req.body.theme;
    const descriptions = req.body.descriptions;
    const features = req.body.features;

    const nameExist = await Plan.findOne({ name });
    if (nameExist) {
      res.status(200).send("Package already Exist");
      return;
    }

    const planData = new Plan({
      name,
      price,
      productLimit,
      duration,
      features,
      theme,
      descriptions,
      

    });
    await planData.save();

    res.status(200).send("Package saved successfully");
  } catch (error) {
    console.log(error.message);
  }
}

// edit and update plan start

async function editPlan(req, res) {
  try {
    const planId = req.params.id;

    if (!planId) {
      res.status(200).send("Plan not found");
      return;
    }

    const checkPlan = await Plan.findById(planId);

    res.status(200).send({ checkPlan });
  } catch (error) {
    console.log(error.message);
  }
}

async function updatePlan(req,res){
    try {
        const planId = req.params.id;

        if(!planId){
            res.status(400).send("Plan not found");
            return;
        }

        const {name, price,  productLimit ,duration,theme , features, descriptions} = req.body;

        const planData = await Plan.findByIdAndUpdate(planId, {
            name,
            price,
            productLimit,
            duration,
            features,
            theme,
            descriptions,  
        })

        res.status(200).send("Plan Successfully updated");
    } catch (error) {
       console.log(error.message); 
    }
}  

async function showplan(req,res){
  try{
   const plan = await Plan.find({});

   if(!plan){
    res.status(200).send("no plan found");
   } 
    
   res.render('showplan.ejs', {plan});
  }catch(error){
    console.log(error.message);
  }
}   
  

 
//^   plan request code start ========
 async function showRequestPlan(req,res){ 
  var search = '';
  if(req.query.search){
    search = req.query.search
  }
  try{
    

   const plan = await planRequest.find({}) .populate('packageId', 'name').populate('userId', 'name');

   if(!plan){
    return res.status(200).send("request plan is not found");
   }   

   res.render('showrequestplan.ejs', {plan});
  }catch(error){
    console.log(error.message)
  }
 }   


 async function editrequestedPlan(req,res){
  try{ 
    const user = await User.findOne({_id: req.session.user_id});
     const planid = req.params.id;

     if(!planid){
      res.status(200).send("plan id is not found");
     } 
     const plan = await planRequest.findById(planid).populate('packageId', 'name').populate('userId', 'name');

     if(!plan){
      res.status(200).send("no plan found")
     } 

     res.render('editRequestplan.ejs', {plan})
  }catch(error){
    console.log(error.message);
  }
 }
  


 async function updaterequestedPlan(req,res){
  try{
    const user = await User.findOne({_id: req.session.user_id}); 

    if(!user){
      res.status(200).send("session id is not found");
    } 

    const planid = req.params.id;

    if(!planid){
      res.status(200).send("plan id is not found");
    } 
    const packageId = planid;
  const status = req.body.status;

  const plan = await planRequest.findByIdAndUpdate(
    planid,
   {$set: {status: status}},{
    new: true,
   } 
  ); 

    if(!plan){
      res.status(200).send("plan not found");
    } 
   res.status(200).send("plan updated successfully");
  }catch(error){
    console.log(error.message);
  }
 }
//^   plan request code end   ========
  


module.exports = {
  createPlan,
  editPlan,
  updatePlan,
  showplan, 


  // ^ plan request 
  showRequestPlan,
  editrequestedPlan,
  updaterequestedPlan,
};
