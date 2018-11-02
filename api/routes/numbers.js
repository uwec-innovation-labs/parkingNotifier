module.exports = app => {
  var numberController = require("../controllers/numbers");

  app
    .route("/numbers")
    .get(numberController.listNumbers)
    .put(numberController.addNumber)
    .post(numberController.userAdded)
    .delete(numberController.userDeleted);

};
