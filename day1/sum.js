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
// console.log('Command line arguments', process.argv.slice(2));

// Example code for getting input from the user
// var readline = require('readline');

// var rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout
// });

// rl.question("Hi! What's your name? ", function(name) {
//   console.log('Nice to meet you', name);
//   rl.close();
// });

var inputs = process.argv.slice(2);

if (inputs.length <= 2) {
  var num1, num2;
  var readline = require('readline'); // store variable for module import
  var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question("Enter first number? ", function(x) {
    num1 = x;
    if (typeof num1 === "number") {
      rl.question("Enter second number? ", function(y) {
        num2 = y;
        if (typeof num2 === "number") {
          console.log(eval(num1 + "+" + num2));
          rl.close();
        }
      });
    }
  });
} else {
  var total = inputs.reduce(function(sum, value) {
    return parseInt(sum) + parseInt(value);
  });
  console.log(total);
}
