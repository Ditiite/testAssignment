var mongoose = require("mongoose");

var OrderSchema = new mongoose.Schema({
  Customer: String,
  Date: Date,
  IsDelivered: Boolean,
  Value: Number
});

mongoose.model("Order", OrderSchema);

module.exports = mongoose.model("Order");
