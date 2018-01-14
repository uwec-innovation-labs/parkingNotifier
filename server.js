// require all the dependencies
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var validator = require('validator');

// import environment variables from .env file
require('dotenv').config()

// create an instance of express
const app = express();
var port = process.env.PORT || 8080;

// import data models
var User = require('./models/user'); // get our mongoose model
var Status = require('./models/status'); // get our mongoose model

// connect to the database
var databaseURI = 'mongodb://' + process.env.DB_USER + ':' + process.env.DB_PASSWORD + '@' + process.env.DB_HOST;
mongoose.connect(databaseURI, { useMongoClient: true });

// configure app to use bodyParser
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

var apiRouter = express.Router();
apiRouter.get('/', function(req, res) {
    res.json({
        apiDocumentation: 'https://github.com/UWEC-ITC/parkingNotifier-API',
    });
});

apiRouter.route('/status')
    .get(function(req, res) {
        // get most recent record in the list of records
        Status.findOne().sort({'timestamp': 'desc'}).exec(function(err, status) {
            res.json({
                alternateSideParking: status.alternateSideParking,
                message: status.message,
                updated: status.timestamp
            });
        });
    });

apiRouter.route('/users')
    // subscribe a user
    .post(function(req, res) {
        if (!req.body.email) {
            res.send({ message: "must include an email address to create a user"});
            return;
        }
        var domain = req.body.email.replace(/.*@/, "");
        if (domain.length == 0 || domain !== 'uwec.edu') {

            res.send({ message: "email must be a UWEC email"});
            return;
        }
        // create a new user object
        var user = new User();

        /**** TODO: Check to see if records exist *****/
        User.count({ email: req.body.email}, function (err, count){
            // make sure that the user exists
            if (count > 0) {
                console.log(count);
                // let the user know that the record already exists
                res.json({ message: 'This email is already in use' });

            } else {
                user.name = req.body.name;
                user.email = req.body.email;
                user.phone = req.body.phone;

                user.save(function(err) {
                    if (err)
                        res.send({ status: "failed" });

                    res.json({ message: 'User created!' });
                });
            }
        });
    })

// unsubscribe a user
apiRouter.route('/users/:email')
    .delete(function(req, res) {
        User.count({email: req.params.email}, function (err, count){
            // make sure that the user exists
            if (count > 0) {
                // remove the user that matches the email
                User.remove({ email: req.params.email }, function(err, bear) {
                    if (err)
                        res.send(err);

                    res.json({ message: 'Successfully unsubscribed' });
                });
            } else {
                res.json({ message: 'User with that email does not exist'});
            }
        });
    })

apiRouter.route('/users/:phone')
    .delete(function(req, res) {
        User.count({phone: req.params.phone}, function (err, count){
            // make sure that the user exists
            if (count > 0) {
                // remove the user that matches the phone number
                User.remove({ phone: req.params.phone }, function(err, bear) {
                    if (err)
                        res.send(err);
                    res.json({ message: 'Successfully unsubscribed' });
                });
            } else {
                res.json({ message: 'User with that phone number does not exist'});
            }
        });
    })

app.use('/', apiRouter);

/***** ERROR PAGES *****/
app.use(function(req, res) {
    res.status(404);
    res.json({
        status: "404",
        apiDocumentation: 'https://github.com/UWEC-ITC/parkingNotifier-API'
    });
})

app.use(function(error, req, res, next) {
    res.status(500);
    console.log(error);
    res.json({
        status: "500",
        apiDocumentation: 'https://github.com/UWEC-ITC/parkingNotifier-API'
    });
})

app.listen(port, function() {
    console.log('API listening on port ', port);
});

// exporting the app module
module.exports = app;
