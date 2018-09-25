const accountSid = 'AC90f10960b6c8da620e946f9e8b4673e9';
const authToken = '6270ea173049bcc3417dfaf10c319e69';
const client = require('twilio')(accountSid, authToken);

const katieNumber = '+17156122163';
const taylorNumber = '+16083230141';

var numbers = [katieNumber, taylorNumber];

numbers.forEach(function(number){
  var message = client.messages.create({
    body: 'Hello, World!',
    from: '+18564315302',
    to: number
  })
  .then(message => console.log(message.status))
  .done();
});
