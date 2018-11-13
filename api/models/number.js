let mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");

let numberSchema = mongoose.Schema({
    groupID: {
      type: String,
      required: true,
      select: false
    },
    phoneNumber: {
      type: String,
      required: true,
      select: false
    },
    timesUsed: {
      type: Number,
      required: true,
      select: false
    }
  });
  
  numberSchema.plugin(uniqueValidator);
  var Number = (module.exports = mongoose.model("Number", numberSchema));