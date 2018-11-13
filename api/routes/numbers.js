module.exports = app => {
  var numberController = require("../controllers/numbers");

  app
    .route("/numbers")
    .get(numberController.listNumbers)
    .post(numberController.addNumber)
    .delete(numberController.userDeleted);

  app
    .route("/numbers/next").get(numberController.nextNumber);
};
