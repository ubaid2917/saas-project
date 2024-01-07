const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  storename: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  cPassword: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['admin', 'super-admin'],
    default: 'admin',
  },
  token: {
    default: '',
    type: String,
},
planId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'PlanSubscribe', 
  default : '657d76b967bd32538cecf22a'
},

 image: {
  type: String,
 }
});

const userModel = mongoose.model("User", userSchema);
 
module.exports = userModel;
  