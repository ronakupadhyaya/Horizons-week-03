// Modify only this file

// The code below runs the functions exported by five.js
// five.js sits in the same directory so './five.js' is
// my relative path from main.js (current file)

// var five = require('./five.js')
// five.logger(five.value);

// YOUR CODE HERE
var one = require('../../b/one.js');
var two = require('../two.js');
var three = require('../../b/three.js');
// Output should look like
//     *
//    *
//   *
//  *
one.first();
one.second();
two.twoFunc();
three.logger();
