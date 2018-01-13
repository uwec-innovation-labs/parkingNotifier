const rp = require('request-promise');
const cheerio = require('cheerio');
const getHrefs = require('get-hrefs');
const mongoose = require('mongoose');

// import db config file and user model
var config = require('./config'); // get our config file
var Status = require('./models/status'); // get our mongoose model

mongoose.connect(config.database, { useMongoClient: true }); // connect to database

// options for the request to the city home page
const cityHomepage = {
    uri: `http://www.ci.eau-claire.wi.us/`,
    transform: function(body) {
        return cheerio.load(body);
    }
};

// makes the request to the homepage
rp(cityHomepage)
    .then(($) => {
        // check if there is an alert banner on the homepage
        if ($('.important_alert_wrapper').html() != null) {
            // grab the link to in the alert banner
            var announcementLink = getHrefs($('p').has('a').html());
            // make a request to the page of the announcement
            rp({
                    uri: announcementLink[0],
                    transform: function(body) {
                        return cheerio.load(body);
                    }
                })
                .then(($) => {
                    // if the announcement title contains "alternate side parking"
                    // and "is in effect", then the status will be changed
                    if ($('.detail-title').text().includes("Alternate Side Parking in Effect")) {
                        console.log("Alternate side parking is in effect");
                        // get the announcement contents
                        var announcmentInfo = $('.detail-content').text();
                        console.log(announcmentInfo);
                        // create a sample user
                        var status = new Status({
                            alternateSideParking: "active",
                            message: announcmentInfo,
                            timestamp: new Date().valueOf()
                        });

                        status.save(function(err) {
                            if (err) throw err;
                            console.log('Status updated successfully');
                        });
                    }
                })
        } else {
            console.log("Alt parking not in effect");

            // update the database to have inactive status
            var status = new Status({
                alternateSideParking: "active",
                message: null,
                timestamp: new Date().valueOf()
            });

            status.save(function(err) {
                if (err) throw err;
                console.log('Status updated successfully');
            });

        }
    })
    .catch((err) => {
        // catch any error and log it to the console
        console.log(err);
    });