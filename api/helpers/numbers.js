'use strict'

const mongoose = require('mongoose');
const request = require('request');
const querystring = require('querystring');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

request('http://localhost:9000/users', {json:true}, (err, res, body) => {
  console.log("success");
  console.log(res);
  console.log(body);
});

/*request('http://localhost:9000/numbers', {json:true}, (err, res, body) => {
console.log("here");
console.log(body);
});*/

//As an example: 'get' requests work fine, but 'put'/'post' are denied
/*request({url:'http://localhost:9000/users', 
              form: {phoneNumber:'17155983494',
              json: true}
            }, function(err, res, body) {
  if (err) {
    console.log("error " + err);
  } else {
    console.log("success");
    console.log(body);
  }
});*/
