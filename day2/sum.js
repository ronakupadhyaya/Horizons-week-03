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
if(process.argv.slice(2).length === 0){
	var firstNum;
	var secNum;

	var readline = require('readline');
	
	var rl = readline.createInterface({
	  input: process.stdin,
	  output: process.stdout
	});

	rl.question("Enter first number? ", function(number) {
		firstNum = parseInt(number, 10);
		rl.question("Enter second number? ", function(number) {
			secNum = parseInt(number, 10);
			console.log(firstNum+secNum);
			process.exit();
		});
	});
} else {

var result = process.argv.slice(2).reduce(function(sum, n) {
	return sum + parseInt(n, 10);
}, 0);

console.log(result);
}

// // Example code for reading command line arguments:
// console.log('Command line arguments', process.argv.slice(2));


