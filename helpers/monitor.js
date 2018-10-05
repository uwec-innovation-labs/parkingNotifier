const axios = require("axios");
const cheerio = require("cheerio");

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
        // False-Positive test. Sucess. Alternate-side parking is in effect.
        process.env.DB_STATUS = true;
      } else {
        // False-Positive test. Failure. Alternate-side parking not in effect.
        process.env.DB_STATUS = false;
      }
    }
  },
  // unsuccessful response. Log error.
  error => console.log(err)
);
