let mongoose = require("mongoose");

let statusSchema = mongoose.Schema({
  alternateParking: {
    type: Boolean,
    required: true
  },
  timestamp: {
    type: String,
    required: true
  },
  streetSide: {
    type: String,
    required: true
  },
  expirationDate: {
    type: String,
    require: true
  }
});

let Status = (module.exports = mongoose.model("Status", statusSchema));
