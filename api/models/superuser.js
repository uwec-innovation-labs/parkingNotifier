const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const SuperuserSchema = new Schema({
  first: {
    type: String,
    required: true
  },
  last: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

module.exports = Superuser = mongoose.model("superusers", SuperuserSchema);
