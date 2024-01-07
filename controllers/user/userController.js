// const User = require("../../models/userModel");
// const Role = require("../../models/roleModel");
// const Product = require("../../models/admin/productModel.js");
// const Tax = require("../../models/admin/taxModel.js");
// const Category = require("../../models/admin/categoryModel.js");
// const Attribute = require("../../models/admin/attributeModel.js");

// async function createRole(req, res) {
//   try {
//     const name = req.body.name;
//     const role = req.body.role;

//     const checkRole = await Role.findOne({ name });
//     if (checkRole) {
//       res.status(200).send("Role already Exists");
//       return;
//     }

//     const roleData = new Role({
//       name,
//       role,
//     });

//     res.status(200).send("role created successfully");
//   } catch (error) {
//     console.log(error);
//   }
// }

// async function createUser(req, res) {
//   try {
//     const name = req.body.name;
//     const email = req.body.email;
//     const password = req.body.password;
//     const role = req.body.role;

//     if (!name) {
//       res.status(200).send("name is required");
//       return;
//     }

//     if (!email) {
//       res.status(200).send("email is required");
//       return;
//     }

//     if (!password) {
//       res.status(200).send("password is required");
//       return;
//     }

//     if (!role) {
//       res.status(200).send("role is required");
//       return;
//     }

//     if (!isStrongPassword(password)) {
//       res.status(400).send("Password does not meet complexity requirements");
//       return;
//     }

//     // Define a function to check password strength
//     function isStrongPassword(password) {
//       // Minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter, and 1 special symbol
//       const passwordRegex =
//         /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
//       return passwordRegex.test(password);
//     }

//     const checkname = await User.findOne({ name });
//     if (checkname) {
//       res.status(200).send("User already exists");
//       return;
//     }
//     const checkemail = await User.findOne({ email });
//     if (checkemail) {
//       res.status(200).send("Email already exists");
//       return;
//     }

//     const user = new User({
//       name,
//       email,
//       password,
//       role,
//     });
//     await user.save();
//     res.status(200).send(" user successfully created");
//   } catch (error) {
//     console.log(error);
//   }
// }

// async function getUser(req, res) {
//   try {
//     const showUser = await User.find({});

//     res.status(200).send(showUser);
//   } catch (error) {
//     console.log(error.message);
//   }
// }

// async function updateUser(req, res) {
//   try {
//     const userId = req.params.id;

//     if (!userId) {
//       res.status(200).send("user not found");
//       return;
//     }

//     const userDataId = await User.findById(userId);
//     const name = req.body.name;
//     const email = req.body.email;
//     const role = req.body.role;

//     const userData = await User.findByIdAndUpdate(
//       userId,
//       {
//         name,
//         email,
//         role,
//       },
//       { new: true }
//     );
//     console.log(userData);

//     res.status(200).send("update user");
//   } catch (error) {
//     console.log(error);
//   }
// }

// async function deleteUser(req, res) {
//   try {
//     const userId = req.params.id;

//     if (!userId) {
//       res.status(200).send("User not found");
//       return;
//     }

//     const userData = await User.findByIdAndDelete(userId);

//     res.status(200).send("Succssfull delete");
//   } catch (error) {
//     console.log(error.message);
//   }
// }

// // products start start
// async function createProduct(req, res) {
//   try {
//     const category_id = req.body.category_id;
//     const name = req.body.name;
//     const productDescription = req.body.productDescription;
//     const otherDescription = req.body.otherDescription;
//     const otherDescriptionImage =
//       req.files["otherDescriptionImage"][0].filename;
//     const moreInformation = req.body.moreInformation;
//     const moreInformationImage = req.files["moreInformationImage"][0].filename;
//     const tag = req.body.tag;
//     const coverImage = req.files["coverImage"][0].filename;
//     const subImage = req.files["subImage"][0].filename;
//     const price = req.body.price;
//     const discountType = req.body.discountType;
//     const discountAmount = req.body.discountAmount;
//     const trending = req.body.trending;
//     const stockStatus = req.body.stockStatus;
//     const shipping = req.body.shipping;
//     const weight = req.body.weight;
//     const productAttribute = req.body.productAttribute;

//     const productData = new Product({
//       category_id,
//       name,
//       productDescription,
//       otherDescription,
//       otherDescriptionImage,
//       moreInformation,
//       moreInformationImage,
//       tag,
//       coverImage,
//       subImage,
//       price,
//       discountType,
//       discountAmount,
//       trending,
//       stockStatus,
//       shipping,
//       weight,
//       productAttribute,
//     });

//     await productData.save();

//     res.status(200).send("Product saved successfully");
//   } catch (error) {
//     console.log(error.message);
//   }
// }

// async function updateUserProduct(req, res) {
//   try {
//     const productId = req.params.id;

//     if (!productId) {
//       return res.status(200).send("product not found");
//     }
//     const name = req.body.name;
//     const productDescription = req.body.productDescription;
//     const otherDescription = req.body.otherDescription;
//     const moreInformation = req.body.moreInformation;
//     const tag = req.body.tag;
//     const price = req.body.price;
//     const discountType = req.body.discountType;
//     const discountAmount = req.body.discountAmount;
//     const trending = req.body.trending;
//     const stockStatus = req.body.stockStatus;
//     const shipping = req.body.shipping;
//     const weight = req.body.weight;
//     const productAttribute = req.body.productAttribute;

//     const productData = await Product.findByIdAndUpdate(
//       productId,
//       {
//         name,
//         productDescription,
//         otherDescription,
//         moreInformation,
//         tag,
//         price,
//         discountType,
//         discountAmount,
//         trending,
//         stockStatus,
//         shipping,
//         weight,
//         productAttribute,
//       },
//       { new: true }
//     );
//     if (!productData) {
//       res.status(200).send("product not found");
//     }
//     res.status(200).send("product update successfully");
//   } catch (error) {
//     console.log(error.message);
//   }
// }
// // products start end

// //^ tax routes start here
// async function createUserTax(req, res) {
//   try {
//     const name = req.body.name;
//     const type = req.body.type;
//     const amount = req.body.amount;
//     const status = req.body.status;

//     const checkName = await Tax.findOne({ name });

//     if (checkName) {
//       return res.status(200).send("tax already exists");
//     }

//     const taxData = new Tax({
//       name,
//       type,
//       amount,
//       status,
//     });

//     res.status(200).send("Tax created successfully");
//   } catch (error) {
//     console.log(error.message);
//   }
// }

// async function showUserTax(req, res) {
//   try {
//     const taxData = await Tax.find({});

//     res.status(200).send(taxData);
//   } catch (error) {
//     console.log(error.message);
//   }
// }

// async function updateUserTask(req, res) {
//   try {
//     const taskId = req.params.id;

//     if (!taskId) {
//       return res.status(200).send("Task not found");
//     }

//     const name = req.body.name;
//     const type = req.body.type;
//     const amount = req.body.amount;
//     const status = req.body.status;

//     const taskData = await Tax.findByIdAndUpdate(taskId, {
//       name,
//       type,
//       amount,
//       status,
//     });

//     res.status(200).send("Tax update successfully");
//   } catch (error) {
//     console.log(error.message);
//   }
// }

// async function deleteUserTax(req, res) {
//   try {
//     const taxId = req.params.id;

//     if (!taxId) {
//       return res.status(200).send("tax not found");
//     }
//     const taskData = await Tax.findByIdAndDelete(taxId);
//     res.status(200).send("Tax successfully deleted");
//   } catch (error) {
//     console.log(error.message);
//   }
// }
// //^ tax routes end here

// //& category controller code start here
// async function createUserCategory(req, res) {
//   try {
//     const title = req.body.title;
//     const image = req.files["image"][0].filename;
//     const icon = req.files["icon"][0].filename;
//     const trending = req.body.trending;

//     const checkName = await Category.findOne({ title });

//     if (checkName) {
//       return res.status(200).send(`${title} is already exists`);
//     }
//     const categoryData = new Category({
//       title,
//       image,
//       icon,
//       trending,
//     });
//     await categoryData.save();
//     res.status(200).send("Category created Successfully");
//   } catch (error) {
//     console.log(error.message);
//   }
// }
 

// async function showUserCategory(req,res){
//   try{
//    const  categoryData = await Category.find({});
//    res.status(200).send(categoryData);
//   }catch(error){
//     console.log(error.message);
//   }
// }

// async function UpdateUserccategory(req,res){
//   try{
//       const categoryId = req.params.id;
//       if(!categoryId){
//         return res.status(200).send("category not found");
//       }  

//       const title = req.body.title;
//       const trending = req.body.trending;
     
//       const categoryData = await Category.findByIdAndUpdate(categoryId, {
//       title,
//       trending,  
//       },{new: true})
  
//       res.status(200).json("successfully updated")
//   }catch(error){
//     console.log(error.message);
//   }
// }

// async function deleteUserCategory(req,res){
//   try{
//    const categoryId = req.params.id;
   
//    if(!categoryId){
//     return res.status(200).send("category already existes");
//    }

//    const  categoryData = await Category.findByIdAndDelete(categoryId);

//    res.status(200).send("category successfully delete");
//   }catch(error){
//     console.log(error.message);
//   }
// }
// //& category controller code end here


// //> attribute start here
// async function createAttribute(req,res){
//   try {
//        const attribute = req.body.attribute;

//       const attributeData = new Attribute({
//         attribute,
//       }) 

//       await attributeData.save();
//       res.status(200).send("Attribute saved")
//   } catch (error) {
//     console.log(error.message);
//   }
// }  

// async function showAttribute(req,res){
//   try{
//     const attribute = await Attribute.find({});
     
//     res.status(200).send(attribute);
//   }catch(error){
//     console.log(error.message);
//   }
// }

// async function updateAttribute(req,res){
//   try{
//     const attribute_id = req.params.id; 

//     if(!attribute_id){
//       res.status(200).send("Attribute not  found");
//     } 

//     const attribute = req.body.attribute;
     
//     const  attrributeData = await Attribute.findByIdAndUpdate(attribute_id,{
//       attribute,
//     },{new: true});

//     res.status(200).send("update successfully");

//   }catch(error){
//     console.log(error.message);
//   }
// }




// module.exports = {
//   createRole,
//   createUser,
//   getUser,
//   updateUser,
//   deleteUser,
//   createProduct,
//   updateUserProduct,
//   createUserTax,
//   showUserTax,
//   updateUserTask,
//   deleteUserTax,
//   createUserCategory,
//   showUserCategory,
//   UpdateUserccategory,
//   deleteUserCategory,
//   createAttribute,
//   showAttribute,
//   updateAttribute,
// };
