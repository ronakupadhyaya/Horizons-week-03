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

console.log('Unprocessed command line argument', process.argv)
console.log('Command line arguments', process.argv.slice(2));


var numbers = process.argv.slice(2); // Takes out the first two arguments! Unprocessed arguments. 

//Check if there are any command line arguments
if (numbers.length > 0) {
    console.log('numbers', numbers)

    var total = 0;
    for (var i = 0; i < numbers.length; i++) {
        console.log(numbers[i])
            // Parsing because arguments are entered as numbers!
        total = total + parseInt(numbers[i]);
    }
    console.log('total', total);
} else {
    // Example code for getting input from the user
    var readline = require('readline');

    var rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    // THIS IS ASYNCHRONOUS - CONSOLE.LOG DOES NOT WAIT FOR THE QUESTIONS TO BE ANSWERED. CALLBACKS
    // MUST BE PLACED INSIDE CALLBACKS. 
    var n1, n2; 
    rl.question("Enter first number ", function(n1) {
        console.log('#1', n1); //Wait for input, get a callback
        rl.question("Enter second number ", function(n2) {
        console.log('#2', n2); //Wait for input, get a callback
        console.log('total', parseInt(n1) + parseInt(n2));
        rl.close(); // Must have it quit. 
    });
    });
    
    
}
