const Coupen = require("../../../models/superadmin/coupenModel");

// add coupen start
async function addCoupen(req, res) {
  try {
    const name = req.body.name;
    const discount = req.body.discount;
    const limit = req.body.limit;
    const code = req.body.code;

    const checkCoupen = await Coupen.findOne({ name });

    if (checkCoupen) {
     return res.status(200).send("Coupen already exists");
    }
     
    const checkCode = await Coupen.findOne({ code});
    if(checkCode){
     return res.status(200).send("try another coupe code");
    }
    const coupenData = new Coupen({
      name,
      discount,
      limit,
      code,
    });

    await coupenData.save(); 
    res.status(200).send("successfully saved")
  } catch (error) {
    console.log(error.message);
  }
}
// add coupens end

// show coupens start
async function showCoupen(req, res) {   
  var search = '';
  if(req.query.search){
    search = req.query.search;
  }  

  var page = 1;
  if(req.query.page){
    page = req.query.page;
  }  
 
  const limit = 2;

  try {
    const showCoupens = await Coupen.find({
      $or:[
        {name: {$regex: '.*' + search + '.*', $options: 'i'}},
        {discount: {$regex: '.*' + search + '.*', $options: 'i'}},
        {limit: {$regex: '.*' + search + '.*', $options: 'i'}},
        {code: {$regex: '.*' + search + '.*', $options: 'i'}},
      ]
    })
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .exec();
    
    ;
    if (!showCoupens) {
      res.status(200).send("coupen not found");
    }

    res.status(200).render('superadmincoupen.ejs', { showCoupens });
  } catch (error) {
    res.status(400).send(error.message);
  }
}
// show coupen end

// edit coupen start
async function editCoupen(req, res) {
  try {
    const coupenId = req.params.id;

    if (!coupenId) {
      res.status(200).send("Coupen not found");
      return;
    }
    const coupenData = await Coupen.findById(coupenId);

    if (!coupenData) {
      res.status(200).send("Coupen not found");
      return;
    }

    res.status(200).send({ coupenData });
  } catch (error) {
    console.log(error.message);
  }
}

// update coupen start
async function updateCoupen(req, res) {
  try {
    const coupenId = req.params.id;

    if (!coupenId) {
      res.status(200).send("Coupen not found");
    }
    const { name, discount, limit, code } = req.body;

    const coupenData = await Coupen.findByIdAndUpdate(coupenId, {
      name,
      discount,
      limit,
      code,
    });

    res.status(200).send("Coupen updated");
  } catch (error) {
    console.log(error.message);
  }
}
async function deleteCoupen(req, res) {
  try {
    const coupenId = req.params.id;

    const coupenData = await Coupen.findByIdAndDelete(coupenId);

    if (!coupenData) {
      res.status(200).send("Coupen not found");
    }

    res.status(200).send("Coupen deleted");
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = {
  addCoupen,
  showCoupen,
  editCoupen,
  updateCoupen,
  deleteCoupen,
};
