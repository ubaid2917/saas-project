const mongoose = require('mongoose');
const attributesSchema = mongoose.Schema({
    attribute:{
        type: String,
        requird: true,
    }
}) 

const attributeModel = mongoose.model('Attribute', attributesSchema);
module.exports = attributeModel;
