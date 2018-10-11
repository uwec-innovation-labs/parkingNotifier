// require all the dependencies
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const morgan = require("morgan");

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

// request logging
app.use(morgan("tiny"));

// configure app to use bodyParser
app.use(
  bodyParser.urlencoded({
    extended: true
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
  // subscribe a user
  .post(function(req, res) {
    if (!req.body.name || !req.body.email || !req.body.phone) {
      res.status(400);
      res.send({
        success: false,
        message:
          "Please include a first and last name, UWEC email address, and phone number to create a user",
        apiDocumentation: "https://github.com/UWEC-ITC/parkingNotifier-API"
      });
      return;
    } else if (
      req.body.email.replace(/.*@/, "") == 0 ||
      req.body.email.replace(/.*@/, "") !== "uwec.edu"
    ) {
      res.status(400);
      res.send({ message: "Email must be a UWEC email" });
      return;
    } else {
      var newUser = new User({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone
      });

      // attempt to save the user
      newUser.save(function(err) {
        if (err) {
          return res.json({ success: false, message: err.errmsg });
        }
        res.json({ success: true, message: "Successfully created new user" });
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
