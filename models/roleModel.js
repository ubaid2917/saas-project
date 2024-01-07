const mongoose = require('mongoose');

const roleSchema = mongoose.Schema({
     
    name: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['dashboard', 'manager user'],
        required: true,
    }
})
const roleModel = mongoose.model('Role',roleSchema);
module.exports = roleModel;
