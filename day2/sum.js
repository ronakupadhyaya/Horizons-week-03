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

var readline = require('readline');

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var args = process.argv.slice(2);
sum();
function sum() {
	if (args.length === 0) {
	rl.question("Enter first number?\n", function(number) {
		args.push(number);
  		sum();
		});
	}
	if (args.length === 1) {
	rl.question("Enter second number?\n", function(number) {
  		args.push(number);
  		rl.close();
  		sum();
		});
	} if (args.length >= 2) {
		var retVal = 0;
		for (var i = 0; i < args.length; i++) {
			retVal += parseInt(args[i]) ;
		}
		console.log(retVal);
		process.exit();
	}
}
