module.exports = app => {
  var parkingStatusController = require("../controllers/parkingStatus");

  app
    .route("/status")
    .get(parkingStatusController.getStatus)
    .delete(parkingStatusController.deleteStatus);
};
