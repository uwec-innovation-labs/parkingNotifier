module.exports = app => {
  var userController = require("../controllers/users");
  var statController = require("../controllers/stats");

  app
    .route("/users")
    .get(userController.listUsers)
    .post(userController.addUser);

  app.route("/stats").get();
};
