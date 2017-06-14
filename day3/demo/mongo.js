"use strict";

console.log('mongo uri', process.env.MONGODB_URI);


// var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);
