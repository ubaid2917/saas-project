const mongoose = require('mongoose');
const themeSchema = mongoose.Schema({
    
   name: {
    type: String,
    required: true,
   },
    theme: {
        type: String,
        required: true,
    },
});

const themeModel = mongoose.model('theme', themeSchema);
module.exports = themeModel;