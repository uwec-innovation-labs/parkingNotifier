const axios = require("axios");
const cheerio = require("cheerio");
const express = require("express");
const mongoose = require("mongoose");
const Status = require("../models/status");

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

    if (topNavText.includes("Contact Us")) {
      // gets the date the scrape is performed
      // final implentation will get date from website scrape
      let date = new Date();

      // creates new status and sets attributes
      let newStatus = {
        alternateParking: true,
        timestamp: date.getTime(),
        streetSide: getStreetSide(date),
        expirationDate: getExpirationDate(date)
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
function getExpirationDate(date) {
  var expirationDate = new Date();
  expirationDate.setDate(date.getDate() + 3);
  return expirationDate;
}
