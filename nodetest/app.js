// May Li
// Basic product and sum app
// node app.js --sum 1 2 3 -> 6

// before you start coding, you write out a list of things you need to do -- done
// 1. get all the arguments -- done
// 2. Figure out if I should add or multiply -- done
// 3. Change strings to numbers -- done
// 4. print out the result
// 5. throw error if no flag
// 6. doublecheck the spec, ATTENTION TO DETAIL
// 7. the spec wants a . so make sure you do that
// 8. people will read your code before it gets pushed into production!

// input handler function call
// math handler
// prints the answer in the right format

// if file is 1 folder above, use ../, and if it was in other folder above, use ../../
var myMath = require('./my_math.js');
var inputParser = require('./input_parser.js')
var args = process.argv;
var flag = args[2];
var answer;

if (flag === '--sum' || flag === '--product') {
  var numberArray = inputParser.parse(args);
  if(flag === '--sum') {
    answer = myMath.sum(numberArray);
  }
  if(flag === '--product') {
    answer = myMath.product(numberArray);
  }
} else {
  throw new Error('no flag was given')
}

//
// if (flag === '--sum' || flag === '--product') {
//   var numberStringArray = args.slice(3);
//   var numberArray = [];
//   numberStringArray.forEach(function(item) {
//     numberArray.push(parseInt(item))
//   })
//   if(flag === '--sum') {
//     answer = myMath.sum(numberArray);
//     console.log(answer);
//   }
//   if(flag === '--product') {
//     answer = myMath.product(numberArray);
//     console.log(answer);
//   }
// } else {
//   throw new Error('no flag was given')
// }
