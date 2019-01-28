module.exports = app => {
  const axios = require("axios");
  const cheerio = require("cheerio");
  const ParkingStatus = require("../models/parkingStatus");
  const cityURL = "http://www.ci.eau-claire.wi.us/";
  const notifyHelper = require("./notify");
  const date = require("date-and-time");

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

      //checking if html contains alternate parking listing by scanning "latest news" items from EC website
      var altParkingInEffect = checkForAlternateParking(newsItems);

      //creating entry date based on today's date
      var currentDate = new Date();

      //creating new parkingStatus document
      let newParkingStatus;

      //checks if alternate parking banner exists
      if (altParkingInEffect) {
        //never can be both true
        let isNew = isNewPost();
        let isStale = isStalePost();

        if (isNew && !!!isStale) {
          newParkingStatus = {
            inEffect: true,
            start: getStartDate(),
            end: getEndDate(),
            timestamp: new Date().toLocaleString("en-US", {
              timeZone: "America/Chicago"
            })
          };
        } else if (!!!isNew && !!!isStale) {
          newParkingStatus = {
            inEffect: true,
            start: getStartDate(postDate).toLocaleString("en-US", {
              timeZone: "America/Chicago"
            }),
            end: getEndDate(postDate).toLocaleString("en-US", {
              timeZone: "America/Chicago"
            }),
            timestamp: new Date().toLocaleString("en-US", {
              timeZone: "America/Chicago"
            })
          };
        } else if (!!!isNew && isStale) {
        }
        console.log(JSON.stringify(newParkingStatus));
        new ParkingStatus(newParkingStatus)
          .save()
          .then(console.log("ParkingStatus save successful"))
          .catch(err => console.log(err));

        // if (isNewPost(newsItems)) {
        if (isStalePost("1/20/2019")) {
          console.log("Is Stale Post!");
          //send out the twillio messsage
          // this being commented out makes this a manual process. Suitable for RELEASE 1.0. To be updated when tested
          //notifyHelper(app);
        }
      } else {
        newParkingStatus = {
          inEffect: false,
          start: null,
          end: null,
          timestamp: new Date().toLocaleString("en-US", {
            timeZone: "America/Chicago"
          })
        };
        console.log(JSON.stringify(newParkingStatus));
        new ParkingStatus(newParkingStatus)
          .save()
          .then(console.log("ParkingStatus save successful"))
          .catch(err => console.log(err));
      }
    }
  });
  //returns start date for alternate side parking
  getStartDate = isNew => {
    if (isNew) {
      return new Date().setHours(0, 0, 0, 0).toLocaleString("en-US", {
        timeZone: "America/Chicago"
      });
    } else {
      //get date from yesterday
      return true; //TEMP -> return start date from yesterday
    }
  };

  //returns end date for alternate side parking
  getEndDate = isNew => {
    if (isNew) {
      today = new Date();
      endDate = date
        .addDays(today, 2)
        .setHours(17, 0, 0, 0)
        .toLocaleString("en-US", {
          timeZone: "America/Chicago"
        });
      return endDate;
    } else {
      //get date from yesterday
      return true; //TEMP -> return start date from yesterday
    }
  };

  //checks if there is an alternate side parking posting
  checkForAlternateParking = newsItems => {
    newsItems.forEach(element => {
      if (element.title.toLowerCase().includes("alternate side parking")) {
        return true; // found Alternate Side Parking listing
      }
    });
    return false; //Alternate Side Parking not listed in latest news
  };

  //precautionary check to ensure alternate side parking is still in effect and the posting isn't old
  isStalePost = () => {
    //check previous log item
    if (/*inEffect is false*/ false) {
      return false;
    } else {
      if (/*ends date comes after now*/ true) {
        return true;
      } else {
        return false;
      }
    }
  };

  //checks to see if alternate side parking notice is new and users should be notified
  isNewPost = () => {
    //check previous log item
    if (/*inEffect is false*/ false) {
      return true;
    } else {
      if (/*ends date comes after now*/ true) {
        return false;
      } else {
        return true;
      }
    }
  };

  // //takes in a string and creates a new date. String formatting shuld be (MM/DD/YYYY)
  // stringToDate = dateAsString => {
  //   // Date object creation requires (YYYY/MM/DD)
  //   var dateString = dateAsString.toLocaleString();
  //   return new Date(
  //     dateString.substring(dateString.lastIndexOf("/") + 1, dateString.length),
  //     dateString.substring(0, dateString.indexOf("/")) - 1,
  //     dateString.substring(
  //       dateString.indexOf("/") + 1,
  //       dateString.lastIndexOf("/")
  //     )
  //   );
  // };
};
