const Category = require("../../models/admin/categoryModel");

async function addCategory(req, res) {
  try {
    const title = req.body.title;
    const image = req.files["image"][0].filename;
    const icon = req.files["icon"][0].filename;
    const trending = req.body.trending;

    const checkTitle = await Category.findOne({ title });
    if (checkTitle) {
      res.status(200).send("Category already found");
    }

    const categoryData = new Category({
      title,
      image,
      icon,
      trending,
    });

    await categoryData.save();

    res.status(200).send("Category created successfully ");
  } catch (error) {
    console.log(error.message);
  }
}

// show category start
async function showCategory(req, res) {
  try {
    const category = await Category.find({});

    if (!category) {
      res.status(200).send(" Category not found");
      return;
    }

    res.status(200).send(category);
  } catch (error) {
    console.log(error.message);
  }
}

// edit category

async function editCategory(req, res) {
  try {
    const categoryId = req.params.id;

    if (!categoryId) {
      res.status(200).send("Category not found");
      return;
    }

    const categoryData = await Category.findById(categoryId);
    if (categoryData) {
      res.status(200).send({ categoryData });
    }
  } catch (error) {
    console.log(error.message);
  }
}

// update category
async function updateCategory(req, res) {
  try {
    const categoryId = req.params.id;

    const title = req.body.title;
    const trending = req.body.trending;

    const alreadyTitle =  await Category.findOne({ title });
    if(alreadyTitle){
      res.status(200).send("Category Already created");
      return;
    }

    if(!categoryId){
      res.status(200).send("category not found");
      return;
    }
    const categoryData = await Category.findByIdAndUpdate(categoryId, {
         title,
         trending,
    }) 
    

    res.status(200).send("Category updated"); 
  } catch (error) {
    console.log(error.message);
  }
}

// delete category 
async function deleteCategory(req,res){
  try {
      const categoryId = req.params.id;
      if(!categoryId){
        res.status(200).send("Category not found");
        return;
      }

      const categoryData = await Category.findByIdAndDelete(categoryId);
       
      res.status(200).send("Category delete successful"); 
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = {
  addCategory,
  showCategory,
  editCategory,
  updateCategory,
  deleteCategory,
};
