// Modify anything you like. Remember the content of the program is not important.
// This is just an example to help you practice reading and writing from and to files.

var fs = require('fs');
var og = fs.readFileSync('./log.txt', 'utf8');
fs.writeFileSync('./log.txt', og + new Date() + '\n');
if (process.argv[2] === '-s' || process.argv[2] === '--stats') {
  console.log("stats requested");
  var dates = og.split('\n');
  var last = dates.length - 2;
  console.log(last);
  console.log('First', dates[0]);
  console.log('Last', dates[last]);
} else {
  console.log("ran at:" + new Date());
}
