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
console.log("Command line all", process.argv.slice);
console.log('Command line arguments', process.argv.slice(2));

var numbers = process.argv.slice(2);

if (numbers.length>0) {
	console.log("numbers:", numbers);
	var total = 0;

	for (var i =0; i<numbers.length; i++){
		console.log(numbers[i]);
		total= total + parseInt(numbers[i]);
	}
	console.log("total:", total);
	
} else {

	// // Example code for getting input from the user
	var readline = require('readline');

	var rl = readline.createInterface({
	  input: process.stdin,
	  output: process.stdout
	});

	var n1, n2;

	rl.question("Enter first number ", function(n1) {
	  console.log('Number one: ', n1);
	  //asyncrhonsou
	  rl.question("Enter second number ", function(n2) {
	  console.log('Number two: ', n2);
	  	console.log("Total: ", parseInt(n1)+parseInt(n2));
	  	rl.close();
	});
	});

}


// rl.question("Enter a number", function(one) {
// 	var sum = (parseInt(one)) + (parseInt(two));
// 	console.log(one);
// 	console.log(two);
// 	rl.close();
// })


// function sum(args) {
// 	console.log(process.argv[2]);
// 	return process.argv[2] + process.argv[3];
// }

// function sum(args) {
// 	if (process.argv[2].length > 1) {
// 		return process.argv[1] + process.argv[2];
// 	} 
// 	else { false }
// }

// function test(){
// 	console.log("hello")
// }

// function sum(args) {
// 	var array = process.argv.slice(2);
// 	var acc = 0;
// 	if (array.length > 1) {
// 		for (var i =0; i<array.length; i++){
// 			acc =+ parseInt(array[i]);
// 		}
// 	return acc;
// 	} else { return false }
// }
