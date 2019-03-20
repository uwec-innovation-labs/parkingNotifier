module.exports = message => {
  const client = require("twilio")(
    process.env.TWILIO_USERNAME,
    process.env.TWILIO_TOKEN
  );
  const date = require("date-and-time");
  const User = require("../models/user");
  const body = message;

  // import environment variables from .env file
  require("dotenv").config({ path: "../.env" });

  function callNumbers(userList) {
    //calculate the start and end date
    var startDate = new Date();
    startDate.setDate(startDate.getDate() + 1);
    var endDate = new Date();
    endDate = date.addDays(startDate, 3);

    var formattedStartDate = date.format(startDate, "MM/DD/YY");
    var formattedEndDate = date.format(endDate, "MM/DD/YY");

    // message that will be sent to all users
    //var body = `Alternate side parking is in effect from ${formattedStartDate} until ${formattedEndDate} at 5pm. Parking is enforced between midnight and 5pm each day. Details: parkingnotifier.com`;

    userList.map(user => {
      client.messages
        .create({
          body,
          messagingServiceSid: process.env.TWILIO_MESSAGING_SERVICE_SID,
          to: user.phoneNumber
        })
        .then(message => console.log(JSON.stringify(message, null, 2)))
        .done();
    });
  }

  function findUsers() {
    console.log("Called findUsers");
    var userList = [];
    // get all users that are subscribed
    User.find({ subscribed: false }, (err, users) => {
      if (err) return console.error(err);
      return users;
    }).then(users => {
      users.forEach(user => {
        console.log("User: " + JSON.stringify(user));
        userList.push(user);
      });
      callNumbers(userList);
    });
  }
  console.log("Message Body: " + body);
  findUsers();
};
