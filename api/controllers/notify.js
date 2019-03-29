var notify = require("../helpers/notify");

exports.createMessage = (req, res) => {
  if (!req.body.message) {
    res.status(400);
    res.json({
      success: false,
      message: "There was no mesaage body",
      apiDocumentation: "https://github.com/UWEC-ITC/parkingNotifier-API"
    });
    return;
  }
  var message = req.body.message;

  res.json({
    success: true,
    message: "Successfully created new message and passed it to notify"
  });
  console.log("Message: " + message);
  notify(message);
};
