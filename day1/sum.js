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
function getInput (){
var readline = require("readline");

var firstNumber = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

firstNumber.question("What's your first number?", function(n1){
  firstNumber.question("What's your second number?", function (n2){
    console.log(parseFloat(n1) + parseFloat(n2));
    firstNumber.close();
  })
})
}

function sum(numbers){
  var total = 0;
  for (var i = 2; i<numbers.length; i++){
    total += parseFloat(numbers[i])
  }
  console.log(total)
}

if (process.argv.length === 2){
  getInput();
} else {
  sum(process.argv);
}
// Example code for reading command line arguments:
// console.log('Command line arguments', process.argv.slice(2));
//
// // Example code for getting input from the user
// var readline = require('readline');
//
// var rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout
// });
//
// rl.question("Hi! What's your name? ", function(n1) {
//   console.log('Nice to meet you', name);
//   rl.close();
// });
