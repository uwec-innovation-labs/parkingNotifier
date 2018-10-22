// require all the dependencies
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");

var userRoutes = require("./routes/users");
var statRoutes = require("./routes/stats");

// import environment variables from .env file
require("dotenv").config();

// create an instance of express
const app = express();
var port = process.env.PORT || 9000;

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
        },
        useNewUrlParser: true
      }
    )
    .then(() => {
      console.log("Connected to database");
    })
    .catch(err => {
      console.log(
        "This error could be because of a missing .env file. Make sure you have created your own:"
      );
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

userRoutes(app);
statRoutes(app);

/***** ERROR PAGES *****/
app.use(function(req, res) {
  res.status(404);
  res.json({
    status: "failed",
    message: "This resource does not exist",
    apiDocumentation: "https://github.com/UWEC-ITC/parkingNotifier-API"
  });
});

app.use(function(error, req, res, next) {
  res.status(500);
  console.log(error);
  res.json({
    status: "failed",
    message: "Server error",
    apiDocumentation: "https://github.com/UWEC-ITC/parkingNotifier-API"
  });
});

app.listen(port, function() {
  console.log("API listening on port ", port);
});

// exporting the app module
module.exports = app;
