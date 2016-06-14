// This function is supposed to replace all instances of 'letter'
// in 'source' with 'replacement'.
//
// But it doesn't work, use the node-debug command to find out
// why and fix it.
//
// ex. replaceAll('', 'a', 'b') -> ''
// ex. replaceAll('aaaax', 'a', 'b') -> 'bbbbx'
// ex. replaceAll('bbbb', 'a', 'b') -> 'bbbb'
// ex. replaceAll('x aa b x', 'a', 'b') -> 'x bb b x'
function replaceAll(source, letter, replacement) {
  console.log("tests")
  var ret = '';
  for (var i = 0; i < source.length; i++) {
    if (source[i] === letter) {
      ret += replacement;
    } else {
      ret += source[i];
    }
  }
  return ret;
}

if (require.main === module) {
  // This line is only executed when you call this script directly but not in tests.
  // ex. node debugging.js
  console.log(replaceAll('aaaax', 'a', 'b'));
}

module.exports = replaceAll;
