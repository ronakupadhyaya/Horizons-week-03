// turn input into just numbers

function parse(args) {
  var numberStringArr = args.slice(3);

  var numberArr = numberStringArr.map(function(arg) {
    return parseFloat(arg)
  })
  return numberArr
}

module.exports = {
  parse: parse
}
