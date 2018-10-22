module.exports = app => {
  var statusController = require("../controllers/status");

  app.route("/status").get(statusController.getStatus);
};
