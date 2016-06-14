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

  var ret = '';
  var arr = source.split("");

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] === letter) {
      ret += replacement;
    } else {
      ret += arr[i];
    }
  }
  return ret;
}

if (require.main === module) {
  // This line is only executed when you call this script directly but not in tests.
  // ex. node debugging.js
  console.log(replaceAll('aaaax'));
}

module.exports = replaceAll;
