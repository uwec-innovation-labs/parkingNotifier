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
        numbers.forEach(function(number) {
          console.log("Number " + number);
          console.log(number.groupID);
          console.log(number.phoneNumber);
          console.log(number.timesUsed);
        });
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
        timesUsed: req.body.timesUsed
      });
      console.log("Number:" + newNumber);
      console.log(newNumber.groupID);
      console.log(newNumber.phoneNumber);
      console.log(newNumber.timesUsed);
      
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
    
    //.sort({timesUsed:-1}).limit(1)
    //query.exec(function(err, number) {
    Number.findOne({}, (err, number) => {
      if (err) {
        console.err(err);
      }
      console.log("Number " + number);
      console.log("groupID " + number.groupID);
      console.log("timesUsed " + number.timesUsed);

      var tu = parseInt(number.timesUsed, 10);
      if (tu > 249) return console.error("No numbers available");
  
      tu += 1;
      Number.update({_id: number._id}, {$set:{timesUsed: tu}});
      res.status(200);
      res.status(200).send(number);
    });
  };

  exports.userDeleted = (req, res) => {
    var groupID = res.body.groupID;
    Numbers.find({groupID: groupID}).exec(function(err, number) {
        number.timesUsed -= 1;
        number.save();
    });
  };