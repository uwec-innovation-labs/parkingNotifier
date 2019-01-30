var mongoose = require("mongoose");
var ParkingStatus = require("../models/parkingStatus");

mongoose.model("ParkingStatus");

exports.getStatus = (req, res) => {
  ParkingStatus.find((err, parkingStatus) => {
    if (err) return console.error(err);
    res.status(200).send(parkingStatus);
  });
};

exports.deleteStatus = (req, res, next) => {
  ParkingStatus.deleteMany({}, (err, parkingStatus) => {
    if (err) res.send(err);
    res.json({
      success: true,
      message: "Successfully cleared parkingStatusDatabase",
      parkingStatus: parkingStatus
    });
  });
};
