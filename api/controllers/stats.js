var mongoose = require("mongoose");
var User = require("../models/user");
var Analytics = require("../models/analytics");

mongoose.model("User");

exports.countUsers = (req, res) => {
  User.countDocuments({}, (err, count) => {
    res.status(200);
    res.json({
      count: count
    });
  });
};

mongoose.model("Analytics");

exports.countMessagesSent = (req, res) => {
  Analytics.find({}, (err, messagesSent) => {
    if (err) return console.error(err);
    res.status(200);
    res.send({
      messagesSent
    });
  });
};

exports.countChecksPerDay = (req, res) => {
  Analytics.find({}, (err, webScrapesPerDay) => {
  	if (err) return console.error(err);
    res.status(200);
    res.send({
      webScrapesPerDay
    });
  });
};
