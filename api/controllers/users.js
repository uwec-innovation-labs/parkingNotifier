var mongoose = require("mongoose");
var User = require("../models/user");
const axios = require("axios");

mongoose.model("User");

exports.listUsers = (req, res) => {
  User.find((err, users) => {
    if (err) return console.error(err);
    res.status(200);
    res.send({
      users
    });
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
    //console.log("BODY: " + req.body.firstName);
    var newUser = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phoneNumber: req.body.phoneNumber,
      username: req.body.username,
      subscribed: true,
      groupID: req.body.groupID
    });
    //console.log("User:" + newUser);
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
  User.count({ username: req.body.username }, (err, count) => {
    // make sure that the user exists
    if (count > 0) {
      // remove the user that matches the username
        
      //free up the phone number
        try {
          axios.post(`http://localhost:9000/numbers/unsubscribe`, req.body);
        } catch (err) {
          console.error(err);
          process.exit(1);
        }

        if (err) res.send(err);
        res.json({ success: true, message: "Successfully unsubscribed" });
    } else {
      res.status(400);
      res.json({
        success: false,
        message: "User with that username does not exist"
      });
    }
  });
};
