const rp = require('request-promise');
const cheerio = require('cheerio');
const getHrefs = require('get-hrefs');
const mongoose = require('mongoose');

// import environment variables from .env file
require('dotenv').config()
var Status = require('./models/status'); // get our mongoose model

// connect to database
var databaseURI = 'mongodb://' + process.env.DB_USER + ':' + process.env.DB_PASSWORD + '@' + process.env.DB_HOST;
mongoose.connect(databaseURI, { useMongoClient: true });

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
                            alternateSideParking: true,
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
                alternateSideParking: false,
                message: null,
                timestamp: new Date().valueOf()
            });

            status.save(function(err) {
                if (err) throw err;
                console.log('Status updated successfully');
                // exit the script
                process.exit();
            });
        }
    })
    .catch((err) => {
        // catch any error and log it to the console
        console.log(err);
    });