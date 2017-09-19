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
console.log('Command line arguments', process.argv.slice(2));

var args = process.argv.slice(2);

if (args.length != 0) {
  var numArgs = args.map(function(item, index) {
    return Number(item);
  })
  var sum = numArgs.reduce(function(accum, currItem) {
    return accum + currItem
  })
  console.log(sum);
}
else {
// Example code for getting input from the user
  var readline = require('readline');

  var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  var args = []
  rl.question("Give me a number", function(num) {
    args.push(Number(num))
    rl.question("Give me another number", function(num) {
      args.push(Number(num))
      rl.close();
      console.log(args[0] + args[1]);
    });
  });

}
