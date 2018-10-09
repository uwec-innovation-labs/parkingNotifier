const dotenv = require('dotenv').config();
const twilio = require('twilio');
const client = new twilio(process.env.TWILIO_ID, process.env.TWILIO_TOKEN);

const katieNumber = '+17156122163';
const taylorNumber = '+16083230141';

var numbers = [katieNumber];

numbers.forEach((number) => {
  var message = client.messages.create({
    body: process.env.TWILIO_MESSAGE,
    from: process.env.TWILIO_FROM,
    to: number
  }).then()
  .done();
});
