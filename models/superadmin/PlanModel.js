const mongoose = require("mongoose");
const planSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  duration: {
    enum: ["unlimited", "permonth", "peryear"],
    type: String,
    required: true,
  },
  productLimit: {
    type: Number,
    required: true,
  },
  features: {
    type: [String], 
    required: true,
  },
  theme: {
    enum: ["theme1", "theme2", "theme3", "theme4", "theme5"],
    required: true,
    type: String,
  },
  descriptions: {
    type: String,
    required: true,
  },
});
const plan = mongoose.model("Plan", planSchema);
module.exports = plan;
