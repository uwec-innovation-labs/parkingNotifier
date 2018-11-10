module.exports = app => {
  var statController = require("../controllers/stats");

  app
  	.route("/stats")
  	.get([statController.countUsers, statController.countMessagesSent, statController.countChecksPerDay]);
  	//.get(statController.countMessagesSent)
  	//.get(statController.countChecksPerDay)
};