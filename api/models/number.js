let mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");

let numberSchema = mongoose.Schema({
    groupID: {
      type: String,
      required: true,
      select: true
    },
    phoneNumber: {
      type: String,
      required: true,
      select: true,
      unique: true
    },
    timesUsed: {
      type: String,
      required: true,
      select: true
    }
  });
  
  numberSchema.plugin(uniqueValidator);
  var Number = (module.exports = mongoose.model("Number", numberSchema));