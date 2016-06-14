
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

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question("Hi! What's your name? ", function(name) {
  console.log('Nice to meet you', name);
  rl.close();
});

































// function getGreeting() {
//   return 'Hello';
// }


// function getGreeting() {
//   return 'Hello';
// }


// module.exports.getGreeting = getGreeting

// console.log("test")


// // function sum (n) {
// // 	for (var i = 0; 0 < n, i++);
// // 		console.log("i")
// // }

// var blabla = 1
// var hihi = 2

// var sumAdd = require('sumAdd');

// var sum = sumAdd.createinterface({
// 	input: process.stdin,
// 	output: process.stdout
// })

// sum.question("enter first number?", function(number){
// 	console.log('blabla + hihi', number);
// 	sum.close();
// }) 







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

// rl.question("Hi! What's your name? ", function(name) {
//   console.log('Nice to meet you', name);
//   rl.close();
// });





