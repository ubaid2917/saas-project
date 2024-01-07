const mongoose = require('mongoose');
const shippingSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    }
})
const shippingModel = mongoose.model('Shipping', shippingSchema);
module.exports = shippingModel;