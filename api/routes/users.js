module.exports = app => {
  var userController = require("../controllers/users");

  app
    .route("/users")
    .get(userController.listUsers)
    .post(userController.addUser);
};
