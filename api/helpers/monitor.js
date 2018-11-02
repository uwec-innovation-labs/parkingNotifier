module.exports = app => {
  const axios = require("axios");
  const cheerio = require("cheerio");
  const express = require("express");
  const mongoose = require("mongoose");
  const Status = require("../models/status");

  //test mongodb connection (return status: disconnected=0, connected=1, connecting=2, disconnecting=3 )
  console.log(mongoose.connection.readyState);

  axios.get("http://www.ci.eau-claire.wi.us/").then(response => {
    var success = false;

    if (response.status === 200) {
      // reads, loads, and parses html into readable form
      // current version scrapes for top navigation bar
      // final implementation will scrape for alternate parking banner and it's details
      const html = response.data;
      const $ = cheerio.load(html);
      var topNav = $("#top_nav");
      var topNavText = topNav.text();

      //checks if alternate parking banner exists
      if (topNavText.includes("Contact Us")) {
        let date = new Date();

        // creates new status and sets attributes
        let newStatus = {
          alternateParking: true,
          timestamp: date.toLocaleString("en-US", {
            timeZone: "America/Chicago"
          }),
          streetSide: getStreetSide(date),
          expirationDate: getExpirationDate(date).toLocaleString("en-US", {
            timeZone: "America/Chicago"
          })
        };

        new Status(newStatus)
          .save()
          .then(console.log("Status save successful"))
          .catch(err => console.log(err));
      }
    }
  });

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

  //adds 72 hours to the starting date
  //needed to add extra hour to be a true 72 hours from start date
  function getExpirationDate(date) {
    var expirationDate = new Date();
    expirationDate.setDate(date.getDate() + 3);
    expirationDate.setHours(expirationDate.getHours() + 1);
    return expirationDate;
  }
};
