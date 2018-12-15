var mongoose = require("mongoose");
var User = require("../models/user");
var PhoneNumber = require("awesome-phonenumber");

mongoose.model("User");

exports.getAllUsers = (req, res) => {
  User.find((err, user) => {
    if (err) {
      console.log(err);
    }
    res.status(200).send(user);
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

exports.addUser = (req, res) => {
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
    console.log("BODY: " + req.body.firstName);
    var pn = new PhoneNumber(req.body.phoneNumber, "US");
    if (!pn.isValid()) {
      res.status(400);
      res.json({
        success: false,
        message: "Incorrect phone number"
      });
      return;
    }
    console.log(pn.getNumber("e164"));
    var newUser = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phoneNumber: pn.getNumber("e164"),
      username: req.body.username.toLowerCase(),
      subscribed: true
    });
    console.log("User:" + newUser);
    // attempt to save the user
    newUser.save(err => {
      if (err) {
        console.log(err);
        return res.json({ success: false, message: err });
      }
      res.json({
        success: true,
        message: "Successfully created new user"
      });
    });
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
        message: "User with that email does not exist"
      });
    }
  });
};
