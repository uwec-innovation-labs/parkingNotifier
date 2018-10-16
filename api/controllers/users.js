var mongoose = require("mongoose");

User = mongoose.model("User");

exports.listUsers = (req, res) => {
  User.find((err, users) => {
    if (err) return console.error(err);
    res.status(200);
    res.send({
      users
    });
  });
};

exports.addUser = (req, res) => {
  if (
    !req.body.firstName ||
    !req.body.lastName ||
    !req.body.phoneNumber ||
    !req.body.username
  ) {
    console.log(req.body);
    res.status(400);
    res.json({
      success: false,
      message:
        "Please include a first and last name, UWEC email address, and phone number to create a user",
      apiDocumentation: "https://github.com/UWEC-ITC/parkingNotifier-API"
    });
    return;
  } else {
    var newUser = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phoneNumber: req.body.phoneNumber,
      username: req.body.username,
      subscribed: true
    });

    // attempt to save the user
    newUser.save(function(err) {
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
  User.count({ email: req.params.email }, (err, count) => {
    // make sure that the user exists
    if (count > 0) {
      // remove the user that matches the email number
      User.remove({ email: req.params.email }, function(err, bear) {
        if (err) res.send(err);
        res.json({ success: true, message: "Successfully unsubscribed" });
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
