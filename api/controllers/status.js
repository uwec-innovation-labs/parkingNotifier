var mongoose = require("mongoose");
var Status = require("../models/status");

mongoose.model("Status");

exports.getStatus = (req, res) => {
  Status.find((err, currentStatus) => {
    if (err) return console.error(err);
    res.status(200);
    res.send({
      currentStatus
    });
  });
};
