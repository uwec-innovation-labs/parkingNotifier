var mongoose = require("mongoose");
var ParkingStatus = require("../models/parkingStatus");

mongoose.model("ParkingStatus");

exports.getStatus = (req, res) => {
  ParkingStatus.find((err, parkingStatus) => {
    if (err) return console.error(err);
    res.status(200).send({
      inEffect: parkingStatus.inEffect,
      start: parkingStatus.start,
      end: parkingStatus.end,
      timestamp: parkingStatus.timestamp
    });
  });
};
