let mongoose = require("mongoose");

let analyticsSchema = mongoose.Schema({
  subscriberCount: {
    type: Number,
    required: true
  },
  messagesSent: {
    type: Number,
    required: true
  },
  webScrapesPerDay: {
    type: Number,
    required: true
  }
});

let Analytics = (module.exports = mongoose.model("Analytics", analyticsSchema));
