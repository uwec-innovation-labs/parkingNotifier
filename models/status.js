let mongoose = require("mongoose");

let statusSchema = mongoose.Schema({
  active: {
    type: Boolean,
    required: true
  }
});
