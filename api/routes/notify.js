module.exports = app => {
  var notifyController = require("../controllers/notify");
  var passport = require("passport");

  app
    .route("/dashboard/notify")
    .post(
      passport.authenticate("jwt", { session: false }),
      notifyController.createMessage
    );
};
