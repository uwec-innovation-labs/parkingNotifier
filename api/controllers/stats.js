var mongoose = require("mongoose");
var User = require("../models/user");

mongoose.model("User");

exports.countUsers = (req, res) => {
  User.countDocuments({}, (err, count) => {
    res.status(200);
    res.json({
      count: count
    });
  });
};
