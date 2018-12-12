//module.exports = app => {
const dotenv = require("dotenv").config();
//const getenv = require("getenv");
const twilio = require("twilio");
const mongoose = require("mongoose");
const request = require("request");
const date = require("date-and-time");
//var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

// const client = new twilio(
//   process.env.TWILIO_USERNAME,
//   process.env.TWILIO_TOKEN
// );
var numbers = [];
callNumbers(numbers);

request("http://localhost:9000/users", { json: true }, (err, res, body) => {
  var numbers = [];
  var users = body;
  users.forEach(user => {
    numbers.push("+1" + user.phone);
  });
  callNumbers(numbers);
});

// const katieNumber = "+17156122163";

function callNumbers(numbers) {
  // var numbers = [katieNumber];

  var i = 1;

  //calculate the start and end date
  var startDate = new Date();
  startDate.setDate(startDate.getDate() + 1);
  var endDate = new Date();
  endDate = date.addDays(startDate, 3);

  var formattedStartDate = date.format(startDate, "MM/DD/YY");
  var formattedEndDate = date.format(endDate, "MM/DD/YY");

  var message = `Alternate Side Parking Notification: Alternate side parking will be in effect from 
     ${formattedStartDate} until ${formattedEndDate} at 5:00pm. Parking is enforced between midnight and 5:00pm each day.`;

  console.log(message); //testing purposes.

  numbers.forEach(number => {
    var message = client.messages
      .create({
        body: process.env.TWILIO_MESSAGE,
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
  });
}
//};
