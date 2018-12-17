var mongoose = require("mongoose");
var User = require("../models/user");

mongoose.model("User");

exports.getStats = (req, res) => {
  User.count({ subscribed: true }, (err, count) => {
    res.status(200);
    res.json({
      count: count
    });
  });
};
