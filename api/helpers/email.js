// Load the AWS SDK for Node.js
var AWS = require("aws-sdk");
// Set the region
AWS.config.update({ region: "us-east-1" });

exports.sendEmail = (email, verificationCode) => {
  // Create sendEmail params
  var params = {
    Destination: {
      ToAddresses: [email]
    },
    Message: {
      /* required */
      Body: {
        /* required */
        Html: {
          Charset: "UTF-8",
          Data: `<a href="parkingnotifier.com/${verificationCode}">Confirm Email</a>`
        },
        Text: {
          Charset: "UTF-8",
          Data: "TEXT_FORMAT_BODY"
        }
      },
      Subject: {
        Charset: "UTF-8",
        Data: "Parking Notifier - Confirm Email"
      }
    },
    Source: "noreply@parkingnotifier.com" /* required */
  };

  // Create the promise and SES service object
  var sendPromise = new AWS.SES({ apiVersion: "2010-12-01" })
    .sendEmail(params)
    .promise();

  // Handle promise's fulfilled/rejected states
  sendPromise
    .then(function(data) {
      console.log(data.MessageId);
    })
    .catch(function(err) {
      console.error(err, err.stack);
    });
};
