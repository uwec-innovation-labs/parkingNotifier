const express = require("express");
const bodyParser = require("body-parser");
const port = process.env.PORT || 9000;

var data = [
  {
    firstName: "Alex",
    lastName: "Stout",
    username: "stoutab4384",
    phone: "6084344372"
  },
  {
    firstName: "John",
    lastName: "Doe",
    username: "doej8432",
    phone: "0392833821"
  }
];

var data1 = [
  {
    alternateSideParking: true,
    message: "Park on the right side",
    updated: "12-3-18 at 10:24pm"
  },
  {
    alternateSideParking: true,
    message: "Park on the left side",
    updated: "12-4-18 at 10:24pm"
  }
];

// initialize the express framework
const app = express();
var port = process.env.PORT || 9000;

// configure app to use body-parser
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// create the router for the routes
var apiRouter = express.Router();

apiRouter.get("/status/", (req, res) => {
  res.status(200);
  res.json([...data1]);
});

apiRouter.get("/", (req, res) => {
  res.status(200);
  res.json({
    success: true,
    apiDocumentation: "https://github.com/UWEC-ITC/parkingNotifier-API"
  });
});

apiRouter.get("/users", (req, res) => {
  res.status(200);

  res.json([...data]);
});

apiRouter.get("/users/:username", (req, res) => {
  for (i = 0; data.length > i; i += 1) {
    if (data[i].username === req.params.username) {
      res.status(200);
      res.json(data[i]);
    }
  }
  res.status(404);
  res.json({
    status: "failed",
    message: "That username doesn't exist"
  });
});

apiRouter.post("/users/:username", (req, res) => {
  console.log(req.body);
  var newUser = req.body;
  data.push(newUser);
  res.json({
    wow: true
  });
});

app.use("/", apiRouter);

app.listen(port, () => {
  console.log("API listening on port ", port);
});
