module.exports = app => {
  var userController = require("../controllers/users");

  app
    .route("/users")
    .get(userController.getAllUsers)
    .post(userController.addUser)
    .delete(userController.deleteUser);

  app.route("/users/:username").get(userController.getUser);

  app.route("/users/unsubscribe").post(userController.deleteUser);
};
