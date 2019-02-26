module.exports = app => {
  const axios = require("axios");
  const cheerio = require("cheerio");
  const ParkingStatus = require("../models/parkingStatus");
  const cityURL = "http://www.ci.eau-claire.wi.us/";
  const notifyHelper = require("./notify");
  const date = require("date-and-time");
  const mongoose = require("mongoose");

  mongoose.model("ParkingStatus");

  axios.get(cityURL).then(response => {
    if (response.status === 200) {
      // reads, loads, and parses html into readable form
      // current version scrapes for top navigation bar
      // final implementation will scrape for alternate parking banner and it's details
      const html = response.data;
      const $ = cheerio.load(html);
      let newsItems = [];

      var latestNews = $("li", ".home_news").each((i, elm) => {
        newsItems.push({
          title: $(elm)
            .children()
            .eq(1)
            .first()
            .text(),
          description: $(elm)
            .children()
            .eq(2)
            .first()
            .text()
        });
      });

      ParkingStatus.findOne()
        .sort({ timestamp: -1 })
        .exec((err, oldStatus) => {
          if (err) return console.error(err);

          //creating new parkingStatus document
          let newParkingStatus;

          if (oldStatus == null) {
            // saving a dummy record to populate database
            // will run after database is cleared
            newParkingStatus = {
              inEffect: false,
              start: null,
              end: null,
              timestamp: new Date()
            };
            new ParkingStatus(newParkingStatus)
              .save()
              .then(
                console.log(
                  JSON.stringify(newParkingStatus) +
                    "\nDummy False ParkingStatus save successful"
                )
              )
              .catch(err => console.log(err));
            oldStatus = newParkingStatus;
          }

          //checking if html contains alternate parking listing by scanning "latest news" items from EC website
          var altParkingInEffect = checkForAlternateParking(newsItems);

          if (altParkingInEffect) {
            //check if the post is new today
            let isNew = isNewPost(oldStatus);

            newParkingStatus = {
              inEffect: true,
              start: getStartDate(isNew, oldStatus),
              end: getEndDate(isNew, oldStatus),
              timestamp: new Date()
            };

            new ParkingStatus(newParkingStatus)
              .save()
              .then(
                console.log(
                  JSON.stringify(newParkingStatus) +
                    "ParkingStatus save successful"
                )
              )
              .catch(err => console.log(err));

            if (isNew) {
              console.log(
                "New Posting: Notify.js should be called and messages should be sent now"
              );
              //send out the twillio messsage
              // this being commented out makes this a manual process. Suitable for RELEASE 1.0. To be updated when tested
              //notifyHelper(app);
            }
          } else {
            newParkingStatus = {
              inEffect: false,
              start: null,
              end: null,
              timestamp: new Date()
            };
            new ParkingStatus(newParkingStatus)
              .save()
              .then(
                console.log(
                  JSON.stringify(newParkingStatus) +
                    "ParkingStatus save successful"
                )
              )
              .catch(err => console.log(err));
          }
        });
    }
  });

  //returns start date for alternate side parking
  getStartDate = (isNew, oldStatus) => {
    if (isNew) {
      let today = new Date();
      let startDate = date.addDays(today, 1).setHours(0, 0, 0, 0);
      return startDate;
    } else {
      //get start date from yesterday
      return oldStatus.start;
    }
  };

  //returns end date for alternate side parking
  getEndDate = (isNew, oldStatus) => {
    if (isNew) {
      let today = new Date();
      let endDate = date.addDays(today, 3).setHours(17, 0, 0, 0);
      return endDate;
    } else {
      //get end date from yesterday
      return oldStatus.end;
    }
  };

  //checks if there is an alternate side parking posting
  checkForAlternateParking = newsItems => {
    var result = false;
    newsItems.forEach(element => {
      if (
        element.title.toLowerCase().includes("alternate side parking") ||
        element.title.toLowerCase().includes("snow event")
      ) {
        result = true; // found Alternate Side Parking listing and it is not old
      }
    });
    return result;
  };

  //checks to see if alternate side parking notice is new and users should be notified
  isNewPost = oldStatus => {
    //check previous log item
    if (!oldStatus.inEffect) {
      // if yesterday is false, the post must be new
      return true;
    } else {
      if (date.subtract(oldStatus.end, new Date()).toSeconds() < 0) {
        return true; // returned a positive value meaning the end date has passed on old post
      } else {
        return false; // returned a negative value meaning the old status is still active
      }
    }
  };
};
