module.exports = app => {
  const getenv = require("getenv");
  const twilio = require("twilio");
  const mongoose = require("mongoose");
  const request = require("request");
  const date = require("date-and-time");

  // import environment variables from .env file
  require("dotenv").config({ path: "../.env" });

  const client = new twilio(
    process.env.TWILIO_USERNAME,
    process.env.TWILIO_TOKEN
  );

  var numbers = [];

  request(
    //"http://api.parkingnotifier.com/users",
    "http://localhost:9000/users",
    { json: true },
    (err, res, body) => {
      var numbers = [];
      var users = body;
      console.log("users: " + JSON.stringify(users));
      Object.keys(users).forEach(user => {
        // console.log(
        //   "Username: " +
        //     JSON.stringify(users[user].username) +
        //     "\nUser phone: " +
        //     JSON.stringify(users[user].phoneNumber)
        // );
        numbers.push("+1" + user.phone);
        console.log("Number Pushed!");
      });
      // callNumbers(numbers);
    }
  );

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
      /*
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
        })
        .done();
        */
    });
  }
};
