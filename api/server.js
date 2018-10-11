// require all the dependencies
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const morgan = require("morgan");
const monitor = require("./helpers/monitor");

// import environment variables from .env file
require("dotenv").config();

// create an instance of express
const app = express();
var port = process.env.PORT || 9000;

// import data models
var User = require("./models/user"); // get our mongoose model
var Status = require("./models/status"); // get our mongoose model

// connect to the database
setTimeout(function() {
  console.log("Trying to connect");
  mongoose
    .connect(
      "mongodb://" + process.env.DB_HOST,
      {
        auth: {
          user: "proto",
          password: "password123"
        }
      }
    )
    .then(() => {
      console.log("mongodb is connected");
    })
    .catch(err => {
      console.error(err);
    });
}, 20000);

// allow CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// request logging
app.use(morgan("tiny"));

// configure app to use bodyParser
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

var apiRouter = express.Router();

apiRouter.get("/", function(req, res) {
  res.status(200);
  res.json({
    success: true,
    apiDocumentation: "https://github.com/UWEC-ITC/parkingNotifier-API"
  });
});

apiRouter.route("/status").get(function(req, res) {
  res.status(200);
  res.json({
    connectionStatus: mongoose.connection.readyState
  });
});

apiRouter
  .route("/users")
  .get((req, res) => {
    User.find((err, users) => {
      if (err) return console.error(err);
      res.status(200);
      res.send({
        users
      });
    });
  })
  // subscribe a user
  .post(function(req, res) {
    if (
      !req.body.firstName ||
      !req.body.lastName ||
      !req.body.phoneNumber ||
      !req.body.username
    ) {
      console.log(req.body);
      res.status(400);
      res.json({
        success: false,
        message:
          "Please include a first and last name, UWEC email address, and phone number to create a user",
        apiDocumentation: "https://github.com/UWEC-ITC/parkingNotifier-API"
      });
      return;
    } else {
      var newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phoneNumber: req.body.phoneNumber,
        username: req.body.username,
        subscribed: true
      });

      // attempt to save the user
      newUser.save(function(err) {
        if (err) {
          console.log(err);
          return res.json({ success: false, message: err });
        }
        res.json({
          success: true,
          message: "Successfully created new user"
        });
      });
    }
  });

// unsubscribe a user
apiRouter.route("/users/:email").delete(function(req, res) {
  User.count({ email: req.params.email }, function(err, count) {
    // make sure that the user exists
    if (count > 0) {
      // remove the user that matches the email number
      User.remove({ email: req.params.email }, function(err, bear) {
        if (err) res.send(err);
        res.json({ success: true, message: "Successfully unsubscribed" });
      });
    } else {
      res.status(400);
      res.json({
        success: false,
        message: "User with that email does not exist"
      });
    }
  });
});

apiRouter.route("/users/:phone").delete(function(req, res) {
  User.count({ phone: req.params.phone }, function(err, count) {
    // make sure that the user exists
    if (count > 0) {
      // remove the user that matches the phone number
      User.remove({ phone: req.params.phone }, function(err, bear) {
        if (err) res.send(err);
        res.json({ success: true, message: "Successfully unsubscribed" });
      });
    } else {
      res.status(400);
      res.json({
        success: false,
        message: "User with that phone number does not exist"
      });
    }
  });
});

app.use("/", apiRouter);

/***** ERROR PAGES *****/
app.use(function(req, res) {
  res.status(404);
  res.json({
    status: "failed",
    apiDocumentation: "https://github.com/UWEC-ITC/parkingNotifier-API"
  });
});

app.use(function(error, req, res, next) {
  res.status(500);
  console.log(error);
  res.json({
    status: "failed",
    apiDocumentation: "https://github.com/UWEC-ITC/parkingNotifier-API"
  });
});

app.listen(port, function() {
  console.log("API listening on port ", port);
});

// exporting the app module
module.exports = app;
