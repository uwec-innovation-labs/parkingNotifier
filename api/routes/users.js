module.exports = app => {
  var userController = require("../controllers/users");

  app
    .route("/users")
    .get(userController.getAllUsers)
    .post(userController.addUser)
    .delete(userController.deleteUser);

  app.route("/confirmation/:confirmCode").post(userController.confirmEmail);

  app.route("/users/unsubscribe").post(userController.deleteUser);
};
