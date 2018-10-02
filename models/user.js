let mongoose = require("mongoose");

//Subscriber Schema
let userSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  subscribed: {
    type: Boolean,
    required: true
  }
});

let User = (module.exports = mongoose.model("User", userSchema));
