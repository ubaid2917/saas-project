const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
    },
    name: {
        type: String,
        required: true,
    },
    productDescription: {
        type: String,
        required: true,
    },
    otherDescription: {
        type: String,
    },
    otherDescriptionImage: {
        type: String,
    },
    moreInformation: {
        type: String,
    },
    moreInformationImage: {
        type: String,
    },
    tag: {
        type: String,
        enum: ['new', 'best seller', 'none'],
        required: true,
    },
    coverImage: {
        type: String,
        required: true,
    },
    subImage: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    discountType: {
        type: String,
        enum: ['flat', 'percentage'],
    },
    discountAmount: {
        type: Number,
    },
    trending: {
        type: Boolean,  
    },
    stockStatus: {
        type: String,
        enum: ['in stock', 'out of stock', 'on backorder'],
        required: true,
    },
    shipping: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Shipping',
      
    },
    weight: {
        type: Number,
        required: true,
    },
    attribute: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Attribute',
       
    },
});

const productModel = mongoose.model('Product', productSchema);
module.exports = productModel;
