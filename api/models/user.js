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
  groupID: {
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
});

userSchema.plugin(uniqueValidator);
let User = (module.exports = mongoose.model("User", userSchema));
