module.exports = app => {
  var userController = require("../controllers/users");

  app
    .route("/users")
    .get(userController.listUsers)
    .post(userController.addUser);

  app
    .route("/users/:username")
    .get(userController.getUser);

  app
    .route("/users/unsubscribe")
    .post(userController.deleteUser);
};
