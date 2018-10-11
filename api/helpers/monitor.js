const axios = require("axios");
const cheerio = require("cheerio");
let Status = require("../models/status");

axios.get("http://www.ci.eau-claire.wi.us/").then(
  response => {
    var success = false;

    if (response.status === 200) {
      // successful response. Let's read in the html
      const html = response.data;
      const $ = cheerio.load(html); // loads html into parsable format
      var topNav = $("#top_nav"); // searches for the 'top_nav' id in the html
      var topNavText = topNav.text(); // parse the html into a readable form

      if (topNavText.includes("Contact Us")) {
        let status = new Status({
          alternateParking: true,
          timestamp: new Date().getTime(),
          streetSide: "Odd"
        });

        console.log(status);

        status.save().then(function() {
          console.log("done");
        });
      } else {
        console.log("Failed");
      }
    }
  },
  // unsuccessful response. Log error.
  error => console.log(err)
);
