let mongoose = require("mongoose");

//Subscriber Schema
let subscriberSchema = mongoose.Schema({
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

let Subscriber = (module.exports = mongoose.model(
  "Subscriber",
  subscriberSchema
));
