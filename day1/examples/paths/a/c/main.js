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
var one = require('../../b/one.js');
var two = require('../two.js');
var three = require('../../b/three.js');
var four = require('./four.js');
one.first(four.horizons);
one.second(four.horizons);
two.twoFunc(four.horizons);
three.logger(four.horizons);
// var arg = four.horizons;
// for (var func in one.exports) {
//   one.exports[func](arg);
// }
// for (var func in two.exports) {
//   two.exports[func](arg);
// }
// for (var func in three.exports) {
//   three.exports[func](arg);
// }
