const mongoose = require('mongoose');

const planRequest = mongoose.Schema({
    packageId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Plan',
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }, 
    status: {
      type: String,
      enum: ['verify','pending'],
      default: 'pending',
    }
}) 

const planrequestModel = mongoose.model('planrequest', planRequest);
module.exports = planrequestModel;