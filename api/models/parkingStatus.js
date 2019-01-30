let mongoose = require("mongoose");

let parkingStatusSchema = mongoose.Schema({
  inEffect: {
    type: Boolean,
    required: true,
    select: true
  },
  start: {
    type: Date,
    required: false,
    select: true
  },
  end: {
    type: Date,
    require: false,
    select: true
  },
  timestamp: {
    type: Date,
    require: true,
    select: true
  }
});

let ParkingStatus = (module.exports = mongoose.model(
  "ParkingStatus",
  parkingStatusSchema
));
