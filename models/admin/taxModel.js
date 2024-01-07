const mongoose = require("mongoose");
const taxSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["percentage", "flat"],
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  status: {
    type: Boolean,
  },
});
const taxModel = mongoose.model("Tax", taxSchema);
module.exports = taxModel;
