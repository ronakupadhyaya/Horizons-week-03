// Basic product and sum app
// node app.jsj --sum 1 2 3 -> 6

var myMath = require('./my_math.js')
var inputParser = require('./input_parser.js')
var args = process.argv;
var flag = args[2]
if (flag === '--sum' || flag === '--product') {
  var answer;
  var numberArr = inputParser.parse(args)

  if (flag === '--sum') {
    answer = myMath.sum(numberArr)
    console.log("result is " + answer + ".")
  } else if (flag === '--product') {
    answer = myMath.product(numberArr)
    console.log("result is " + answer + ".")
  }

} else {
  throw new Error("error: no flag was given")
}
// parseInt on numbers

// print out calculation result
// throw error if no flag
// double check spec
// code review
