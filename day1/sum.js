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


if(process.argv.slice(2).length !== 0){
  var sum =0;
  process.argv.slice(2).forEach(function(elem){
    sum += parseInt(elem);
  })
  console.log(sum);
}else{
  var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  rl.question("Type in numbers with spaces in between them. I'll sum them for you.", function(elem) {
    var sum =0;
    elem.split(' ').forEach(function(num){
      sum += parseInt(num);
    })
    console.log('sum: ',sum);
    rl.close();
  });
}
