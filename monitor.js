const rp = require('request-promise');
const cheerio = require('cheerio');
const getHrefs = require('get-hrefs');

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
                        /***** TO-DO: DATABASE INTEGRATION *****/
                    }
                })
        } else {
            console.log("Alt parking not in effect");
            /***** TO-DO: DATABASE INTEGRATION *****/
        }
    })
    .catch((err) => {
        // catch any error and log it to the console
        console.log(err);
    });