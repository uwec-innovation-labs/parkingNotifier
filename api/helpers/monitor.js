const axios = require("axios");
const cheerio = require("cheerio");
let Status = require("../models/status");

axios.get("http://www.ci.eau-claire.wi.us/").then(
  response => {
    var success = false;

    if (response.status === 200) {
      // reads, loads, and parses html into readable form
      // current version scrapes for top navigation bar
      // final implementation will scrape for alternate parking banner and it's details
      const html = response.data;
      const $ = cheerio.load(html);
      var topNav = $("#top_nav");
      var topNavText = topNav.text();

      if (topNavText.includes("Contact Us")) {
        // gets the date the scrape is performed
        // final implentation will get date from website scrape
        let date = new Date();

        // creates new status and sets attributes
        let status = new Status({
          alternateParking: true,
          timestamp: date.getTime(),
          streetSide: getStreetSide(date)
        });

        console.log(status);

        // saves status to mongodb
        status.save().then(function() {
          console.log("Successfully saved status to DB...");
        });
      } else {
        console.log("Failed");
      }
    }
  },
  // unsuccessful response. Log error.
  error => console.log(err)
);

// pulls the date given to status.timestamp and determines the parking for the day
function getStreetSide(date) {
  var day = date.getDate();
  if (day % 2 === 0) {
    ``;
    return "Even";
  } else {
    return "Odd";
  }
}
