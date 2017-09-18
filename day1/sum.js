// In this exercise we will build a command line utility for
// summing numbers.
//
// sum.js should take optional command line arguments, parse the
// arguments into numbers and return their sum. Use
// **`process.argv`** to read command line arguments.
//
// ex. node sum.js 1 2
// > 3
// ex. node sum.js 2 3 4 5
// > 14
// ex. node sum.js 2 -5 3
// > 0
//
// If no command line arguments are specified, you should ask the
// user for 2 numbers and print their sum.
//
// ex. node sum.js
// > Enter first number?
// > 1
// > Enter second number?
// > 4
// > 5
//

// Example code for reading command line arguments:

var nums = process.argv.slice(2);
//Convert from strings to numbers
nums = nums.map(function(numString) {
  return parseInt(numString);
});

var sum = 0;
// Example code for getting input from the user
var readline = require('readline');

if(nums.length !== 0) {
  nums.forEach(function(num) {
    sum += num;
  });
  console.log(sum);
} else {
  var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question("Enter first number? ", function(num1) {
    num1 = parseInt(num1);
    sum += num1;
    rl.question("Enter second number? ", function(num2) {
      num2 = parseInt(num2);
      sum += num2;
      console.log(sum);
      rl.close()
    });
  });
}
