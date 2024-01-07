const mongoose = require('mongoose'); 

function generateUniqueId() {
    const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let uniqueId = '';
  
    for (let i = 0; i < 8; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      uniqueId += characters.charAt(randomIndex);
    }
  
    return uniqueId;
  }

const orderSchema = mongoose.Schema({
    orderId:{
        type: String,
        required: true,
        default: generateUniqueId,
    },
    date: {
        type: Date,
        required: true,
        default: Date.now,
    },
    name:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true,
     },
     planName:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'plans',
        required: true,
     },
     price:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'plans',
        required: true,
     }, 
     paymentType: {
       enum: ['easypaisa','jazzcash'],
       type: String,
       requird: true,
     },
    status: {
        enum: ['success', 'failure'],
        type: String,
        required: true,
    },
    coupen:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'admincoupens',
        required: true,
     },
    
})  

const orderModel = mongoose.model('order', orderSchema);
module.exports = orderModel;