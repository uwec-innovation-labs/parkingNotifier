// require all the dependencies
const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const mongo = require('mongodb');

// create an instance of express
const app = express();

// configure app to use bodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

// ========= API ROUTES ======= //
var apiRouter = express.Router();
apiRouter.get('/', function(req, res) {
    res.json({ message: 'Welcome to the api!' });
});


app.use('/', apiRouter);
// added 404 error
app.use(function(req, res) {
    res.status(400);
    res.json({ status: "404" });
})
app.use(function(error, req, res, next) {
    res.status(500);
    res.json({ status: "500" });
})

app.listen(port, function() {
    console.log('API listening on port ', port);
});

// exporting the app module
module.exports = app;
