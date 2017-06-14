// functions for math operations

function sum(numberArray) {
  return numberArray.reduce(function(a, b) {
    return a + b;
  }, 0);
}

function product(numberArray) {
  return numberArray.reduce(function(a, b) {
    return a * b;
  }, 1);
}

module.exports = {
  sum : sum,
  product: product
}
