let mongoose = require("mongoose");

//Subscriber Schema
let userSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    select: false
  },
  lastName: {
    type: String,
    required: true,
    select: false
  },
  phoneNumber: {
    type: String,
    required: true,
    select: false
  },
  username: {
    type: String,
    required: true
  },
  subscribed: {
    type: Boolean,
    required: true
  }
});

let User = (module.exports = mongoose.model("User", userSchema));
