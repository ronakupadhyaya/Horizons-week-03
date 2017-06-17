//model in here

"use strict";


var mongoose = require('mongoose');



var Token = mongoose.model('Token',
{
    userId: String,
    token: String,
    createdAt: Date
});


module.exports = Token;
