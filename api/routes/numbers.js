module.exports = app => {
  var numberController = require("../controllers/numbers");

  app
    .route("/numbers")
    .get(numberController.listNumbers)
    .post(numberController.addNumber);

  app
    .route("/numbers/next").get(numberController.nextNumber);

  app
    .route("/numbers/unsubscribe").post(numberController.userDeleted);
};
