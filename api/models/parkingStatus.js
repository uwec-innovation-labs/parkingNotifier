let mongoose = require("mongoose");

let parkingStatusSchema = mongoose.Schema({
  inEffect: {
    type: Boolean,
    required: true
  },
  start: {
    type: String,
    required: false
  },
  end: {
    type: String,
    require: false
  }
});

let ParkingStatus = (module.exports = mongoose.model(
  "ParkingStatus",
  parkingStatusSchema
));
