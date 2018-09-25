const axios = require("axios");
const cheerio = require("cheerio");

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
        console.log("TRUE");
      }
    }
  },
  error => console.log(err)
);
