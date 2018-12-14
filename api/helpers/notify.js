module.exports = app => {
  const getenv = require("getenv");
  const twilio = require("twilio");
  const mongoose = require("mongoose");
  const request = require("request");
  const date = require("date-and-time");
  const User = require("../models/user");

  // import environment variables from .env file
  require("dotenv").config({ path: "../.env" });

  const client = new twilio(
    process.env.TWILIO_USERNAME,
    process.env.TWILIO_TOKEN
  );

  var numbers = findUsers();
  console.log(numbers);

  function callNumbers(numbers) {
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

    numbers.forEach(number => {
      var message = client.messages
        .create({
          body: body,
          from: getenv("TWILIO_FROM" + Math.round(i / 250)),
          to: number
        })
        .then((i = i + 1))
        .catch(e => {
          if (e.code == 21211) {
            console.error("The number " + number + " is invalid");
          } else {
            console.error(e.message);
          }
        });
      console.log("Here\n");
      //.done();
    });
  }

  function findUsers() {
    var numbers = [];
    User.find((err, users) => {
      if (err) return console.error(err);
      return users;
    }).then(users => {
      users.forEach(user => {
        numbers.push(user.phoneNumber);
        console.log("number added: " + user.phoneNumber);
        console.log(numbers);
      });
      callNumbers(numbers);
    });
    return numbers;
  }
};
