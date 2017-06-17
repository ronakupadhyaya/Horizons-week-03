//model in here

"use strict";


var mongoose = require('mongoose');

var User = mongoose.model('User',{    //the first string is the name of the collection in the database
    fname: String,
     lname: String,
     email: String,
     password: String
})


module.exports = User;
