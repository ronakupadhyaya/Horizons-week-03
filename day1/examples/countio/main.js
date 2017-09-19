// Modify anything you like. Remember the content of the program is not important.
// This is just an example to help you practice reading and writing from and to files.

if(process.argv[2] === '-s' || process.argv[2] === '--stats' ) {
  console.log("stats requested");
  var fs = require('fs');
  var fileArr = fs.readFileSync('./log.txt', 'utf8');
  console.log(fileArr[0] + fileArr  [1]);

} else {
  console.log("ran at:" + new Date());
  var fs = require('fs');
  var fileArr = fs.readFileSync('./log.txt', 'utf8');
  fs.writeFileSync('./log.txt', fileArr + new Date() + "\n");
}
//
// var fs = require('fs');
// var fileArr = fs.readFileSync('./log.txt', 'utf8');
// fs.writeFileSync('./log.txt', new Date() +"\n");
