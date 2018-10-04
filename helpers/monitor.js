const axios = require("axios");
const cheerio = require("cheerio");
// const mongoose = require("mongoose");

// mongoose.connect(
//   "mongodb://user:password@ds113703.mlab.com:13703/parking-notifier",
//   { useNewUrlParser: true }
// );
// let db = mongoose.connection;

// //Check for connections
// db.once("open", function() {
//   console.log("Connected to MongoDB");
// });

// //Check for DB errors
// db.on("error", function(err) {
//   console.log(err);
// });

axios.get("http://www.ci.eau-claire.wi.us/").then(
  response => {
    var success = false;
    if (response.status === 200) {
      const html = response.data;
      const $ = cheerio.load(html); // loads html into parsable format
      var topNav = $("#top_nav"); //searches for the 'top_nav' id in the html
      var topNavText = topNav.text();
      if (topNavText.includes("Contact Us")) {
        // checks for existing top nav
        success = true;
        console.log("Webscrape of Eau Claire Website Result: True");
      } else {
        success = false;
      }
    }
  },
  error => console.log(err)
);
