const axios = require("axios");
const cheerio = require("cheerio");

axios.get("http://www.ci.eau-claire.wi.us/").then(
  response => {
    if (response.status === 200) {
      const html = response.data;
      const $ = cheerio.load(html);
      const body = $("#top_nav");
      const bodyText = body.text();
      console.log(bodyText);
      //console.log($("#home_link_shield"));
    }
  },
  error => console.log(err)
);
