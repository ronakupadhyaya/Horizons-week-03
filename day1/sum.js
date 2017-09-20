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

if (process.argv.slice(2).length > 0) {
	var strArgs = process.argv.slice(2);
	console.log('strArgs', strArgs);
	var intArgs = [];  
	for (var i=0; i<strArgs.length; i++) {
		intArgs.push(parseInt(strArgs[i]));
	}
	var sum = 0; 
	for (var i=0; i<intArgs.length; i++) {
		sum = sum + intArgs[i]; 
	}
	console.log('sum', sum); 
}


// Example code for getting input from the user
var readline = require('readline');

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


rl.question("Enter first number? ", function(numberOne) {
  var num1 = parseInt(numberOne); 
  rl.question("Enter second number? ", function(numberTwo) {
 	console.log('num1', numberOne);
 	console.log('num2', numberTwo); 
 	var sum = num1 + parseInt(numberTwo); 
 	console.log(sum); 
 	rl.close();
  });
});
