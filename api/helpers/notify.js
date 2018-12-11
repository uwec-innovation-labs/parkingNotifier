module.exports = app => {
  const dotenv = require("dotenv").config();
  const getenv = require("getenv");
  const twilio = require("twilio");
  const mongoose = require("mongoose");
  const request = require("request");
  var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

  const client = new twilio(
    process.env.TWILIO_USERNAME,
    process.env.TWILIO_TOKEN
  );

  request("http://localhost:9000/users", { json: true }, (err, res, body) => {
    var numbers = [];
    var users = body;
    users.forEach(user => {
      numbers.push("+1" + user.phone);
    });
    callNumbers(numbers);
  });

  const katieNumber = "+17156122163";

  function callNumbers(numbers) {
    var numbers = [katieNumber];

    var i = 1;
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
};
