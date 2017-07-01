"use strict";

var args = process.argv;
var crypto = require('crypto');
var pass = args[2]

var hashedValue = crypto.createHash('sha256').update('pass', 'utf8').digest('hex')

console.log(hashedValue);
