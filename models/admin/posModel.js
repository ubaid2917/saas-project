const mongoose = require('mongoose');
const posSchema = mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
    }

})