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
    select: true
  },
  username: {
    //email
    type: String,
    required: true,
    unique: true
  },
  confirmCode: {
    type: String,
    required: true
  },
  subscribed: {
    type: Boolean,
    default: false,
    required: true
  }
});

userSchema.plugin(uniqueValidator);
let User = (module.exports = mongoose.model("User", userSchema));
