//listNumbers - to print all the number info to the console
//addNumber - to add a phone number to Mongoose
//userAdded - to associate the new user with the next available phone number and incrememnt it
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
      console.log("Added number " + req.body.phoneNumber);
      
      //find last used group number, next one should be +1
      var newGroupID;
      Numbers.findOne().sort('groupID').exec(function(err, number) {
        newGroupID = number.groupID + 1;
      });

      var newNumber = new Number({
        groupID: newGroupID,
        phoneNumber: req.body.phoneNumber,
        timesUsed: 0
      });
      
      // attempt to save the number
      newNumber.save(err => {
        if (err) {
          console.log(err);
          return res.json({ success: false, message: err });
        }
        res.json({
          success: true,
          message: "Successfully added new number"
        });
      });
    }
  };

  exports.userAdded = (req, res) => {
    var foundNumber = false;
    var groupID = 1;
    var phoneNumber;
    while (!foundNumber) {
        Numbers.find({groupID: groupID}).exec(function(err, number) {
            if (err) res.send(err);
            if (number.timesUsed > 249) {
                groupID += 1;
            } else {
                foundNumber = true;
                phoneNumber = number.phoneNumber;
                number.timesUsed += 1;
                number.save();
            }
        });
    }
    if (!foundNumber) {
      console.log("All the numbers are at their maximum amount of users, was unable to add new user");
      return null;
    } else {
      return phoneNumber;
    }
  };

  exports.userDeleted = (req, res) => {
    var groupID = res.body.groupID;
    Numbers.find({groupID: groupID}).exec(function(err, number) {
        number.timesUsed -= 1;
        number.save();
    });
  };