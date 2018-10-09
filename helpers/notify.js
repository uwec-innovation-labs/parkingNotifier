const dotenv = require('dotenv').config();
const twilio = require('twilio');
const mongoose = require('mongoose');
const request = require('request');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const client = new twilio(process.env.TWILIO_ID, process.env.TWILIO_TOKEN);

request('http://localhost:9000/users', {json:true}, (err, res, body) => {
  var numbers = [];
  var users = body;
  users.forEach((user) => {
    numbers.push("+1" + user.phone);
  });
  callNumbers(numbers);
});

/*
const katieNumber = '+17156122163';
const taylorNumber = '+16083230141';
var numbers = [katieNumber];*/

function callNumbers(numbers) {
  numbers.forEach((number) => {
    var message = client.messages.create({
      body: process.env.TWILIO_MESSAGE,
      from: process.env.TWILIO_FROM,
      to: number
    }).then()
    .catch(e => {
      if (e.code == 21211) {
        console.error("The number " + number + " is invalid");
      } else {
	console.error(e.message);}
    })	  
    .done();
});
}
