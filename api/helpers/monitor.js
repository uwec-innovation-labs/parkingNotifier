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

    //checking if html contains alternate parking listing by scanning "latest news" items from EC website
    var altParkingInEffect = checkForAlternateParking(newsItems);

    //creating entry date based on today's date
    var currentDate = new Date();

    //creating new parkingStatus document
    let newParkingStatus;

    //checks if alternate parking banner exists
    if (altParkingInEffect) {
      newParkingStatus = {
        inEffect: true,
        start: getStartDate(postDate).toLocaleString("en-US", {
          timeZone: "America/Chicago"
        }),
        end: getExpirationDate(postDate).toLocaleString("en-US", {
          timeZone: "America/Chicago"
        }),
        timestamp: new Date().toLocaleString("en-US", {
          timeZone: "America/Chicago"
        })
      };
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
//sets the date to the next day from the starting date.
getStartDate = postDate => {
  var startDate = new Date();
  startDate = postDate;
  startDate.setHours(0, 0, 0, 0);
  return startDate;
};

//alternate side parking is enforced from 12am-5pm each day
//expiration is set to 5pm on the third day
getExpirationDate = postDate => {
  var expirationDate = new Date();
  expirationDate = date.addDays(postDate, 2);
  expirationDate.setHours(17, 0, 0, 0);
  return expirationDate;
};
// getPostingDate = newsItems => {
//   newsItems.forEach(element => {
//     if (element.title.toLowerCase().includes("alternate side parking")) {
//       var postDate = element.description.match(/(\d*\/\d*\/\d*)/); //regular expression search for a date
//       postDate = postDate[1]; //sets to the first instance
//       return postDate; //Alternate Side Parking listed in latest news. Checking if it is brand new.
//     }
//   });
// };
//checks if there is an alternate side parking posting
checkForAlternateParking = newsItems => {
  newsItems.forEach(element => {
    if (element.title.toLowerCase().includes("alternate side parking")) {
      var postDate = element.description.match(/(\d*\/\d*\/\d*)/); //regular expression search for a date
      postDate = postDate[1]; //sets to the first instance
      return !!!isStalePost(postDate); //Alternate Side Parking listed in latest news. Checking if it is current.
    }
  });
  return false; //Alternate Side Parking not listed in latest news
};

//precautionary check to ensure alternate side parking is still in effect and the posting isn't old
isStalePost = postDate => {
  var today = new Date();
  var posted = stringToDate(postDate);
  var difference = date.subtract(today, posted).toDays(); //checks if the the posting date is more than three days old
  console.log(difference);
  if (difference > 3) {
    return true; //the posting is stale and should not be logged
  }
  return false; //the posting is still current
};

//checks to see if alternate side parking notice is new and users should be notified
isNewPost = postDate => {
  var today = new Date();
  var posted = stringToDate(postDate);
  let difference = date.subtract(posted, date.addDays(today, 1)).toDays(); //checks if the the posting date matches todays date + 1
  if (difference == 0) {
    return true; //the post is new and a text should be sent out
  }
  return false; //posting is not new, no need to notify
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
//};
