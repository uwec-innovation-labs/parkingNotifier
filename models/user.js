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
  email: {
    type: String,
    required: true
  },
  subscribed: {
    type: Boolean,
    required: true
  }
});

let User = (module.exports = mongoose.model("User", userSchema));

//user name which can be parsed out of UW email address
