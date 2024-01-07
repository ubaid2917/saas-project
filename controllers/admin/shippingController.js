const Shipping = require("../../models/admin/shippingModel");
const Attribute = require("../../models/admin/attributeModel");
// create shipping
async function createShipping(req, res) {
  try {
    const name = req.body.name;
    const description = req.body.description;

    const nameExist = await Shipping.findOne({ name });

    if (nameExist) {
      res.status(200).send("Shipping already exists");
      return;
    }

    const shippingData = new Shipping({
      name,
      description,
    });
    await shippingData.save();

    res.status(200).send("Shipping successfully created");
  } catch (error) {
    console.log(error.message);
  }
}

// show Shipping

async function showShipping(req, res) {
  try {
    const shipping = await Shipping.find({});

    if (!shipping) {
      res.status(200).send("No shipping found");
      return;
    }

    res.status(200).send(shipping);
  } catch (error) {
    console.log(error.message);
  }
}

// edit shipping
async function editShipping(req, res) {
  try {
    const shippingId = req.params.id;
    if (!shippingId) {
      res.status(200).send("Invalid shipping");
      return;
    }
    const shippingData = await Shipping.findById(shippingId);

    if (!shippingData) {
      res.status(200).send("Invalid shipping");
      return;
    }

    res.status(200).send(shippingData);
  } catch (error) {
    console.log(error.message);
  }
}

async function updateShipping(req, res) {
  try {
    const shippingId = req.params.id;

    if (!shippingId) {
      res.status(200).send("Shipping not found");
      return;
    }

    const name = req.body.name;
    const description = req.body.description;

    const shippingData = await Shipping.findByIdAndUpdate(shippingId, {
      name,
      description,
    });

    res.status(200).send("Shipping updated");
  } catch (error) {
    console.log(error.message);
  }
}

// delete shipping
async function deleteShipping(req, res) {
  try {
    const shippingId = req.params.id;

    if (!shippingId) {
      res.status(200).send("Shipping not found");
      return;
    }

    const shippingData = await Shipping.findByIdAndDelete(shippingId);

    if (!shippingData) {
      res.status(404).send("Shipping not found");
      return;
    }
    
    res.status(200).send("Shipping successfully deleted");
  } catch (error) {
    console.log(error.message);
  }
}
// create attribute 

async function createAttribute(req,res){
  try{
    const attribute = req.body.attribute;

    const attributeData = new Attribute({
      attribute,
    }) 

    const checkAttribute = await Attribute.findOne({ attribute});
    if(checkAttribute){
     return res.status(200).send("attribute already created");
    }

    attributeData.save();
    res.status(200).send("attribute created successfully");
  }catch(error){
    console.log(error.message);
  }
}

module.exports = {
  createShipping,
  showShipping,
  editShipping,
  updateShipping,
  deleteShipping,
  createAttribute,
};
