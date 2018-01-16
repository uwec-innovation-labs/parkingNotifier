// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        lowercase: true,
        unique: true,
        required: true, message: "test"
    },
    phone: {
        type: String,
        unique: true,
        maxlength: 11,
        minlength: 11
    },
    role: {
        type: String,
        enum: ['Student', 'Developer'],
        default: 'Student',
        required: true
    },
    token: {
        type: String
    }
});

// export the user schema
module.exports = mongoose.model('User', User);