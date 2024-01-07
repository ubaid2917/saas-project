const mongoose = require('mongoose');
const productQuestion = mongoose.Schema({
    user: {
        type: String,
        required: true,
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
    },
    question : {
        type: String,
        required: true,
    },
    answer: {
        type: String,
    },
    status: {
        enum: ['pending', 'answered'],
        type: String,
        default: 'pending',
    }
}) 

const QandAmodel = mongoose.model('QandA',  productQuestion);
module.exports = QandAmodel;