var mongoose = require("mongoose");
var Crypto = require("crypto-js");
var User = require("../models/user");
var emailController = require("../helpers/email");
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
    res.status(400);
    res.json({
      success: false,
      message:
        "Please include a first and last name, UWEC email address, and phone number to create a user",
      apiDocumentation: "https://github.com/UWEC-ITC/parkingNotifier-API"
    });
    return;
  } else {
    var pn = new PhoneNumber(req.body.phoneNumber, "US");
    if (!pn.isValid()) {
      res.status(400);
      res.json({
        success: false,
        message: "Incorrect phone number"
      });
      return;
    }
    // if (/@uwec.edu\s*$/.test(req.body.username)) {
    //   res.status(400);
    //   res.json({
    //     success: false,
    //     message: "Must be a UWEC email."
    //   })
    // }

    var confirmCode = Crypto.SHA256(
      req.body.username.toLowerCase() +
        Math.random()
          .toString(36)
          .replace("0.", "")
    ).toString();
    var newUser = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phoneNumber: pn.getNumber("e164"),
      username: req.body.username.toLowerCase(),
      confirmCode: confirmCode,
      subscribed: false
    });
    console.log("User:" + newUser);
    // attempt to save the user
    newUser.save(err => {
      if (err) {
        return res.json({ success: false, message: err });
      }
      emailController.sendEmail(
        req.body.firstName,
        req.body.username.toLowerCase(),
        confirmCode
      );
      res.json({
        success: true,
        message: "Successfully created new user"
      });
    });
  }
};

exports.confirmEmail = (req, res) => {
  if (!req.params.confirmCode) {
    res.status(400);
    res.json({
      success: false,
      message: "No confirm code included"
    });
    return;
  }

  User.count(
    { confirmCode: req.params.confirmCode, subscribed: false },
    (err, count) => {
      if (count > 0) {
        User.findOneAndUpdate(
          { confirmCode: req.params.confirmCode },
          { subscribed: true },
          (err, user) => {
            if (err) res.send(err);
            res.status(200);
            res.json({
              success: true,
              message:
                "Your email is now confirmed. You will receive notifications."
            });
          }
        );
      } else {
        res.status(200);
        res.json({
          success: false,
          message:
            "Either you're already subscribed or the confirmation code is incorrect."
        });
      }
    }
  );
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
