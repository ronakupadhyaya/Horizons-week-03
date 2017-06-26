// Math functions for logic in app.js
// the responsibility of the functions in this file is to just do the logic
// you want to make your code reusable and so make sure your functions don't do
// too much, like legos

function sum(numberArray) {
  var answer = 0;
  numberArray.forEach(function(item) {
    answer = answer + item;
  })
  return answer;
}
// 
// function product(numberArray) {
//   var answer2 = 1;
//   numberArray.forEach(function(item) {
//     answer2 = answer2 * item;
//   })
//   return answer;
// }

function product(numberArray) {
  return numberArray.reduce(function(a, b) {
    return a * b;
  }, 1);
}

module.exports = {
  sum: sum,
  product: product
}
