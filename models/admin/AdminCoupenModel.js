const mongoose = require('mongoose');
const adminCoupenSchema =  mongoose.Schema({
  
    name: {
        type: String,
        required: true,
    },
    coupentype: {
        enum: ['percentage', 'flat'],
        type: String,
        required: true,
    },
    discount: {
        type: Number,
        requird: true,
    },
    limit: {
        type: Number,
        required: true,
    },
    expiryDate: {
        type: Date,
        required: true,
    },
    code: {
        type: String,
        required: true,
    },
    status: {
        type: Boolean,
    },
    freeShippingStatus: {
        type: Boolean,
    }
})

const adminCoupenModel = mongoose.model('AdminCoupen', adminCoupenSchema);
module.exports = adminCoupenModel;