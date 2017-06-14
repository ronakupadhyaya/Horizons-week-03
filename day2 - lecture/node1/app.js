var math = require('./math.js');
var input = require('../util/input.js');
var sum = math.sum;
var product = math.product;
var argArray = process.argv;
var flag = argArray[2];

if ((flag === '--product') || (flag === '--sum')) {
  var total;
  var numbers = input.inputParser(argArray);
  if (flag === '--product') {
    total = product(numbers);
  }
  if (flag === '--sum') {
    total = sum(numbers);
  }
}
else {
  throw new Error("No flag was given");
}
console.log("result is " + total + ".");
