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

// // Example code for reading command line arguments:
// console.log('Command line arguments', process.argv.slice(2));

// // Example code for getting input from the user
// var readline = require('readline');

// var rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout
// });

// // rl.question("Hi! What's your name? ", function(name) {
// //   console.log('Nice to meet you', name);
// //   rl.close();
// // });

// rl.question("Put in some numbers", function(a){
// 	rl.question("add another number",function(b){
// 		console.log(parseInt(a)+parseInt(b))
// 			rl.close();
// 	})
// 	//console.log(x)
// });

/////WORKED OUT SOLUTION//////

///////////Part 1///////////////
var numbers=process.argv.slice(2)
if(numbers.length>0){
console.log('numbers', numbers);
var total=0;
for(var i=0; i<numbers.length; i++){
	total=total+parseInt(numbers[i]);
}
console.log('total',total);
}
else{
///things come out of argv as strings, need to be deliberately turned into number
//if that is desired
///getting user input (part 2)
var readLine = required('readLine');

var rl = readLine.createInterface({
	input: process.stdin,
	output: process.stdout
});

var n1, n2;
rl.question("Enter your first number", function(n1){
	console.log("number 1:", n1);
	r1.question("Enter second number", function(n2){
		console.log("number 2:" n2);
		console.log(parseInt(n1)+parseInt(n2))
	})
})
}