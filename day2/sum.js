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
//console.log('Command line arguments', process.argv.slice(2));

var args = process.argv.slice(2);

// Example code for getting input from the user

var readline = require('readline');

	var rl = readline.createInterface({
	  input: process.stdin,
	  output: process.stdout
	});

if(args.length>0){
	var sum=0;
	for(var i=0;i<args.length;i++)
	{
		//console.log(args[i])
		sum+=parseFloat(args[i]);
		//console.log(sum)
	}
	console.log(sum);
}

else{
	rl.question("Enter first number?", function(num1) {
	  rl.question("Enter second number?", function(num2){
		console.log(parseFloat(num1)+parseFloat(num2))
		})
		
	});
	

}
