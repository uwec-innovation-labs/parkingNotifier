var mongoose = require("mongoose");
var User = require("../models/user");
var Analytics = require("../models/analytics");

mongoose.model("User");

exports.getStats = (req, res) => {
	var count = User.count({}, (err, count) => {
    	res.status(200);
    	res.json({
    		count: count
    	})
  	});

};


