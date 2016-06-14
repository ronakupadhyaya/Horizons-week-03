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

// Example code for getting input from the user
var readline = require('readline');

// var rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout
// });

// rl.question("Hi! What's your name? ", function(name) {
//   console.log('Nice to meet you', name);
//   rl.close();
// });
newArray = process.argv.slice(2);
var sum = 0;

if(newArray.length !== 0)
{
for (var i = 0; i < newArray.length; i++)
  {
  	 sum += parseInt(newArray[i]);
  }
console.log(sum);
}
	else
	{
		var r1 = readline.createInterface({
		  input: process.stdin,
		  output: process.stdout
		});
		r1.question("What is the first number you want to find the sum of? ", function(number) {
			sum += parseInt(number);
		r1.question("What is the second number you want to find the sum of? ", function(number2) {
			sum += parseInt(number2);
		console.log(sum);
		r1.close();
		});
		});
	}


