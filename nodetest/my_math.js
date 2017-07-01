
function sum(numberArray) {
    return numberArray.reduce(function(a,b) {
        return a + b;
    }, 0)
}

function product(numberArray) {
    return numberArray.reduce(function(a,b) {
        return a * b;
    }, 1)
}

// used for exporting to another file
module.exports = {
    sum: sum, // exports the sum function as the variable sum
    product: product
}
