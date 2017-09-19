// Modify only this file
//
// The code below runs the functions exported by five.js
// five.js sits in the same directory so './five.js' is
// my relative path from main.js (current file)

var five = require('./five.js')
var four = require('./four.js')
var three = require('../../b/three.js')
var two = require('../two.js')
var one = require('../../b/one.js')

one.first();
one.second();
two.twoFunc();
three.logger(four.horizons);

five.logger(five.value);




// YOUR CODE HERE
//
// Output should look like
//     *
//    *
//   *
//  *
