//listNumbers - to print all the number info to the console
//addNumber - to add a phone number to Mongoose

//userDeleted - to decrement the phone number the user was associated with

const mongoose = require('mongoose');
var Number = require("../models/number");

mongoose.model("Number");

exports.listNumbers = (req, res) => {
    Number.find((err, numbers) => {
        if (err) return console.error(err);
        res.status(200);
        res.send({
          numbers
        });
    });
}

exports.addNumber = (req, res) => {
    if (!req.body.phoneNumber) {
      res.status(400);
      res.json({
        success: false,
        message:
          "Please enter a phone number",
        apiDocumentation: "https://github.com/UWEC-ITC/parkingNotifier-API"
      });
      return;
    } else {
      var newNumber = new Number({
        groupID: req.body.groupID,
        phoneNumber: req.body.phoneNumber,
        timesUsed: 0
      });
      console.log("Number:" + newNumber);
      
      // attempt to save the number
      newNumber.save(err => {
        if (err) {
          console.log(err);
          return res.json({ success: false, message: err });
        }
        res.json({
          success: true,
        });
      });
    }
  };

  exports.nextNumber = (req, res) => {
    var query = Number.find().sort({timesUsed:-1}).limit(1);
    query.exec(function(err, number) {
      var timesUsed = parseInt(number.timesUsed);
      console.log("before " + timesUsed);
      if (err) return console.error(err);
      if (timesUsed > 249) return console.error("No numbers available");
      res.status(200);
      timesUsed += 1;
      Number.update({_id: number._id}, {$set:{timesUsed: timesUsed}});
      res.send({
        number
      });
      console.log("sending " + number);
      console.log("after " + number.timesUsed);
    });
  };

  exports.userDeleted = (req, res) => {
    var groupID = res.body.groupID;
    Numbers.find({groupID: groupID}).exec(function(err, number) {
        number.timesUsed -= 1;
        number.save();
    });
  };