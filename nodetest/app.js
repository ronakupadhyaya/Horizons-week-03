// Basic product and sum app
// node app.js -- sum 1 2 3 -> 6 (basic usage)

// Add external js file
var myMath = require('./my_math.js'); // gives a path to the other file to add to this file
var sum = myMath.sum;
var inputParser = require('./util/input_parser.js');

// Get all the arguments
var args = process.argv;
var flag = args[2];
var answer;

// Create the logic
if(flag === '--sum' || flag === '--product') {
    var numberArray = inputParser.parse(args);
    if(flag === '--sum') {
        answer = myMath.sum(numberArray)
    }
    else {
        answer = myMath.product(numberArray)
    }
    console.log(answer);
}
else {
    throw new Error('Error: No flag was given.')
}
