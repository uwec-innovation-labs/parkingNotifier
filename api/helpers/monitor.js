//module.exports = app => {
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

    //checking if html contains alternate parking listing
    var altParkingInEffect = checkForAlternateParking(newsItems);

    //creating entry date
    var currentDate = new Date();

    var dateTest = stringToDate("12/1/2016");
    console.log(
      dateTest.toLocaleString("en-US", { timeZone: "America/Chicago" })
    );

    //creating new status document
    let newParkingStatus;

    //checks if alternate parking banner exists
    if (altParkingInEffect) {
      var postingDate = getPostingDate(newsItems);
      console.log(postingDate);
      newParkingStatus = {
        inEffect: true,
        start: getStartDate(postingDate).toLocaleString("en-US", {
          timeZone: "America/Chicago"
        }),
        end: getExpirationDate(postingDate).toLocaleString("en-US", {
          timeZone: "America/Chicago"
        })
      };
      new ParkingStatus(newParkingStatus)
        .save()
        .then(console.log("ParkingStatus save successful"))
        .catch(err => console.log(err));

      if (isNewPost(newsItems)) {
        //send out the twillio messsage
        // this being commented out makes this a manual process. Suitable for RELEASE 1.0. To be updated when tested
        //notifyHelper(app);
      }
    } else {
      newParkingStatus = {
        inEffect: false,
        start: null,
        end: null
      };
      new ParkingStatus(newParkingStatus)
        .save()
        .then(console.log("ParkingStatus save successful"))
        .catch(err => console.log(err));
    }
  }
});
//sets the date to the next day from the starting date.
getStartDate = currentDate => {
  var startDate = new Date();
  startDate = date.addDays(currentDate, 1);
  startDate.setHours(0, 0, 0, 0);
  return startDate;
};

//alternate side parking is enforced from 12am-5pm each day
//expiration is set to 5pm on the third day
getExpirationDate = currentDate => {
  var expirationDate = new Date();
  expirationDate = date.addDays(currentDate, 3);
  expirationDate.setHours(17, 0, 0, 0);
  return expirationDate;
};
getPostingDate = newsItems => {
  newsItems.forEach(element => {
    if (element.title.toLowerCase().includes("alternate side parking")) {
      var postDate = element.description.match(/(\d*\/\d*\/\d*)/); //regular expression search for a date
      postDate = postDate[1]; //sets to the first instance
      return postDate; //Alternate Side Parking listed in latest news. Checking if it is brand new.
    }
  });
};
//checks if there is an alternate side parking posting
checkForAlternateParking = newsItems => {
  newsItems.forEach(element => {
    if (element.title.toLowerCase().includes("alternate side parking")) {
      var postDate = element.description.match(/(\d*\/\d*\/\d*)/); //regular expression search for a date
      postDate = postDate[1]; //sets to the first instance
      return !!!isStalePost(postDate); //Alternate Side Parking listed in latest news. Checking if it is brand new.
    }
  });
  return false; //Alternate Side Parking not listed in latest news
};

//precautionary check to ensure alternate side parking is still in effect and the posting isn't old
isStalePost = dayPosted => {
  var today = new Date();
  //var today = todayDate.getDate();
  var posted = stringToDate(dayPosted);
  var difference = date.subtract(posted, today + 1);

  //checks if the the posting date is more than three days old
  if (difference > 3) {
    return true; //the post is new and a text should be sent out
  }
  return false;
};

stringToDate = dateString => {
  return new Date(
    dateString.substring(dateString.lastIndexOf("/") + 1, dateString.length),
    dateString.substring(0, dateString.indexOf("/")) - 1,
    dateString.substring(
      dateString.indexOf("/") + 1,
      dateString.lastIndexOf("/")
    )
  );
};

//checks to see if alternate side parking notice is new and users should be notified
isNewPost = postDate => {
  newsItems.forEach(element => {
    var today = todayDate.getDate();
    var posted = postDate.substring(
      dayPosted.indexOf("/") + 1,
      dayPosted.lastIndexOf("/")
    );
    var difference = today + 1 - posted; //checks if the the posting date matches todays date + 1

    if (difference == 0) {
      return true; //the post is new and a text should be sent out
    }
  });
  return false; //posting is not new, no need to notify
};
//};
