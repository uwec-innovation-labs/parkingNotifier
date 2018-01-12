const rp = require('request-promise');
const cheerio = require('cheerio');
const getHrefs = require('get-hrefs');

const options = {
    uri: `http://www.ci.eau-claire.wi.us/`,
    //uri: `http://www.uwec.edu/`,
    transform: function(body) {
        return cheerio.load(body);
    }
};

rp(options)
    .then(($) => {
        if ($('.important_alert_wrapper').html() != null) {
            console.log("Alt Parking in effect");
            var announcementLink = getHrefs($('p').has('a').html());
            console.log(announcementLink[0]);
        } else {
            console.log("Alt parking not in effect");
        }
    })
    .catch((err) => {
        // catch any error and log it to the console
        console.log(err);
    });