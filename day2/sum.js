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


//fs.require('fs');

// Example code for reading command line arguments:
console.log('Command line arguments', process.argv.slice(2));

// var num1 = process.argv.slice(1);
// var num2 = process.argv.slice(2);
var numbers = process.argv.slice(2);

if (numbers.length > 0) {
	var total = 0;
	for (var i = 0; i < numbers.length; i++) {
	total += parseInt(numbers[i]);
	}
	console.log('total', total);
}
else {


// Check if two numbers are in command line
// if{
// 	for (var i = 0; i < process.argv.length; i++) {
// 	num1 = process.argv[0];
// 	num2 = process.argv[1];
// 	console.log(num1 + num2);
// }
// else {
// 	//prompt user for 2 inputs
// }
// }

// Example code for getting input from the user
var readline = require('readline');

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var n1, n2;
rl.question("Enter first number ", function(n1) {
  rl.question("Enter second number ", function(n2) {
  		console.log('total', parseInt(n1) + parseInt(n2));
	});
});
}


