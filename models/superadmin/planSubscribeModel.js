const mongoose = require('mongoose');
const planSubscribeSchema = mongoose.Schema({
    users: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    plan:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Plan'
    },
    paymentType: {
        required: true,
        enum: ['easypaisa', 'jazzcash'],
        type: String,
    },
 
})
const subscribePlan = mongoose.model('PlanSubscribe', planSubscribeSchema);
module.exports = subscribePlan; 