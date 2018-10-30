let mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");

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
    required: true,
    unique: true
  },
  subscribed: {
    type: Boolean,
    required: true
  }
  /////// need to add attribute for twilio account number
});

userSchema.plugin(uniqueValidator);
let User = (module.exports = mongoose.model("User", userSchema));
