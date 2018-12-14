module.exports = app => {
  const getenv = require("getenv");
  const twilio = require("twilio");
  const mongoose = require("mongoose");
  const request = require("request");
  const date = require("date-and-time");
  const User = require("../models/user");
  const Numbers = require("../models/numbers");

  // import environment variables from .env file
  require("dotenv").config({ path: "../.env" });

  const client = new twilio(
    process.env.TWILIO_USERNAME,
    process.env.TWILIO_TOKEN
  );

  findUsers();

  function callNumbers(userList, fromNumbers) {
    var i = 1;

    //calculate the start and end date
    var startDate = new Date();
    startDate.setDate(startDate.getDate() + 1);
    var endDate = new Date();
    endDate = date.addDays(startDate, 3);

    var formattedStartDate = date.format(startDate, "MM/DD/YY");
    var formattedEndDate = date.format(endDate, "MM/DD/YY");

    // message that will be sent to all users
    var body = `Alternate Side Parking Notification: Alternate side parking will be in effect from 
     ${formattedStartDate} until ${formattedEndDate} at 5:00pm. Parking is enforced between midnight and 5:00pm each day.`;

    console.log(body); //testing purposes.

    userList.forEach(u => {
      var groupId = u.groupId;
      var fromNumber = fromNumbers[groupId];
      var message = client.messages
        .create({
          body: body,
          from: fromNumber,
          to: u.number
        })
        .then((i = i + 1))
        .catch(e => {
          if (e.code == 21211) {
            console.error("The number " + u.number + " is invalid");
          } else {
            console.error(e.message);
          }
        });
      console.log("Here\n");
      //.done();
    });
  }

  function findUsers() {
    var userList = [];
    User.find((err, users) => {
      if (err) return console.error(err);
      return users;
    }).then(users => {
      users.forEach(user => {
        userList.push(user.phoneNumber);
        console.log("number added: " + user.phoneNumber);
        console.log(userList);
      });
      getFromNumbers(userList);
    });
  }

  function getFromNumbers(userList) {
    var fromNumbers = [];
    Numbers.find((err, n) => {
      if (err) return console.error(err);
      return n;
    }).then(n => {
      n.forEach(num => {
        fromNumbers.push(num);
        console.log("Got from number " + num);
      });
      callNumbers(userList, fromNumbers);
    });
  }
};
