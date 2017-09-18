// Modify only this file

// The code below runs the functions exported by five.js
// five.js sits in the same directory so './five.js' is
// my relative path from main.js (current file)
var one = require('../../b/one.js');
one.first(one.value);

var three = require('../../b/three.js');
one.second();

var two = require('../two.js');
two.twoFunc();

var four = require('./four.js');
three.logger(four.horizons);

var five = require('./five.js')
five.logger(five.value);





// YOUR CODE HERE

// Output should look like
//     *
//    *
//   *
//  *
