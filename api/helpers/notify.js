module.exports = app => {
  const twilio = require("twilio")(
    process.env.TWILIO_USERNAME,
    process.env.TWILIO_TOKEN
  );
  const date = require("date-and-time");
  const User = require("../models/user");

  // import environment variables from .env file
  require("dotenv").config({ path: "../.env" });

  const service = twilio.notify.services(process.env.TWILIO_NOTIFY_SERVICE_SID);

  function callNumbers(userList) {
    console.log("called callNumbers");
    var i = 1;

    //calculate the start and end date
    var startDate = new Date();
    startDate.setDate(startDate.getDate() + 1);
    var endDate = new Date();
    endDate = date.addDays(startDate, 3);

    var formattedStartDate = date.format(startDate, "MM/DD/YY");
    var formattedEndDate = date.format(endDate, "MM/DD/YY");

    // message that will be sent to all users
    var body = `Alternate side parking is in effect from ${formattedStartDate} until ${formattedEndDate} at 5pm. Parking is enforced between midnight and 5pm each day. Details: parkingnotifier.com`;

    //console.log(body); //testing purposes.
    for (i = 0; i < 1; i++) {
      var bindings = userList.map(user => {
        return JSON.stringify({
          binding_type: "sms",
          address: user.phoneNumber
        });
      });

      notification = service.notifications
        .create({
          toBinding: bindings,
          body: body
        })
        .then(() => {
          console.log(bindings);
          console.log(notification);
        })
        .catch(err => {
          console.error(err);
        });
    }
  }

  function findUsers() {
    console.log("Called findUsers");
    var userList = [];
    User.find((err, users) => {
      if (err) return console.error(err);
      return users;
    }).then(users => {
      users.forEach(user => {
        userList.push(user);
      });
      callNumbers(userList, []);
    });
  }

  findUsers();
};
