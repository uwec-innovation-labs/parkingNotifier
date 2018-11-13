'use strict'

const dotenv = require('dotenv').config();
const getenv = require('getenv');
const twilio = require('twilio');
const mongoose = require('mongoose');
const request = require('request');
const querystring = require('querystring');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var text = require('textbelt');

const client = new twilio(process.env.TWILIO_USERNAME, process.env.TWILIO_TOKEN);


request('http://localhost:9000/users', {json:true}, (err, res, body) => {
  var numbers = [];
  var users = body;
  /*users.forEach((user) => {
    var newNumber = {
      toNumber: "+1" + user.phone,
      fromNumber: ""
    }
    numbers.push("+1" + user.phone);
  });*/
  //callNumbers(numbers);
});


const katieNumber = '+17156122163';
//const taylorNumber = '+16083230141';


function callNumbers(numbers) {
  
  numbers = [katieNumber];

  var i = 1;
  numbers.forEach((number) => {
    var message = client.messages.create({
      body: process.env.TWILIO_MESSAGE,
      from: getenv('TWILIO_FROM' + Math.round(i/250)),
      to: number
    }).then(i = i + 1)
    .catch(e => {
      if (e.code == 21211) {
        console.error("The number " + number + " is invalid");
      } else {
	      console.error(e.message);}
      })	  
    .done();
});

  /*var messageInfo = querystring.stringify({
    number: '7156122163',
    message: 'test'
  });
  var options = {
    url: 'http://textbelt.com/text',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: messageInfo
  };*/

  /*request.post(options, function(err, res, body) {
    if (err) {
      console.log("error");
    } else {
      console.log("success");
      console.log(body);
    }
  });*/
  
}
