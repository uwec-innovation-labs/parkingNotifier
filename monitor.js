const axios = require('axios');
const cheerio = require('cheerio');

axios.get('http://www.ci.eau-claire.wi.us/')
    .then((response) => {
        if(response.status === 200) {
        const html = response.data;
            const $ = cheerio.load(html); 
            console.log($.text())
    }
    }, (error) => console.log(err) );