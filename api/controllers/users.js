var mongoose = require("mongoose");
var User = require("../models/user");
var Number = require("../models/number");
const axios = require("axios");

mongoose.model("User");

exports.getAllUsers = (req, res) => {
  User.find((err, users) => {
    res.status(200).send(users);
  });
};

exports.getUser = (req, res) => {
  // check to see that the user included
  if (!req.params.username) {
    res.json({
      success: false,
      message: "Please include a username to get the info for."
    });
    return;
  }

  User.findOne({ username: req.params.username }, (err, user) => {
    if (err) {
      console.err(err);
    }
    console.log(user);
    res.status(200).send(user);
  });
};

exports.addUser = async function addUser(req, res) {
  console.log(req.body);
  if (
    !req.body.firstName ||
    !req.body.lastName ||
    !req.body.phoneNumber ||
    !req.body.username
  ) {
    console.log("BODY!:" + req.body.firstName);
    res.status(400);
    res.json({
      success: false,
      message:
        "Please include a first and last name, UWEC email address, and phone number to create a user",
      apiDocumentation: "https://github.com/UWEC-ITC/parkingNotifier-API"
    });
    return;
  } else {
    try {
      //get the next number
      //should add a check if there is no next number

      var newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phoneNumber: req.body.phoneNumber,
        username: req.body.username,
        subscribed: true
      });

      // attempt to save the user
      newUser.save(err => {
        if (err) {
          console.log(err);
          return res.json({ success: false, message: err });
        }
        console.log("made user");
        res.json({
          success: true,
          message: "Successfully created new user"
        });
      });
    } catch (err) {
      console.error(err);
      process.exit(1);
    }
  }
};

exports.deleteUser = (req, res) => {
  console.log(req.body.email);
  if (!req.body.email) {
    res.status(400);
    res.json({
      success: false,
      message: "No email to unsubscribe included"
    });
    return;
  }
  User.count({ username: req.body.email }, (err, count) => {
    // make sure that the user exists
    if (count > 0) {
      // remove the user that matches the email number
      User.findOneAndRemove({ username: req.body.email }, (err, user) => {
        if (err) res.send(err);
        res.json({
          success: true,
          message: "Successfully unsubscribed",
          user: user
        });
      });
    } else {
      res.status(400);
      res.json({
        success: false,
        message: "User with that username does not exist"
      });
    }
  });
};
