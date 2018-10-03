const axios = require("axios");
const cheerio = require("cheerio");
// const mongoose = require("mongoose");

// mongoose.connect(
//   "mongodb://proto:T97NrRJnp5d95MPvQvcpWZ60TGFhPuzS@ds113703.mlab.com:13703/parking-notifier",
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
      const $ = cheerio.load(html);
      var topNav = $("#top_nav");
      var topNavText = topNav.text();
      if (topNavText.includes("Contact Us")) {
        success = true;
        console.log("Webscrape of Eau Claire Website Result: True");
      } else {
        success = false;
      }
    }
  },
  error => console.log(err)
);
