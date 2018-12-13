// require all the dependencies
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");
const CronJob = require("cron").CronJob;
var cors = require("cors");

var userRoutes = require("./routes/users");
var statRoutes = require("./routes/stats");
var statusRoutes = require("./routes/status");
var monitorHelper = require("./helpers/monitor");

// import environment variables from .env file
require("dotenv").config();

// create an instance of express
const app = express();
var port = process.env.PORT || 80;

// connect to the database
console.log("Trying to connect");
mongoose
  .connect(
    "mongodb://" + process.env.DB_HOST,
    {
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

app.use(cors());

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
statusRoutes(app);

/***** ERROR PAGES *****/
app.use((req, res) => {
  res.status(404);
  res.json({
    status: "failed",
    message: "This resource does not exist",
    apiDocumentation: "https://github.com/UWEC-ITC/parkingNotifier-API"
  });
});

app.use((error, req, res, next) => {
  res.status(500);
  console.log(error);
  res.json({
    status: "failed",
    message: "Server error",
    apiDocumentation: "https://github.com/UWEC-ITC/parkingNotifier-API"
  });
});

new CronJob(
  "0 18 * * * ",
  //"*/10 * * * * *",
  () => {
    console.log(
      "[" +
        new Date().toLocaleString("en-US", { timeZone: "America/Chicago" }) +
        "] Eau Claire Web Scrape Triggered"
    );
    monitorHelper(app);
  },
  undefined,
  true,
  "America/Chicago"
).start();

app.listen(port, () => {
  console.log("API listening on port ", port);
});

// exporting the app module
module.exports = app;
