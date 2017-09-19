// Modify anything you like. Remember the content of the program is not important.
// This is just an example to help you practice reading and writing from and to files.
var object = process.argv[2];
var fs = require('fs');
var newFileArr = fs.readFileSync('./log.txt', 'utf8')

if(process.argv[2] === '-s' || process.argv[2] === '--stats' ) {
  console.log("stats requested");
  console.log(newFileArr);
} else {
  console.log("ran at:" + new Date());
  var newFileArr = fs.writeFileSync('./log.txt', newFileArr + object + '\n');
}
