// Modify only this file

// The code below runs the functions exported by five.js
// five.js sits in the same directory so './five.js' is
// my relative path from main.js (current file)

// var five = require('./five.js')
// five.logger(five.value);

// YOUR CODE HERE
var one = require('./../../b/one.js');
one.first();
one.second();

var two = require('../two.js');
two.twoFunc();

var four = require('./four.js');

var three = require('./../../b/three.js');
three.logger(four.horizons);

// Output should look like
//     *
//    *
//   *
//  *
