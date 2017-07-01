function parse(args) {
    var numberStringArray = args.slice(3);
    var numberArray = [];
    numberStringArray.forEach(function(item) {
        numberArray.push(parseInt(item))
    });
    return numberArray
}

module.exports = {
    parse: parse, // exports the sum function as the variable sum
}
