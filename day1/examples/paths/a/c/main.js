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
var runOne = require("../../b/one.js")

var runTwo = require("../two.js")

var runThree = require("../../b/three.js")
var runFour = require("./four.js")


runOne.first();
runOne.second();
runTwo.twoFunc();
runThree.logger(runFour.horizons);
