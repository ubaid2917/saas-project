const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
      role_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role',
     },
    name:{
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true, 
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
         type: String,
         required: true,
    }
})

const userModel = mongoose.model('AdminUser', userSchema);
module.exports = userModel;