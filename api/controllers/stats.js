var mongoose = require("mongoose");
var User = require("../models/user");

mongoose.model("User");

exports.getStats = (req, res) => {
  User.count((err, total) => {
    res.status(200);
    User.count({ subscribed: true }, (err, confirmed) => {
      res.json({
        count: total,
        confirmed: confirmed,
        unconfirmed: total - confirmed
      });
    });
  });
};
