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
        /*numbers.forEach(function(number) {
          console.log("Number " + number);
          console.log(number.groupID);
          console.log(number.phoneNumber);
          console.log(number.timesUsed);
        });*/
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
    
    Number.find().sort({timesUsed: 1}).limit(1).findOne({}, (err, number) => {
      if (err) {
        console.err(err);
      }

      var tu = parseInt(number.timesUsed, 10);
      if (tu == 250) {
         console.log("No numbers available");
         res.status(200);
         res.status(200).send(null);
      } else {
  
        tu += 1;
        var times_used = "" + tu;
        Number.findOneAndUpdate(
          {_id: number.id},
          {$set: {timesUsed: times_used}}, 
          (err, number) => {
            if (err) {
              console.err(err);
            }
          }
        );
        res.status(200);
        res.status(200).send(number);
      }
    });
  };

  exports.userDeleted = (req, res) => {
    Number.findOne({}, (err, number) => {
      if (err || number == null) {
        //console.err(err);
        console.log("error here");
      }
      console.log(number);
      var tu = parseInt(number.timesUsed, 10);
      tu -= 1;
      var times_used = "" + tu;
      Number.findOneAndUpdate(
        {_id: number.id},
        {$set: {timesUsed: times_used}}, 
        (err, number) => {
          if (err) {
            //console.err(err);
console.log("error here2");
          }
        }
      );
    });
  };