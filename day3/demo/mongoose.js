"use strict";

console.log('mongo url'+ (process.env.MONGODB_URL)

var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URL);
