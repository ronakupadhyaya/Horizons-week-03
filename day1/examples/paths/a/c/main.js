// Modify only this file

// The code below runs the functions exported by five.js
// five.js sits in the same directory so './five.js' is
// my relative path from main.js (current file)

// var five = require('./five.js')
// five.logger(five.value);

// YOUR CODE HERE

// Output should look like
//     *
//    *
//   *
//  *

var one = require('../../b/one.js'); // key: first
var two = require('../two.js'); //key: twoFunc
var three = require('../../b/three.js'); //key: logger (arg: one.second)
var four = require('./four.js'); // three.logger(four.horizons)

one.first();
one.second();
two.twoFunc();
three.logger(four.horizons);
