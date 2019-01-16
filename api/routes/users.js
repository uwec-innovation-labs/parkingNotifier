var jwt = require("jsonwebtoken");
module.exports = app => {
  var userController = require("../controllers/users");

  app
    .route("/users")
    .get(checkToken, userController.getAllUsers)
    .post(userController.addUser)
    .delete(userController.deleteUser);

  app.route("/confirmation/:confirmCode").post(userController.confirmEmail);

  app.route("/users/unsubscribe").post(userController.deleteUser);

  app
    .route("/users/subscribed")
    .get(checkToken, userController.getSubscribedUsers);
};

const checkToken = (req, res, next) => {
  console.log(req.headers.token);
  const localToken = req.headers.token;

  if (localToken == process.env.JWT_SECRET) {
    next();
  } else {
    //If localToken is undefined return Forbidden (403)
    res.sendStatus(403);
  }
};
