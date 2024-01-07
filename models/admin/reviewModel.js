const mongoose = require('mongoose');
const reviewSchema = mongoose.Schema({
     
    user: {
        type: String,
        required: true,
    },
    category:{
     type: mongoose.Schema.Types.ObjectId,
     ref: "Category",
    },
    product:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
    },
    review: {
        type: String,
        required: true,
    }
}) 
const reviewModel = mongoose.model('Review',reviewSchema );
module.exports = reviewModel;