var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'katelreiter@gmail.com',
    pass: 'Magg0tPie'
  }
});

var mailOptions = {
    from: 'Parking Notifier <katelreiter@gmail.com>',
    to: '7156122163@txt.att.net',
    envelope: {
        from: 'Parking Notifier <katelreiter@gmail.com>',
        to: '7156122163@txt.att.net',
    },
    subject: '',
    text: 'Beep beep snow time'
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });