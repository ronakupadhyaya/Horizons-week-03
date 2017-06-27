// Math functions for logic in app.js

function sum(numberArr) {
  return numberArr.reduce(function(a, b) {
    return a + b;
  }, 0)
}

function product(numberArr) {
  return numberArr.reduce(function(a, b) {
    return a * b;
  }, 1)
}

module.exports = {
  sum: sum,
  product: product
}
