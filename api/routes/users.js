module.exports = app => {
  var userController = require("../controllers/users");
  var passport = require("passport");

  app
    .route("/users")
    .get(
      passport.authenticate("jwt", { session: false }),
      userController.getAllUsers
    )
    .post(userController.addUser)
    .delete(userController.deleteUser);

  app.route("/confirmation/:confirmCode").post(userController.confirmEmail);

  app
    .route("/users/subscribed")
    .get(
      passport.authenticate("jwt", { session: false }),
      userController.getSubscribedUsers
    );
};
