const Product = require("../../models/admin/productModel");
const Category = require("../../models/admin/categoryModel");
const User = require("../../models/superadmin/userModel");
const Attribute = require('../../models/admin/attributeModel');
const Shipping = require("../../models/admin/shippingModel"); 
const Plan  = require('../../models/superadmin/PlanModel');
async function loadCreateProduct(req,res){
  try{
   const user =  await User.findOne({_id: req.session.user_id});

   if(!user){
    res.status(200).send("user not found");
   }

   const category = await Category.find({});
   if(!category){
    res.status(200).send("Category not found");
  }

  const attribute = await Attribute.find({});
  if(!attribute){
    res.status(200).send("Attribute not found");
  }
   
  const shipping = await Shipping.find({});
  if(!shipping){
    res.status(200).send("Shipping not found");
  }

   res.render("admin/createProduct.ejs", {category, user, shipping, attribute, });
  }catch(error){
    console.log(error.message);
  }
}
async function createProduct(req, res) {
  try { 
    const userId = req.session.user_id;
    const user = await User.findOne({ _id: userId });

    // Check if user has a plan
    if (!user.planId) {
      res.status(403).send("User does not have a plan");
      return;
    }

    const plan = await Plan.findOne({ _id: user.planId });

    // Check if plan exists
    if (!plan) {
      res.status(404).send("Plan not found");
      return;
    }

    const productLimit = plan.productLimit;

    // Assuming that you have a count of existing products for the user
    const userProductCount = await Product.countDocuments({ createdBy: userId });

    if (userProductCount >= productLimit) {
      res.status(403).send("You have reached the limit for product creation based on your plan");
      return;
    }
    const category = req.body.category;
    const name = req.body.name;
    const productDescription = req.body.productDescription;
    const otherDescription = req.body.otherDescription;
    const otherDescriptionImage = req.files["otherDescriptionImage"][0].filename;
    const moreInformation = req.body.moreInformation;
    const moreInformationImage = req.files["moreInformationImage"][0].filename;
    const tag = req.body.tag;
    const coverImage = req.files["coverImage"][0].filename;
    const subImage = req.files["subImage"][0].filename;
    const price = req.body.price;
    const discountType = req.body.discountType;
    const discountAmount = req.body.discountAmount;
    const trending = req.body.trending === 'on';
    const stockStatus = req.body.stockStatus;
    const shipping = req.body.shipping;
    const weight = req.body.weight;
    const attribute = req.body.attribute;
  

    const productData = new Product({
      category,
      name,
      productDescription,
      otherDescription,
      otherDescriptionImage,
      moreInformation,
      moreInformationImage,
      tag,
      coverImage,
      subImage,
      price,
      discountType,
      discountAmount,
      trending,
      stockStatus,
      shipping,
      weight,
      attribute,
    });

    await productData.save();

    res.status(200).send("Product created successfully");
  } catch (error) {
    console.log(error.message);
  }
}

// async function showProduct(req,res){
//     try {
//         const showProductByCategory = await Product.find({_id: req.body.product_id}).populate('category_id');

//         res.status(200).send(showProductByCategory);
//     } catch (error) {
//        console.log(error.message);
//     }
// }

async function showProduct(req, res) {
  try {
    const product = await Product.find({}).populate("category", "title");
    if (!product) {
      res.status(200).send("Product not found");
      return;
    }
    res.status(200).render('admin/showproduct.ejs', {product});
  } catch (error) {
    console.log(error.message);
  }
}

// edit product
async function editProduct(req, res) {
  try {
    const productId = req.params.id;

    if (!productId) {
      res.status(200).send("Product not found");
      return;
    }
    const productData = await Product.findById(productId).populate("category", "title").populate("shipping", 'name').populate("attribute", 'attribute');

    if (!productData) {
      res.status(200).send("Product not found");
    } 
    const shipping = await Shipping.find();   
    const attribute = await Attribute.find();
    const category = await Category.find();
    res.status(200).render('admin/productDetail.ejs', {productData, shipping, attribute, category});
  } catch (error) {
    console.log(error.message);
  }
}
async function updateProduct(req, res) {
  try {
    const productId = req.params.id;

    if (!productId) {
      res.status(200).send(" product not found ");
      return;
    }
    const category = req.body.category;
    const name = req.body.name;
    const productDescription = req.body.productDescription;
    const otherDescription = req.body.otherDescription;
    const moreInformation = req.body.moreInformation;
    const tag = req.body.tag;
    const price = req.body.price;
    const discountType = req.body.discountType;
    const discountAmount = req.body.discountAmount;
    const trending = req.body.trending;
    const stockStatus = req.body.stockStatus;
    const shipping = req.body.shipping;
    const weight = req.body.weight;
    const productAttribute = req.body.productAttribute;

    const product = await Product.findByIdAndUpdate(productId, {
     category,
      name,
      productDescription,
      otherDescription,
      moreInformation,
      tag,
      price,
      discountType,
      discountAmount,
      trending,
      stockStatus,
      shipping,
      weight,
      productAttribute,
    });

    res.status(200).send(" product updated successfully ");
  } catch (error) {
    console.log(error.message);
  }
}

async function deleteProduct(req, res) {
  try {
    const productId = req.params.id;

    if (!productId) {
      res.status(200).send("Product found");
      return;
    }   
    const productData = await Product.findByIdAndDelete(productId);
    res.status(200).send("Product deleted");

  } catch (error) {
    console.log(error.message);
  }
}
async function updateProductImages(req,res){
  try {
    const productId = req.params.id;

    if(!productId){
      res.status(200).send("Product not found");
      return;
    }

    const productData = await Product.findById(productId);

    if (!productData) {
      res.status(200).send("Product not found");
      return;
    } 
      
    if(req.files["coverImage"]){
      productData.coverImage = req.files['coverImage'][0].filename;
    }

    if(req.files["subImage"]){
      productData.subImage = req.files['subImage'][0].filename;
    }

   
    if (req.files["otherDescriptionImage"]) {
      productData.otherDescriptionImage = req.files["otherDescriptionImage"][0].filename;
    }

    if (req.files["moreInformationImage"]) {
      productData.moreInformationImage = req.files["moreInformationImage"][0].filename;
    }

    await productData.save();

    res.status(200).send("Product images updated successfully");
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = {
  loadCreateProduct,
  createProduct,
  showProduct,
  editProduct,
  updateProduct,
  deleteProduct,
  updateProductImages,
};
