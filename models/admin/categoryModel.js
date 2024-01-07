const mongoose = require('mongoose');
const categorySchema = mongoose.Schema({

    title: {
        type: String,
        required: true,
        unique: true, 
    },
    image: {
        type:String,
        required: true,
    },
    icon: {
        type: String,
        required: true,
    },
    trending:{
        type: Boolean,
    }
})
const categoryModel = mongoose.model('Category', categorySchema);
module.exports = categoryModel;