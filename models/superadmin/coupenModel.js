const mongoose = require('mongoose');
const coupenSchema = mongoose.Schema({

    name: {
        type: String,
        required: true,
    },
    discount: {
        type: String,
        required: true,
    },
    limit: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true,
        unique: true,
    }

})

const coupenModel = mongoose.model('Coupen', coupenSchema);
module.exports = coupenModel;