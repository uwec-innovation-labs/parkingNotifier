// require all the dependencies
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");
const CronJob = require("cron").CronJob;
var cors = require("cors");
var swaggerJSDoc = require("swagger-jsdoc");
var fs = require("fs");
var path = require("path");

var userRoutes = require("./routes/users");
var statRoutes = require("./routes/stats");
var parkingStatusRoutes = require("./routes/parkingStatus");
var monitorHelper = require("./helpers/monitor");

// import environment variables from .env file
require("dotenv").config();

// create an instance of express
const app = express();
var port = process.env.PORT || 9000;

// connect to the database
console.log("Trying to connect to " + process.env.DB_HOST);
mongoose
  .connect("mongodb://" + process.env.DB_HOST, {
    user: process.env.DB_USER,
    pass: process.env.DB_PASS,
    useNewUrlParser: true
  })
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
parkingStatusRoutes(app);
var swaggerSpec = swaggerJSDoc(require("./swaggerConfig").options);

app.get("/api-docs.json", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpec);
});

app.get("/docs", (req, res) => {
  fs.createReadStream(path.join(__dirname, "redoc.html")).pipe(res);
});

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
  "30 17 * * * ", //runs at 5:30pm everyday
  //"*/15 * * * * *", //runs every 15 seconds (testing purposes only)
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
