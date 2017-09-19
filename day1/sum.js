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
var argList = process.argv;

if (argList.length>2){
  var sum = 0;
  for (var i = 2; i < argList.length; i++){
    sum += parseInt(argList[i]);
  }
  console.log(sum);
} else {
  var readline = require('readline');

  var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  var sum2 = 0;
  rl.question("Enter first number? ", function(n1) {
    sum2 += parseInt(n1);
    rl.question("Enter second number? ", function(n2) {
      sum2 += parseInt(n2);
      console.log(sum2);
      rl.close();

    });
  });

}
