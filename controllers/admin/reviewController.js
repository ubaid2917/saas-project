const Review = require('../../models/admin/reviewModel');
const Product = require('../../models/admin/productModel');
const Category = require('../../models/admin/categoryModel');
const User = require('../../models/superadmin/userModel');

async function loadCreateReview(req,res){ 
    try{
    const category = await Category.find({}); 
    const product = await Product.find({});

    if(!category){
       return res.status(200).send("category not found");
    }  

   
     
    if(!product){
        return res.status(200).send("product not found");
    }
res.status(200).render('admin/createReview.ejs', { product,category})
  
    }catch(error){
        console.log(error.message);
    }
} 


async function createReview(req, res) {
    try {
        const categoryData = await Category.find({});
        const productData = await Product.find({});

        const category = req.body.category;
        const product = req.body.product;
        const user = req.body.user; 
        const rating = req.body.rating;
        const review = req.body.review;

        console.log(req.body);

        const reviewData = new Review({
            category,
            product,
            user,  
            rating,
            review,
        });

        console.log('reviewData', reviewData);

        if (!reviewData) {
            res.status(200).send(" review data is not found");
        }

        reviewData.save();

        res.status(200).send("review created successfully");
    } catch (error) {
        console.log(error.message);
    }
}
 

// show reviews start
async function showReviews(req,res){
    try{
      const review = await Review.find({}).populate('product', 'name').populate('category', 'title');

      if(!review){
        res.status(200).send("reviews not found");
      } 

      res.render('admin/showReview.ejs', {review})
    }catch(error){
        console.log(error.message);
    }
}
// show reviews end


// edit review start
async function editReview(req,res){
    try{
     const reviewId = req.params.id;

     if(!reviewId){
        res.status(200).send("Review id is not defined");
     }

     const reviewData = await Review.findById(reviewId);

     if(!reviewData){
        res.status(200).send("Review is not found");
  
     } 

     const category = await Category.find({});
     if(!category){
      res.status(200).send("category is not defined");
     }   

     const product = await Product.find({});
     if(!product){
      res.status(200).send("product is not defined");
     }  

     res.render('admin/editReview.ejs', {reviewData, category, product});
    }catch(error){
        console.log(error.message);
    }
}
// edit review end
// update review start 

async function updateReview(req,res){
    try{
     const user = req.body.user;
     const product = req.body.product;
     const category = req.body.category;
     const rating = req.body.rating;
     const review = req.body.review;

     const reviewId = req.params.id;

     if(!reviewId){
        res.status(200).send("review id is not found");
     }

     const reviewdata = await Review.findByIdAndUpdate(reviewId, {
        user,
        product,
        category,
        rating,
        review,
     }, {new: true});
     
     res.status(200).send("review successfully updated");
    }catch(error){
        console.log(error.message);
    }
}
// update review end


// delete review start
async function deleteReview(req,res){
    try{
     const reviewId = req.params.id;


     if(!reviewId){ 
        res.status(200).send("review id is  not found");
     }
 
     const review = await Review.findByIdAndDelete(reviewId); 

     if(!review){
        res.status(200).send("review not found"); 
     } 

     res.status(200).send("review deleted successfully");
    }catch(error){
        console.log(error.message);
    }
}
// delete review end
module.exports = {
    loadCreateReview,
    createReview, 
    showReviews,
    editReview,
    deleteReview,
    updateReview,
}