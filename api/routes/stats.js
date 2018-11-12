module.exports = app => {
  var statController = require("../controllers/stats");

  app
    .route("/stats")
  	.get(statController.getStats)
};